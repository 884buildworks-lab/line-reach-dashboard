# 02. 型定義

## 概要
TypeScript型定義ファイルの作成

## 目的
- データ構造の型安全性を確保
- 自治体データに関する型定義を作成

## タスク

### Todo
- [x] `src/types/municipality.ts` の作成
- [x] `Municipality` インターフェースの定義
  ```typescript
  interface Municipality {
    municipality_code: string;
    municipality_name: string;
    prefecture: string;
    account_name: string;
    friends_count: number;
    population: number;
    registration_rate: number;
    population_category: '政令指定都市' | '中核市' | '一般市' | '町村';
    updated_at: string;
  }
  ```
- [x] `PopulationCategory` 型の定義
- [x] `RegionBlock` 型の定義（地方ブロック）
  ```typescript
  type RegionBlock =
    | '北海道・東北'
    | '関東'
    | '中部'
    | '近畿'
    | '中国'
    | '四国'
    | '九州・沖縄';
  ```
- [x] `FilterState` インターフェースの定義
  ```typescript
  interface FilterState {
    prefecture?: string;
    region?: RegionBlock;
    populationCategory?: PopulationCategory;
  }
  ```
- [x] `Statistics` インターフェースの定義
  ```typescript
  interface Statistics {
    average: number;
    median: number;
    max: number;
    min: number;
    count: number;
  }
  ```
- [x] 都道府県リストの定数定義
- [x] 地方ブロックマッピングの定数定義

## 成果物
- [x] `src/types/municipality.ts`

## 依存関係
- チケット01（プロジェクトセットアップ）

## 完了条件
- [x] すべての型定義が作成されている
- [x] TypeScriptコンパイルエラーがない
- [x] 型定義が他ファイルからインポート可能
