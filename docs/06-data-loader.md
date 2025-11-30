# 06. データ読み込み機能

## 概要
CSVデータを読み込むユーティリティ関数の実装

## 目的
- `public/data/` 内のCSVファイルを読み込む
- データをTypeScript型に変換

## 技術スタック
- Next.js
- TypeScript

## タスク

### Todo
- [ ] `src/lib/dataLoader.ts` の作成
- [ ] CSV解析ライブラリの選定・インストール
  - 候補: `papaparse` または `csv-parse`
- [ ] `loadMunicipalityData()` 関数の実装
  ```typescript
  async function loadMunicipalityData(fileName: string): Promise<Municipality[]>
  ```
- [ ] CSVパース処理
- [ ] データ型変換処理
  - `friends_count`: string → number
  - `population`: string → number
  - `registration_rate`: string → number
- [ ] バリデーション処理
  - 必須フィールドの存在確認
  - 数値フィールドの型チェック
- [ ] エラーハンドリング
  - ファイルが存在しない場合
  - パースエラー
- [ ] `getAvailableDataFiles()` 関数の実装
  ```typescript
  function getAvailableDataFiles(): string[]
  ```
  - `public/data/` 内のCSVファイル一覧を取得
- [ ] 単体テスト（可能であれば）

## 成果物
- [ ] `src/lib/dataLoader.ts`

## 依存関係
- チケット01（プロジェクトセットアップ）
- チケット02（型定義）
- チケット05（データ統合処理）- サンプルCSVが必要

## 完了条件
- [ ] CSVファイルが正常に読み込める
- [ ] データがMunicipality型に正しく変換される
- [ ] 利用可能なデータファイル一覧が取得できる
- [ ] エラー時に適切な例外が発生する
- [ ] TypeScriptコンパイルエラーがない
