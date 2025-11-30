#!/usr/bin/env python3
"""
e-Stat API経由で自治体別人口データを取得するスクリプト
"""

import requests
import pandas as pd
import logging
import os
from pathlib import Path
from dotenv import load_dotenv
from time import sleep

# .envファイルの読み込み
load_dotenv()

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 定数
API_KEY = os.getenv('ESTAT_API_KEY')
OUTPUT_DIR = Path(__file__).parent / 'output'
OUTPUT_FILE = OUTPUT_DIR / 'population_data.csv'

# e-Stat API エンドポイント
ESTAT_BASE_URL = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData'

# 推計人口の統計表ID（実際の統計表IDに変更する必要があります）
# 注: 正しい統計表IDはe-Statで検索して取得してください
STATS_ID = '0003448237'  # 例：推計人口


def fetch_population_data(api_key: str, stats_id: str) -> list[dict]:
    """
    e-Stat APIから人口データを取得する

    Args:
        api_key: e-Stat APIキー
        stats_id: 統計表ID

    Returns:
        人口データのリスト

    Raises:
        requests.RequestException: API通信エラー
        ValueError: APIキー未設定エラー
    """
    if not api_key:
        raise ValueError('ESTAT_API_KEY is not set. Please check your .env file.')

    logger.info('Fetching population data from e-Stat API')

    params = {
        'appId': api_key,
        'statsDataId': stats_id,
        'metaGetFlg': 'Y',
        'cntGetFlg': 'N',
        'sectionHeaderFlg': '1'
    }

    try:
        response = requests.get(ESTAT_BASE_URL, params=params, timeout=30)
        response.raise_for_status()
        data = response.json()

        if data.get('GET_STATS_DATA', {}).get('RESULT', {}).get('STATUS') != 0:
            error_msg = data.get('GET_STATS_DATA', {}).get('RESULT', {}).get('ERROR_MSG', 'Unknown error')
            raise ValueError(f'API Error: {error_msg}')

        # データの解析
        value_list = data.get('GET_STATS_DATA', {}).get('STATISTICAL_DATA', {}).get('DATA_INF', {}).get('VALUE', [])

        population_data = []
        for item in value_list:
            try:
                # 地域コードと人口を抽出（実際のレスポンス構造に応じて調整）
                area_code = item.get('@area')  # 地域コード
                value = item.get('$')  # 人口値

                if area_code and value:
                    population_data.append({
                        'municipality_code': area_code,
                        'population': int(value)
                    })
            except (ValueError, KeyError) as e:
                logger.warning(f'Failed to parse item: {e}')
                continue

        logger.info(f'Fetched {len(population_data)} records')
        return population_data

    except requests.RequestException as e:
        logger.error(f'Failed to fetch data from API: {e}')
        raise


def get_municipality_names() -> dict:
    """
    自治体コードから自治体名へのマッピングを取得

    Note: 実際のプロジェクトでは別のAPIや固定データから取得
    ここでは簡略化のため空の辞書を返す

    Returns:
        自治体コード: 自治体名のマッピング
    """
    # 実装が必要な場合は、総務省の自治体コード表などを利用
    return {}


def add_prefecture_and_name(data: list[dict]) -> list[dict]:
    """
    都道府県名と自治体名を追加する

    Args:
        data: 人口データのリスト

    Returns:
        都道府県名と自治体名を追加したデータ
    """
    # 簡易的な都道府県コードマッピング（先頭2桁）
    prefecture_mapping = {
        '01': '北海道', '02': '青森県', '03': '岩手県', '04': '宮城県',
        '05': '秋田県', '06': '山形県', '07': '福島県', '08': '茨城県',
        '09': '栃木県', '10': '群馬県', '11': '埼玉県', '12': '千葉県',
        '13': '東京都', '14': '神奈川県', '15': '新潟県', '16': '富山県',
        '17': '石川県', '18': '福井県', '19': '山梨県', '20': '長野県',
        '21': '岐阜県', '22': '静岡県', '23': '愛知県', '24': '三重県',
        '25': '滋賀県', '26': '京都府', '27': '大阪府', '28': '兵庫県',
        '29': '奈良県', '30': '和歌山県', '31': '鳥取県', '32': '島根県',
        '33': '岡山県', '34': '広島県', '35': '山口県', '36': '徳島県',
        '37': '香川県', '38': '愛媛県', '39': '高知県', '40': '福岡県',
        '41': '佐賀県', '42': '長崎県', '43': '熊本県', '44': '大分県',
        '45': '宮崎県', '46': '鹿児島県', '47': '沖縄県',
    }

    for item in data:
        code = item['municipality_code']
        pref_code = code[:2]
        item['prefecture'] = prefecture_mapping.get(pref_code, '不明')
        item['municipality_name'] = f'自治体{code}'  # 実際は名称マスタから取得

    return data


def save_to_csv(data: list[dict], output_path: Path) -> None:
    """
    データをCSVファイルに保存する

    Args:
        data: 保存するデータ
        output_path: 出力ファイルパス
    """
    output_path.parent.mkdir(parents=True, exist_ok=True)

    df = pd.DataFrame(data)
    df.to_csv(output_path, index=False, encoding='utf-8-sig')

    logger.info(f'Saved {len(data)} records to {output_path}')


def main():
    """メイン処理"""
    try:
        # 人口データ取得
        population_data = fetch_population_data(API_KEY, STATS_ID)

        if not population_data:
            logger.error('No data fetched')
            return

        # 都道府県名と自治体名を追加
        population_data = add_prefecture_and_name(population_data)

        # CSV保存
        save_to_csv(population_data, OUTPUT_FILE)

        # サマリー表示
        logger.info('=' * 50)
        logger.info(f'Total records: {len(population_data)}')
        logger.info(f'Output file: {OUTPUT_FILE}')
        logger.info('=' * 50)

    except Exception as e:
        logger.error(f'Error occurred: {e}')
        raise


if __name__ == '__main__':
    main()
