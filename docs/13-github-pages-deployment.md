# 13. GitHub Pages デプロイ設定

## 概要
GitHub Pagesへのデプロイ設定とCI/CD構築

## 目的
- 静的サイトとしてGitHub Pagesにデプロイ
- 自動デプロイの設定

## 技術スタック
- GitHub Pages
- GitHub Actions

## タスク

### Todo
- [ ] `next.config.js` の最終確認
  ```javascript
  module.exports = {
    output: 'export',
    basePath: '/line-reach-dashboard',  // リポジトリ名に合わせる
    images: {
      unoptimized: true,
    },
  }
  ```
- [ ] GitHubリポジトリの作成
  - リポジトリ名: `line-reach-dashboard`
- [ ] `.github/workflows/deploy.yml` の作成
  ```yaml
  name: Deploy to GitHub Pages

  on:
    push:
      branches: [main]

  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with:
            node-version: '18'
        - run: npm ci
        - run: npm run build
        - uses: peaceiris/actions-gh-pages@v3
          with:
            github_token: ${{ secrets.GITHUB_TOKEN }}
            publish_dir: ./out
  ```
- [ ] GitHub Pagesの有効化
  - Settings > Pages
  - Source: `gh-pages` ブランチ
- [ ] 初回ビルド・デプロイ
  - `npm run build`
  - 静的ファイルが `out/` に生成されることを確認
- [ ] デプロイテスト
  - GitHubにプッシュ
  - GitHub Actionsの実行確認
  - デプロイされたサイトの動作確認
- [ ] README.md の更新
  - デプロイURL
  - ローカル開発手順
  - データ更新手順
- [ ] `.nojekyll` ファイルの配置
  - `public/.nojekyll` を作成（空ファイル）
  - GitHub Pagesでの正しい表示を保証

## 成果物
- [ ] `.github/workflows/deploy.yml`
- [ ] 設定済みのGitHubリポジトリ
- [ ] デプロイされたGitHub Pagesサイト
- [ ] 更新されたREADME.md

## デプロイURL
`https://<ユーザー名>.github.io/line-reach-dashboard/`

## 依存関係
- すべての機能チケット（01-12）

## 完了条件
- [ ] GitHub Pagesが有効化されている
- [ ] GitHub Actionsが正常に実行される
- [ ] デプロイされたサイトが正常に動作する
- [ ] すべての機能が本番環境で動作する
- [ ] READMEにデプロイURLが記載されている

## 注意事項
- `basePath` はリポジトリ名と一致させる
- GitHub Pages有効化後、反映まで数分かかる場合がある
- カスタムドメイン設定は任意
