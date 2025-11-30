# 05. データ統合処理

## 概要
LINEデータと人口データを統合し、最終的なCSVを生成するPythonスクリプトの開発

## 目的
- LINE友だち数データと人口データをマージ
- 登録率を計算
- 月次データとして出力

## 技術スタック
- Python 3.x
- pandas

## タスク

### Todo
- [ ] `merge_data.py` の作成
- [ ] LINE友だち数CSVの読み込み処理
- [ ] 人口データCSVの読み込み処理
- [ ] 自治体名でのデータマッチング処理
  - 完全一致
  - 部分一致（必要に応じて）
  - マッチングできないデータのログ出力
- [ ] 登録率の計算
  ```python
  registration_rate = (friends_count / population) * 100
  ```
- [ ] 人口規模区分の判定ロジック
  - 政令指定都市: リストで管理
  - 中核市: リストで管理
  - 一般市: 自治体名が「市」で終わる
  - 町村: それ以外
- [ ] `updated_at` フィールドの追加（実行日）
- [ ] 最終CSVの出力（`public/data/YYYY-MM.csv`）
- [ ] データ検証処理
  - 欠損値チェック
  - 異常値チェック（登録率 > 100%など）
- [ ] サマリーレポート出力
  - 総自治体数
  - マッチング成功数
  - マッチング失敗数
- [ ] 実行テスト

## 成果物
- [ ] `scraper/merge_data.py`
- [ ] `public/data/YYYY-MM.csv`（初回データ）
- [ ] マッチングエラーレポート（ログファイル）

## 最終CSVフォーマット
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| municipality_code | string | 自治体コード（6桁） |
| municipality_name | string | 自治体名 |
| prefecture | string | 都道府県名 |
| account_name | string | LINEアカウント名 |
| friends_count | number | LINE友だち数 |
| population | number | 人口 |
| registration_rate | number | 登録率（％） |
| population_category | string | 人口規模区分 |
| updated_at | string | 更新日（YYYY-MM-DD） |

## 依存関係
- チケット03（LINE友だち数スクレイピング）
- チケット04（人口データ取得）

## 完了条件
- [ ] スクリプトが正常に実行できる
- [ ] LINEデータと人口データが正しくマッチングされる
- [ ] 登録率が正しく計算される
- [ ] 人口規模区分が正しく付与される
- [ ] `public/data/YYYY-MM.csv` が生成される
- [ ] マッチング失敗データがログ出力される
