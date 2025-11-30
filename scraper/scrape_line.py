#!/usr/bin/env python3
"""
LINE自治体アカウント友だち数スクレイピングスクリプト

URL: https://uub.jp/opm/ml_line.html から自治体のLINEアカウント情報を取得
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import logging
from datetime import datetime
from pathlib import Path

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 定数
TARGET_URL = 'https://uub.jp/opm/ml_line.html'
OUTPUT_DIR = Path(__file__).parent / 'output'
OUTPUT_FILE = OUTPUT_DIR / 'line_data.csv'


def fetch_html(url: str) -> str:
    """
    指定されたURLからHTMLを取得する

    Args:
        url: 取得するURL

    Returns:
        HTML文字列

    Raises:
        requests.RequestException: HTTP通信エラー
    """
    try:
        logger.info(f'Fetching data from {url}')
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        response.encoding = response.apparent_encoding
        logger.info('Successfully fetched HTML')
        return response.text
    except requests.RequestException as e:
        logger.error(f'Failed to fetch HTML: {e}')
        raise


def parse_line_data(html: str) -> list[dict]:
    """
    HTMLをパースしてLINEアカウント情報を抽出する

    Args:
        html: HTML文字列

    Returns:
        自治体データのリスト
    """
    logger.info('Parsing HTML')
    soup = BeautifulSoup(html, 'lxml')

    data = []

    # テーブルを探す（実際のHTML構造に応じて調整が必要）
    # 注: 実際のサイト構造を確認して適切なセレクタに変更してください
    table = soup.find('table')

    if not table:
        logger.warning('No table found in HTML')
        return data

    rows = table.find_all('tr')[1:]  # ヘッダー行をスキップ

    for row in rows:
        try:
            cols = row.find_all('td')
            if len(cols) >= 3:
                municipality_name = cols[0].get_text(strip=True)
                account_name = cols[1].get_text(strip=True)
                friends_count_text = cols[2].get_text(strip=True)

                # 友だち数から数値のみ抽出（カンマを除去）
                friends_count = int(friends_count_text.replace(',', '').replace('人', ''))

                data.append({
                    'municipality_name': municipality_name,
                    'account_name': account_name,
                    'friends_count': friends_count
                })
        except (ValueError, IndexError) as e:
            logger.warning(f'Failed to parse row: {e}')
            continue

    logger.info(f'Parsed {len(data)} records')
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
        # HTML取得
        html = fetch_html(TARGET_URL)

        # データ抽出
        data = parse_line_data(html)

        if not data:
            logger.error('No data extracted')
            return

        # CSV保存
        save_to_csv(data, OUTPUT_FILE)

        # サマリー表示
        logger.info('=' * 50)
        logger.info(f'Total municipalities: {len(data)}')
        logger.info(f'Output file: {OUTPUT_FILE}')
        logger.info('=' * 50)

    except Exception as e:
        logger.error(f'Error occurred: {e}')
        raise


if __name__ == '__main__':
    main()
