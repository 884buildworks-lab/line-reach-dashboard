# LINE自治体普及率ダッシュボード 要件定義書

## 1. プロジェクト概要

### 1.1 目的
日本全国の自治体におけるLINE公式アカウントの友だち数と人口データを組み合わせ、対人口比での普及率を可視化するWebダッシュボードを構築する。

### 1.2 利用者
- 自社メンバー（限定公開）
- アクセス方法: GitHub PagesのURLを社内共有

### 1.3 データソース
- LINE友だち数: https://uub.jp/opm/ml_line.html （スクレイピング + 手動補完）
- 人口データ: e-Stat API（推計人口データ）

---

## 2. 技術スタック

### 2.1 フロントエンド
- **Framework**: Next.js 14 (App Router)
- **デプロイ**: GitHub Pages（静的エクスポート）
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS（推奨）
- **データ可視化**: 必要に応じて追加（現時点では数値表示のみ）

### 2.2 バックエンド（データ処理）
- **言語**: Python 3.x
- **スクレイピング**: BeautifulSoup4 / requests
- **API連携**: requests（e-Stat API）
- **データ処理**: pandas

### 2.3 データ管理
- **形式**: CSV
- **保存場所**: `public/data/` ディレクトリ
- **命名規則**: `YYYY-MM.csv` （例: `2024-11.csv`）

---

## 3. ディレクトリ構成

```
line-municipality-dashboard/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # メインダッシュボード
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Dashboard.tsx            # ダッシュボードメインコンポーネント
│   │   ├── FilterPanel.tsx          # フィルタリングUI
│   │   ├── DataTable.tsx            # データ一覧表示
│   │   ├── StatsDisplay.tsx         # 統計値表示
│   │   └── ExportButton.tsx         # CSVエクスポート機能
│   ├── lib/
│   │   ├── dataLoader.ts            # CSVデータ読み込み
│   │   ├── dataProcessor.ts         # データ集計・計算
│   │   └── csvExporter.ts           # CSV出力機能
│   └── types/
│       └── municipality.ts          # 型定義
├── public/
│   └── data/
│       ├── 2024-11.csv
│       ├── 2024-12.csv
│       └── 2025-01.csv
├── scraper/
│   ├── scrape_line.py               # LINEデータスクレイピング
│   ├── fetch_population.py          # e-Stat人口データ取得
│   ├── merge_data.py                # データ統合・CSV生成
│   ├── requirements.txt
│   └── README.md                    # スクレイピング手順
├── next.config.js
├── package.json
└── README.md
```

---

## 4. 機能要件

### 4.1 データ表示機能
- [ ] 全自治体のリスト表示（テーブル形式）
- [ ] 各自治体の以下情報を表示:
  - 自治体名
  - 都道府県
  - アカウント名
  - LINE友だち数
  - 人口
  - 登録率（％）= (友だち数 ÷ 人口) × 100
  - 人口規模区分

### 4.2 フィルタリング機能
- [ ] **都道府県フィルター**: ドロップダウンで都道府県を選択
- [ ] **地方ブロックフィルター**: 
  - 北海道・東北
  - 関東
  - 中部
  - 近畿
  - 中国
  - 四国
  - 九州・沖縄
- [ ] **人口規模フィルター**:
  - 政令指定都市
  - 中核市
  - 一般市
  - 町村
- [ ] 複数フィルターの組み合わせ対応

### 4.3 統計値表示機能
- [ ] フィルター適用後の以下統計値を表示:
  - 平均登録率
  - 中央値
  - 最大値・最小値
  - 対象自治体数

### 4.4 外れ値除去機能
- [ ] テーブル上で各行にチェックボックスを配置
- [ ] チェックした自治体を統計計算から除外
- [ ] 除外した自治体は薄く表示（視覚的フィードバック）
- [ ] 除外状態は統計値に即座に反映

### 4.5 時系列データ選択機能
- [ ] データファイル（月次）をドロップダウンで選択
- [ ] `public/data/` 内の全CSVファイルを自動検出
- [ ] 選択したデータでダッシュボードを更新

