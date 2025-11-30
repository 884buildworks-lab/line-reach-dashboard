#!/usr/bin/env python3
"""
LINEデータと人口データを統合し、最終的なCSVを生成するスクリプト
"""

import pandas as pd
import logging
from pathlib import Path
from datetime import datetime

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 定数
INPUT_LINE_DATA = Path(__file__).parent / 'output' / 'line_data.csv'
INPUT_POPULATION_DATA = Path(__file__).parent / 'output' / 'population_data.csv'
OUTPUT_DIR = Path(__file__).parent.parent / 'public' / 'data'
TODAY = datetime.now().strftime('%Y-%m')
OUTPUT_FILE = OUTPUT_DIR / f'{TODAY}.csv'

# 政令指定都市リスト
DESIGNATED_CITIES = [
    '札幌市', '仙台市', 'さいたま市', '千葉市', '横浜市', '川崎市',
    '相模原市', '新潟市', '静岡市', '浜松市', '名古屋市', '京都市',
    '大阪市', '堺市', '神戸市', '岡山市', '広島市', '北九州市',
    '福岡市', '熊本市'
]

# 中核市リスト（一部抜粋、完全なリストは別途管理）
CORE_CITIES = [
    '旭川市', '函館市', '青森市', '八戸市', '盛岡市', '秋田市',
    '郡山市', 'いわき市', '水戸市', '宇都宮市', '前橋市', '高崎市',
    '川越市', '越谷市', '船橋市', '柏市', '八王子市', '横須賀市',
    '富山市', '金沢市', '長野市', '岐阜市', '豊橋市', '岡崎市',
    # ... (他の中核市も追加)
]


def load_csv_data(file_path: Path) -> pd.DataFrame:
    """
    CSVファイルを読み込む

    Args:
        file_path: CSVファイルパス

    Returns:
        DataFrameオブジェクト
    """
    if not file_path.exists():
        raise FileNotFoundError(f'File not found: {file_path}')

    logger.info(f'Loading data from {file_path}')
    df = pd.read_csv(file_path, encoding='utf-8-sig')
    logger.info(f'Loaded {len(df)} records')
    return df


def determine_population_category(municipality_name: str) -> str:
    """
    自治体名から人口規模区分を判定する

    Args:
        municipality_name: 自治体名

    Returns:
        人口規模区分
    """
    if municipality_name in DESIGNATED_CITIES:
        return '政令指定都市'
    elif municipality_name in CORE_CITIES:
        return '中核市'
    elif municipality_name.endswith('市'):
        return '一般市'
    else:
        return '町村'


def merge_datasets(line_df: pd.DataFrame, population_df: pd.DataFrame) -> pd.DataFrame:
    """
    LINEデータと人口データをマージする

    Args:
        line_df: LINEデータのDataFrame
        population_df: 人口データのDataFrame

    Returns:
        マージされたDataFrame
    """
    logger.info('Merging datasets')

    # 自治体名でマージ
    merged_df = pd.merge(
        line_df,
        population_df,
        on='municipality_name',
        how='left'
    )

    # マッチングできなかったデータをログ出力
    unmatched = merged_df[merged_df['population'].isna()]
    if len(unmatched) > 0:
        logger.warning(f'{len(unmatched)} municipalities could not be matched')
        for idx, row in unmatched.iterrows():
            logger.warning(f'  - {row["municipality_name"]}')

    # 欠損値を除外
    merged_df = merged_df.dropna(subset=['population'])

    logger.info(f'Successfully merged {len(merged_df)} records')
    return merged_df


def calculate_registration_rate(df: pd.DataFrame) -> pd.DataFrame:
    """
    登録率を計算する

    Args:
        df: DataFrameオブジェクト

    Returns:
        登録率が追加されたDataFrame
    """
    logger.info('Calculating registration rates')

    df['registration_rate'] = (df['friends_count'] / df['population'] * 100).round(2)

    # 異常値チェック（登録率が100%を超える場合）
    abnormal = df[df['registration_rate'] > 100]
    if len(abnormal) > 0:
        logger.warning(f'{len(abnormal)} municipalities have registration rate > 100%')
        for idx, row in abnormal.iterrows():
            logger.warning(
                f'  - {row["municipality_name"]}: '
                f'{row["registration_rate"]}% '
                f'(friends: {row["friends_count"]}, population: {row["population"]})'
            )

    return df


def add_metadata(df: pd.DataFrame) -> pd.DataFrame:
    """
    メタデータを追加する

    Args:
        df: DataFrameオブジェクト

    Returns:
        メタデータが追加されたDataFrame
    """
    logger.info('Adding metadata')

    # 人口規模区分を判定
    df['population_category'] = df['municipality_name'].apply(determine_population_category)

    # 更新日を追加
    df['updated_at'] = datetime.now().strftime('%Y-%m-%d')

    return df


def reorder_columns(df: pd.DataFrame) -> pd.DataFrame:
    """
    カラムの順序を整える

    Args:
        df: DataFrameオブジェクト

    Returns:
        カラム順序が整ったDataFrame
    """
    column_order = [
        'municipality_code',
        'municipality_name',
        'prefecture',
        'account_name',
        'friends_count',
        'population',
        'registration_rate',
        'population_category',
        'updated_at'
    ]

    # 存在しないカラムはスキップ
    existing_columns = [col for col in column_order if col in df.columns]

    return df[existing_columns]


def save_to_csv(df: pd.DataFrame, output_path: Path) -> None:
    """
    DataFrameをCSVファイルに保存する

    Args:
        df: DataFrameオブジェクト
        output_path: 出力ファイルパス
    """
    output_path.parent.mkdir(parents=True, exist_ok=True)

    df.to_csv(output_path, index=False, encoding='utf-8-sig')

    logger.info(f'Saved {len(df)} records to {output_path}')


def generate_summary_report(df: pd.DataFrame) -> None:
    """
    サマリーレポートを出力する

    Args:
        df: DataFrameオブジェクト
    """
    logger.info('=' * 50)
    logger.info('SUMMARY REPORT')
    logger.info('=' * 50)
    logger.info(f'Total municipalities: {len(df)}')
    logger.info(f'Average registration rate: {df["registration_rate"].mean():.2f}%')
    logger.info(f'Median registration rate: {df["registration_rate"].median():.2f}%')
    logger.info(f'Max registration rate: {df["registration_rate"].max():.2f}%')
    logger.info(f'Min registration rate: {df["registration_rate"].min():.2f}%')
    logger.info('=' * 50)
    logger.info('By population category:')
    for category in df['population_category'].unique():
        count = len(df[df['population_category'] == category])
        avg_rate = df[df['population_category'] == category]['registration_rate'].mean()
        logger.info(f'  {category}: {count} municipalities, avg rate: {avg_rate:.2f}%')
    logger.info('=' * 50)


def main():
    """メイン処理"""
    try:
        # データ読み込み
        line_df = load_csv_data(INPUT_LINE_DATA)
        population_df = load_csv_data(INPUT_POPULATION_DATA)

        # データマージ
        merged_df = merge_datasets(line_df, population_df)

        # 登録率計算
        merged_df = calculate_registration_rate(merged_df)

        # メタデータ追加
        merged_df = add_metadata(merged_df)

        # カラム順序整理
        merged_df = reorder_columns(merged_df)

        # CSV保存
        save_to_csv(merged_df, OUTPUT_FILE)

        # サマリーレポート
        generate_summary_report(merged_df)

    except Exception as e:
        logger.error(f'Error occurred: {e}')
        raise


if __name__ == '__main__':
    main()
