# 04. 人口データ取得（e-Stat API）

## 概要
e-Stat APIから自治体別人口データを取得するPythonスクリプトの開発

## 目的
- e-Stat API経由で推計人口データを取得
- 自治体コードと人口をCSV形式で出力

## 技術スタック
- Python 3.x
- requests
- pandas

## タスク

### Todo
- [ ] e-Stat APIキーの取得（https://www.e-stat.go.jp/）
- [ ] `.env.example` の作成
  ```
  ESTAT_API_KEY=your_api_key_here
  ```
- [ ] `fetch_population.py` の作成
- [ ] 環境変数からAPIキーを読み込む処理
- [ ] e-Stat API呼び出し処理
  - エンドポイント: `/rest/3.0/app/json/getStatsData`
  - 推計人口データの統計表ID取得
- [ ] レスポンスのパース処理
- [ ] データ抽出ロジック
  - 自治体コード（6桁）
  - 自治体名
  - 人口
- [ ] データフレーム化（pandas）
- [ ] CSV出力機能（`scraper/output/population_data.csv`）
- [ ] エラーハンドリング
  - API呼び出しエラー
  - レート制限対応
  - データ欠損時の処理
- [ ] ログ出力機能
- [ ] 実行テスト

## 成果物
- [ ] `scraper/fetch_population.py`
- [ ] `scraper/.env.example`
- [ ] `scraper/output/population_data.csv`（サンプル）
- [ ] README更新（API Key設定手順）

## データ出力フォーマット
CSVカラム:
- `municipality_code`: 自治体コード（6桁）
- `municipality_name`: 自治体名
- `prefecture`: 都道府県名
- `population`: 人口

## 依存関係
- なし

## 完了条件
- [ ] API Key設定が完了している
- [ ] スクリプトが正常に実行できる
- [ ] 全自治体の人口データが取得できる
- [ ] CSV形式で出力される
- [ ] エラー時に適切なログが出力される

## 注意事項
- API Keyは環境変数で管理し、Gitにコミットしない
- `.gitignore` に `.env` を追加済みであることを確認
