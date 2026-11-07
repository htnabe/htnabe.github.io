# ローカル開発環境のセットアップ

`devcontainer` を使わず、Ubuntu ローカル環境でセットアップする手順をまとめています。

## セットアップ方針

- Ubuntu 前提
- `brew` コマンドが使える前提
- できるだけ手入力なしで、コマンド実行のみで初期化
- `devcontainer` の `postCreateCommand` と同等の処理をローカルで再現
- 開発・ビルド用 Hugo は起動ごとに最新安定版の extended を確認し、必要に応じて自動取得（Linux amd64 対応）

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
`npm run dev` は毎回公式 GitHub API で最新安定版を確認するため、ネットワーク接続が必要です。
未取得の最新版は公式リリースからダウンロードし、SHA-256 を検証してユーザーキャッシュに保存します。
取得済みの最新版はキャッシュを再利用します。ダウンロードしたアーカイブの展開には `tar` が必要です。
`npm run build`、`npm run algolia`、`npm run update:theme` と GitHub Actions も同じ処理を使います。
Homebrew の `hugo` を直接使う場合は、`brew update` と `brew upgrade hugo` で別途更新してください。

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

## 補足

- `public/` と `resources/` は生成物なので直接編集しません。
- `npm ci --ignore-scripts` を使うため、Git hooks は `npm run prepare` で明示的に有効化します。
- リンクチェックのみ実行したい場合は `npm run linkcheck:md` を使います。
- 主要コマンド、Hugo の保存先と取得エラー時の対処は [Development Workflow](development-workflow.md) を参照してください。
