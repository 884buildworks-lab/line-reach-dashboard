# 03. LINE友だち数スクレイピング

## 概要
LINEアカウント友だち数を取得するPythonスクレイピングスクリプトの開発

## 目的
- https://uub.jp/opm/ml_line.html から自治体LINEアカウント情報を取得
- 友だち数データをCSV形式で出力

## 技術スタック
- Python 3.x
- BeautifulSoup4
- requests
- pandas

## タスク

### Todo
- [x] `scraper/` ディレクトリの作成
- [x] `requirements.txt` の作成
  ```
  beautifulsoup4
  requests
  pandas
  lxml
  ```
- [x] `scrape_line.py` の作成
- [x] HTMLページの取得処理
- [x] BeautifulSoup4でのパース処理
- [x] データ抽出ロジック
  - 自治体名
  - アカウント名
  - 友だち数
- [x] データフレーム化（pandas）
- [x] CSV出力機能（`scraper/output/line_data.csv`）
- [x] エラーハンドリング
  - ネットワークエラー
  - パースエラー
  - データ欠損時の処理
- [x] ログ出力機能
- [x] 実行テスト

## 成果物
- [x] `scraper/scrape_line.py`
- [x] `scraper/requirements.txt`
- [x] `scraper/output/line_data.csv`（サンプル）
- [x] `scraper/README.md`（実行手順）

## データ出力フォーマット
CSVカラム:
- `municipality_name`: 自治体名
- `account_name`: LINEアカウント名
- `friends_count`: 友だち数

## 依存関係
- なし

## 完了条件
- [ ] スクリプトが正常に実行できる
- [ ] 全自治体データが取得できる
- [ ] CSV形式で出力される
- [ ] エラー時に適切なログが出力される
