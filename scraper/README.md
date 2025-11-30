# スクレイピングスクリプト

このディレクトリには、LINEアカウント友だち数と人口データを取得するPythonスクリプトが含まれています。

## セットアップ

### 1. Python環境の準備

Python 3.8以上が必要です。

```bash
# 仮想環境の作成（推奨）
python -m venv venv

# 仮想環境の有効化
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# 依存パッケージのインストール
pip install -r requirements.txt
```

### 2. e-Stat APIキーの取得（人口データ用）

1. [e-Stat](https://www.e-stat.go.jp/)にアクセス
2. ユーザー登録してAPIキーを取得
3. `.env`ファイルを作成してAPIキーを設定

```bash
# .envファイルの作成
cp .env.example .env

# .envファイルを編集してAPIキーを設定
ESTAT_API_KEY=your_api_key_here
```

## スクリプトの実行

### LINEアカウント友だち数の取得

```bash
python scrape_line.py
```

出力: `output/line_data.csv`

### 人口データの取得

```bash
python fetch_population.py
```

出力: `output/population_data.csv`

### データの統合

```bash
python merge_data.py
```

出力: `../public/data/YYYY-MM.csv`

## 注意事項

- スクレイピングは対象サイトに負荷をかけないよう適切な間隔で実行してください
- サイトの構造が変わった場合、スクリプトの修正が必要になる場合があります
- APIキー（`.env`）は絶対にGitにコミットしないでください

## トラブルシューティング

### スクレイピングが失敗する場合

1. 対象サイトが利用可能か確認
2. HTML構造が変更されていないか確認
3. ログを確認してエラー内容を特定

### APIエラーが発生する場合

1. APIキーが正しく設定されているか確認
2. API利用制限に達していないか確認
3. ネットワーク接続を確認