### 4.6 CSVエクスポート機能
- [ ] 現在のフィルター・除外設定を適用したデータをCSV出力
- [ ] ダウンロードファイル名: `filtered_data_YYYYMMDD.csv`
- [ ] ブラウザでダウンロード実行

---

## 5. データ構造

### 5.1 CSVフォーマット

| カラム名 | データ型 | 説明 | 例 |
|---------|---------|------|-----|
| municipality_code | string | 自治体コード（6桁） | "011002" |
| municipality_name | string | 自治体名 | "札幌市" |
| prefecture | string | 都道府県名 | "北海道" |
| account_name | string | LINEアカウント名 | "札幌市公式" |
| friends_count | number | LINE友だち数 | 150000 |
| population | number | 人口 | 1973395 |
| registration_rate | number | 登録率（％） | 7.6 |
| population_category | string | 人口規模区分 | "政令指定都市" |
| updated_at | string | 更新日（YYYY-MM-DD） | "2024-11-15" |

### 5.2 TypeScript型定義（参考）

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

---

## 6. スクレイピング要件

### 6.1 LINE友だち数取得
- **URL**: https://uub.jp/opm/ml_line.html
- **取得データ**:
  - 自治体名
  - アカウント名
  - 友だち数
- **実装**: BeautifulSoup4でHTMLパース
- **エラーハンドリング**: 取得失敗時はログ出力、手動入力用のテンプレートCSV生成

### 6.2 人口データ取得
- **API**: e-Stat API（推計人口）
- **取得データ**:
  - 自治体コード
  - 人口
- **実装**: requests経由でAPI呼び出し
- **API Key**: 環境変数 `ESTAT_API_KEY` から取得

### 6.3 データ統合
- LINE友だちデータと人口データを自治体名でマッチング
- 登録率を自動計算
- 最終的なCSVを `public/data/YYYY-MM.csv` に出力

---

## 7. 実装の優先順位

### Phase 1: スクレイピング基盤（最優先）
1. Pythonスクレイピングスクリプト開発
2. e-Stat API連携
3. データ統合・CSV出力機能

### Phase 2: ダッシュボード基本機能
1. Next.jsプロジェクトセットアップ
2. CSVデータ読み込み機能
3. テーブル表示
4. 基本的な統計値表示

### Phase 3: フィルタリング機能
1. 都道府県フィルター
2. 地方ブロックフィルター
3. 人口規模フィルター

### Phase 4: 追加機能
1. 外れ値除外機能
2. 時系列データ選択
3. CSVエクスポート機能

---

## 8. 実装時の注意点

### 8.1 GitHub Pages設定
- `next.config.js` で静的エクスポート設定
```javascript
module.exports = {
  output: 'export',
  basePath: '/repository-name',
  images: {
    unoptimized: true,
  },
}
```

### 8.2 データ更新フロー
1. `scraper/` でスクリプト実行
2. 生成されたCSVを `public/data/` に配置
3. Gitコミット & プッシュ
4. GitHub Actions（または手動）でデプロイ

### 8.3 パフォーマンス
- CSVは静的ファイルとしてビルド時に読み込み
- クライアント側でフィルタリング処理（データ量が少ないため問題なし）
- 1,700自治体程度であれば全データをメモリ展開可能

### 8.4 セキュリティ
- URLの限定共有のみ（Basic認証等は不要）
- e-Stat API Keyは環境変数管理（`.env` をgitignore）

---

## 9. 成果物

### 9.1 デリバラブル
- [ ] Next.jsダッシュボードアプリケーション
- [ ] Pythonスクレイピングスクリプト一式
- [ ] 初回データCSV（最低1ファイル）
- [ ] README（セットアップ・更新手順）

### 9.2 ドキュメント
- [ ] スクレイピング実行手順書
- [ ] データ更新手順書
- [ ] デプロイ手順書

---

## 10. 未決定事項・今後の検討

- [ ] グラフ表示機能の要否（現時点では不要だが将来的に追加の可能性）
- [ ] 複数月データの比較表示UI
- [ ] 自治体詳細ページの要否

---

**作成日**: 2024-11-26  
**作成者**: ケイタ  
**バージョン**: 1.0
