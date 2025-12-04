# 01. プロジェクトセットアップ

## 概要
Next.js 14プロジェクトの初期セットアップと基本設定を行う

## 目的
- Next.js 14（App Router）のプロジェクト環境を構築
- GitHub Pages向けの静的エクスポート設定
- 基本的なディレクトリ構造の作成

## 技術スタック
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## タスク

### Todo
- [x] Next.jsプロジェクトの初期化（`npx create-next-app@latest`）
  - TypeScript: Yes
  - Tailwind CSS: Yes
  - App Router: Yes
- [x] 必要な依存パッケージのインストール
- [x] `next.config.js` の設定
  - 静的エクスポート設定（`output: 'export'`）
  - `basePath` 設定（リポジトリ名に合わせる）
  - 画像最適化の無効化（`images.unoptimized: true`）
- [x] ディレクトリ構造の作成
  ```
  src/
  ├── app/
  ├── components/
  ├── lib/
  └── types/
  public/
  └── data/
  ```
- [x] `.gitignore` の確認・更新
  - `node_modules/`
  - `.next/`
  - `out/`
  - `.env.local`
- [x] README.md の作成（プロジェクト概要）

## 成果物
- [x] 初期化されたNext.jsプロジェクト
- [x] 設定済みの`next.config.js`
- [x] 基本ディレクトリ構造
- [x] README.md

## 参考資料
- Next.js公式ドキュメント: https://nextjs.org/docs
- GitHub Pages with Next.js: https://nextjs.org/docs/pages/building-your-application/deploying/static-exports

## 依存関係
- なし（最初のチケット）

## 完了条件
- [x] `npm run dev` でローカル開発サーバーが起動する
- [x] `npm run build` で静的エクスポートが成功する
- [x] Tailwind CSSが正常に動作する
