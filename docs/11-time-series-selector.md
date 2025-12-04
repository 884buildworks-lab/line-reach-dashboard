# 11. 時系列データ選択機能

## 概要
複数月のデータファイルを切り替えて表示する機能の実装

## 目的
- `public/data/` 内の全CSVファイルを検出
- ドロップダウンで月次データを選択
- 選択したデータでダッシュボードを更新

## 技術スタック
- Next.js
- TypeScript

## タスク

### Todo
- [ ] `src/components/DataFileSelector.tsx` の作成
- [ ] 利用可能なCSVファイル一覧の取得
  - `getAvailableDataFiles()` を使用
  - ファイル名から日付を抽出（YYYY-MM形式）
- [ ] ドロップダウンUI
  - 月次データをリスト表示
  - デフォルトは最新データ
- [ ] データファイル選択イベント
  - 選択時にデータを再読み込み
- [ ] ローディング状態の表示
  - データ読み込み中のインジケーター
- [ ] エラーハンドリング
  - ファイルが存在しない場合
  - 読み込みエラー
- [ ] 親コンポーネント（Dashboard.tsx）の更新
  - 選択されたファイル名の管理
  - データ読み込み処理の統合

## 成果物
- [ ] `src/components/DataFileSelector.tsx`
- [ ] Dashboard.tsx の更新

## Props定義
```typescript
interface DataFileSelectorProps {
  selectedFile: string;
  onFileChange: (fileName: string) => void;
}
```

## ファイル名フォーマット
- `YYYY-MM.csv` （例: `2024-11.csv`）
- ドロップダウン表示: `YYYY年MM月`

## 依存関係
- チケット06（データ読み込み機能）
- チケット07（データ表示機能）

## 完了条件
- [ ] 利用可能なデータファイルが一覧表示される
- [ ] ファイル選択でデータが切り替わる
- [ ] ローディング状態が表示される
- [ ] エラー時に適切なメッセージが表示される
- [ ] TypeScriptコンパイルエラーがない
