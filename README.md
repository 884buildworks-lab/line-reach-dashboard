# LINE自治体普及率ダッシュボード

日本全国の自治体におけるLINE公式アカウントの友だち数と人口データを組み合わせ、対人口比での普及率を可視化するWebダッシュボード。

## 概要

このプロジェクトは、自治体のLINE公式アカウントの普及率を分析・可視化するためのダッシュボードアプリケーションです。

### 主な機能

- 全国自治体のLINE友だち数と人口データの一覧表示
- 都道府県・地方ブロック・人口規模によるフィルタリング
- 統計値の自動計算（平均、中央値、最大値、最小値）
- 外れ値除外機能
- 時系列データの切り替え
- CSVエクスポート機能

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **デプロイ**: GitHub Pages（静的エクスポート）
- **データ処理**: Python 3.x（スクレイピング）

## セットアップ

### 必要な環境

- Node.js 18以上
- npm または yarn
- Python 3.x（データ収集用）

### インストール

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

### ビルド

```bash
# 静的ファイルの生成
npm run build

# 生成されたファイルは out/ ディレクトリに出力されます
```

## データ更新手順

1. スクレイピングスクリプトの実行（詳細は `scraper/README.md` を参照）
2. 生成されたCSVを `public/data/` に配置
3. Gitコミット & プッシュ
4. GitHub Actionsで自動デプロイ

## プロジェクト構造

```
line-reach-dashboard/
├── app/                    # Next.js App Router
│   ├── page.tsx           # メインページ
│   ├── layout.tsx         # レイアウト
│   └── globals.css        # グローバルスタイル
├── components/            # Reactコンポーネント
├── lib/                   # ユーティリティ関数
├── types/                 # TypeScript型定義
├── public/
│   └── data/             # CSVデータファイル
├── scraper/              # Pythonスクレイピングスクリプト
└── docs/                 # 開発チケット・ドキュメント
```

## ライセンス

このプロジェクトは社内利用を目的としています。

## 作成者

ケイタ
