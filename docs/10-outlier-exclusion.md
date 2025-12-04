# 10. 外れ値除外機能

## 概要
チェックボックスで個別の自治体を統計計算から除外する機能の実装

## 目的
- テーブル上のチェックボックスで外れ値を除外
- 除外状態を視覚的にフィードバック
- 統計値に即座に反映

## 技術スタック
- Next.js
- TypeScript
- React Hooks

## タスク

### Todo
- [ ] 除外状態の管理（State）
  - `useState<Set<string>>()`で除外IDを管理
- [ ] チェックボックスイベントハンドラ
  - 個別チェック時の処理
  - 全選択/全解除の処理
- [ ] 除外行のスタイリング
  - `opacity: 0.5` で薄く表示
  - `text-decoration: line-through` も検討
- [ ] 統計計算への反映
  - `calculateStatistics()` に除外IDを渡す
  - 除外データをフィルター後に計算
- [ ] 除外状態のリセット機能
  - 「すべて含める」ボタン
- [ ] 除外数の表示
  - 「XX件を除外中」

## 成果物
- [ ] チェックボックス機能の実装（DataTable.tsx更新）
- [ ] 除外状態管理ロジック（Dashboard.tsx更新）
- [ ] 統計計算への除外反映（dataProcessor.ts更新）

## State管理
```typescript
const [excludedIds, setExcludedIds] = useState<Set<string>>(new Set());

const handleExcludedChange = (id: string, excluded: boolean) => {
  setExcludedIds(prev => {
    const newSet = new Set(prev);
    if (excluded) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    return newSet;
  });
};
```

## 依存関係
- チケット07（データ表示機能）
- チケット09（統計値表示機能）

## 完了条件
- [ ] チェックボックスで除外設定ができる
- [ ] 除外行が視覚的に区別される
- [ ] 統計値が除外を反映して再計算される
- [ ] 全選択/全解除が機能する
- [ ] 除外数が表示される
- [ ] TypeScriptコンパイルエラーがない
