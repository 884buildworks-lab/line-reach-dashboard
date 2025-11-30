# 09. 統計値表示機能

## 概要
フィルター・除外設定を反映した統計値を表示するコンポーネントの実装

## 目的
- 平均登録率、中央値、最大値、最小値、対象自治体数を表示
- フィルター・除外設定の変更に即座に反映

## 技術スタック
- Next.js
- TypeScript
- Tailwind CSS

## タスク

### Todo
- [ ] `src/components/StatsDisplay.tsx` の作成
- [ ] `src/lib/dataProcessor.ts` に統計計算関数を追加
- [ ] `calculateStatistics()` 関数の実装
  ```typescript
  function calculateStatistics(data: Municipality[]): Statistics
  ```
- [ ] 平均値計算
  ```typescript
  average = sum(registration_rate) / count
  ```
- [ ] 中央値計算
  - データをソート
  - 中央値を取得（偶数個の場合は中央2つの平均）
- [ ] 最大値・最小値計算
- [ ] 統計値の表示レイアウト
  - カード形式またはグリッドレイアウト
  - 各統計値を視覚的に区別
- [ ] 数値フォーマット
  - 小数点以下2桁まで表示
  - パーセント表記
- [ ] 対象自治体数の表示
- [ ] レスポンシブデザイン

## 成果物
- [ ] `src/components/StatsDisplay.tsx`
- [ ] `src/lib/dataProcessor.ts` への統計関数追加

## Props定義
```typescript
interface StatsDisplayProps {
  data: Municipality[];
}
```

## 表示統計値
- **平均登録率**: XX.XX%
- **中央値**: XX.XX%
- **最大値**: XX.XX%
- **最小値**: XX.XX%
- **対象自治体数**: XXX件

## 依存関係
- チケット02（型定義）
- チケット08（フィルタリング機能）

## 完了条件
- [ ] 統計値が正しく計算される
- [ ] フィルター変更時に即座に更新される
- [ ] 除外設定が統計値に反映される
- [ ] 数値フォーマットが適用されている
- [ ] レスポンシブデザインが機能する
- [ ] TypeScriptコンパイルエラーがない
