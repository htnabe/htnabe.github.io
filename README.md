# T-Pot

Hugo + Node.js で構成されたブログです。GitHub Pages のユーザーサイトとして
[`https://htnabe.github.io/`](https://htnabe.github.io/) で公開します。
`devcontainer` を使わず、Ubuntu ローカル環境でセットアップする手順をまとめています。

## セットアップ方針

- Ubuntu 前提
- `brew` コマンドが使える前提
- できるだけ手入力なしで、コマンド実行のみで初期化
- `devcontainer` の `postCreateCommand` と同等の処理をローカルで再現
- 開発・ビルド用 Hugo はテーマ対応版の 0.166.0 extended に固定し、初回実行時に自動取得（Linux amd64 対応）

## 最短セットアップ (Ubuntu / brew前提)

プロジェクトルートで、下記をそのまま実行してください。
依存インストール -> 初期化 -> 開発サーバ起動まで一気に実行されます。

```bash
set -euo pipefail

# Homebrew の PATH を現在シェルに反映
if [ -x /home/linuxbrew/.linuxbrew/bin/brew ]; then
  eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
fi

# devcontainer の postCreateCommand 相当ツールを導入
brew update --force --quiet
brew install node gcc go hugo ripgrep lychee gh dart-sass

# devcontainer と同様に scripts を抑止して依存取得
npm ci --ignore-scripts

# 必要な git hooks を有効化
npm run prepare

# 開発サーバ起動
npm run dev
```

開発サーバ起動後は、`http://localhost:1313` で確認できます。
`npm run dev` は初回に公式 GitHub リリースから Hugo を取得して SHA-256 を検証するため、
ネットワーク接続と `tar` が必要です。次回からはユーザーキャッシュの固定版を再利用します。
Homebrew の Hugo はモジュール管理用として残し、開発・ビルド時には使用しません。

## 初回クローンから一気に実行したい場合

リポジトリ取得から起動までを一発で実行する例です。

```bash
set -euo pipefail

git clone https://github.com/htnabe/htnabe.github.io.git
cd htnabe.github.io

if [ -x /home/linuxbrew/.linuxbrew/bin/brew ]; then
  eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
fi

brew update --force --quiet
brew install node gcc go hugo ripgrep lychee gh dart-sass
npm ci --ignore-scripts
npm run prepare
npm run dev
```

## 主要コマンド

- `npm run dev`: 固定版 Hugo でローカル開発サーバ起動
- `npm run dev:166`: `dev` と同じ固定版を使う別名
- `npm run build`: 固定版 Hugo で本番ビルド (`--minify --gc`)
- `npm run algolia`: `algolia.json` 生成と Algolia 反映
- `npm run update:theme`: Hugo module テーマ更新
- `npm run format`: フォーマット実行

## 補足

- `public/` と `resources/` は生成物なので直接編集しません。
- `npm ci --ignore-scripts` を使うため、Git hooks は `npm run prepare` で明示的に有効化します。
- リンクチェックのみ実行したい場合は `npm run linkcheck:md` を使います。
- 固定版 Hugo の保存先と取得エラー時の対処は [Development Workflow](docs/development-workflow.md#pinned-hugo) を参照してください。

## ライセンス

- Hugo のソースコード、設定、ビルドスクリプトは MIT License (`LICENSE`) で公開します。
- 記事などのサイトコンテンツは、特記がない限り CC BY-NC 4.0 です。詳しくは [コンテンツのライセンス](CONTENT-LICENSE.md) を参照してください。
- 第三者の画像・文章・商標など、サイト管理者が権利を持たない素材は上記ライセンスの対象外です。

## GitHub Pages と自動化

- GitHub Actions の `Deploy GitHub Pages` が `main` への push または手動実行でサイトをビルド・公開します。
- Bluesky の自動投稿を有効にする場合は、Actions Variables の `BLUESKY_AUTOPUBLISH_ENABLED=true` と Actions Secrets の `BLUESKY_HANDLE`、`BLUESKY_APP_PASSWORD` を設定します。初期移行時の過去記事一括投稿を防ぐため、変数を設定するまでは push 時の投稿を行いません。
- Algolia の検索インデックス更新を有効にする場合は、Actions Variables の `ALGOLIA_UPLOAD_ENABLED=true` と Actions Secrets の `ALGOLIA_APP_ID`、`ALGOLIA_ADMIN_API_KEY`、`ALGOLIA_INDEX_NAME` を設定します。

## ドキュメント

- 開発・運用の詳細: [docs/README.md](docs/README.md)
- AI エージェント向けの作業ルールとタスク定義: [AGENTS.md](AGENTS.md)
