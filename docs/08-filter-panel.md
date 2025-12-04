# 08. フィルタリング機能

## 概要
データをフィルタリングするUIコンポーネントの実装

## 目的
- 都道府県、地方ブロック、人口規模でデータをフィルタリング
- 複数フィルターの組み合わせに対応

## 技術スタック
- Next.js
- TypeScript
- Tailwind CSS

## タスク

### Todo
- [ ] `src/components/FilterPanel.tsx` の作成
- [ ] 都道府県フィルター
  - ドロップダウン（select要素）
  - 47都道府県 + 「すべて」オプション
- [ ] 地方ブロックフィルター
  - ドロップダウン（select要素）
  - 7地方区分 + 「すべて」オプション
  - 地方ブロックと都道府県のマッピング
- [ ] 人口規模フィルター
  - ドロップダウン（select要素）
  - 政令指定都市、中核市、一般市、町村 + 「すべて」オプション
- [ ] フィルター状態の管理
  - 親コンポーネントへの状態伝播
- [ ] フィルターリセット機能
  - 「すべてクリア」ボタン
- [ ] `src/lib/dataProcessor.ts` の作成
- [ ] `filterMunicipalityData()` 関数の実装
  ```typescript
  function filterMunicipalityData(
    data: Municipality[],
    filters: FilterState
  ): Municipality[]
  ```
- [ ] 複数フィルター適用ロジック
  - AND条件での絞り込み
- [ ] UIレイアウト
  - グリッドまたはフレックスボックス配置
  - レスポンシブデザイン

## 成果物
- [ ] `src/components/FilterPanel.tsx`
- [ ] `src/lib/dataProcessor.ts`

## Props定義
```typescript
interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}
```

## 地方ブロックマッピング
- 北海道・東北: 北海道、青森、岩手、宮城、秋田、山形、福島
- 関東: 茨城、栃木、群馬、埼玉、千葉、東京、神奈川
- 中部: 新潟、富山、石川、福井、山梨、長野、岐阜、静岡、愛知
- 近畿: 三重、滋賀、京都、大阪、兵庫、奈良、和歌山
- 中国: 鳥取、島根、岡山、広島、山口
- 四国: 徳島、香川、愛媛、高知
- 九州・沖縄: 福岡、佐賀、長崎、熊本、大分、宮崎、鹿児島、沖縄

## 依存関係
- チケット02（型定義）

## 完了条件
- [ ] 各フィルターが正常に動作する
- [ ] 複数フィルターの組み合わせが機能する
- [ ] フィルターリセットが機能する
- [ ] レスポンシブデザインが機能する
- [ ] TypeScriptコンパイルエラーがない
