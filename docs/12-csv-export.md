# 12. CSVエクスポート機能

## 概要
現在のフィルター・除外設定を適用したデータをCSVファイルとしてエクスポートする機能の実装

## 目的
- フィルター済みデータをCSV形式でダウンロード
- ブラウザでのファイルダウンロード実装

## 技術スタック
- Next.js
- TypeScript

## タスク

### Todo
- [ ] `src/lib/csvExporter.ts` の作成
- [ ] `exportToCSV()` 関数の実装
  ```typescript
  function exportToCSV(data: Municipality[], fileName: string): void
  ```
- [ ] CSVフォーマット変換処理
  - ヘッダー行の生成
  - データ行の生成
  - カンマ区切り、ダブルクォート対応
- [ ] Blob生成処理
  ```typescript
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  ```
- [ ] ダウンロード実行処理
  ```typescript
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  ```
- [ ] `src/components/ExportButton.tsx` の作成
- [ ] エクスポートボタンUI
  - ボタンデザイン
  - クリックイベント
- [ ] ファイル名生成ロジック
  - `filtered_data_YYYYMMDD.csv` 形式
  - 現在日時の取得
- [ ] エクスポート対象データの準備
  - フィルター適用済みデータ
  - 除外設定を反映したデータ
- [ ] エクスポート成功のフィードバック
  - トースト通知またはアラート

## 成果物
- [ ] `src/lib/csvExporter.ts`
- [ ] `src/components/ExportButton.tsx`

## Props定義
```typescript
interface ExportButtonProps {
  data: Municipality[];
  fileName?: string;
}
```

## CSVフォーマット
- ヘッダー: `municipality_code,municipality_name,prefecture,account_name,friends_count,population,registration_rate,population_category,updated_at`
- データ行: カンマ区切り、必要に応じてダブルクォートでエスケープ
- 文字エンコーディング: UTF-8（BOM付き推奨）

## 依存関係
- チケット07（データ表示機能）
- チケット08（フィルタリング機能）
- チケット10（外れ値除外機能）

## 完了条件
- [ ] エクスポートボタンが表示される
- [ ] クリックでCSVファイルがダウンロードされる
- [ ] フィルター・除外設定が反映されている
- [ ] ファイル名が正しく生成される
- [ ] CSVフォーマットが正しい
- [ ] TypeScriptコンパイルエラーがない
