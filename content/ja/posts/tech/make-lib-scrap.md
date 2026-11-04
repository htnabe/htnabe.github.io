---
title: "CLIライブラリ作成メモ"
date: 2025-11-16T13:20:32Z
draft: false
show_date: true
toc: true
tags: [CLI, Scrap]
categories: [Tech]
thumbnail: ""
---

## 2025-11-16

### コミットに署名を追加する

農産物みたく「私が作りました」を表示する。

当初、`devcontainer`上でGPG鍵を作成しようしたがエラーが出てしまっていた。調べてみると、いろいろと黒魔術っぽいことすれば回避できるようだったが、だる過ぎるので署名にSSHを使うことにした。

下の記事を参考にした。

{{<blogcard url="https://qiita.com/haw_ohnuma/items/51fa84449bc4a1393846">}}

ローカル → Githubへの`Authenticaion`にSSHの公開鍵を登録してSSH接続するのと同じようにして、`Signing-key`に公開鍵を登録する。

ローカル側でも細かい設定が必要だが、詳細は上記記事を参照して下し亜。

### いまさらながらGithub Actionsを使って自動publishを試す

地味に開発を続けている[algolia-uploader](https://github.com/htnabe/algolia-uploader)について、いまさらながらGithub Actionsで新しいタグが出た際に自動的に`npm publish`コマンドが走るように設定した。

- 主役のファイル：[publish.yml](https://github.com/htnabe/algolia-uploader/blob/main/.github/workflows/publish.yml)

まず`npmjs`のGUI上からトークン生成する際に躓いた。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1763301281/tech/npmjs-gui_ikaoja.webp" alt="npmjs-gui">}}

`Packages and scopes`の説明しかり、`Bypass 2FA`の説明しかり「いったいどういう意味だってばよ」状態になってた。

少し調べたら出てきますが、各選択肢は下記記事の説明に従って作ればよいはず。

{{<blogcard url="https://zenn.dev/wakamsha/articles/about-publishing-node-packages#npm-access-token-%E3%81%AE%E7%99%BA%E8%A1%8C%E6%89%8B%E9%A0%86">}}

上記はいったん解決したが、普通に`NPM_TOKEN`を設定しただけだと次のようなエラーが出た。

```plaintext
npm error 403 403 Forbidden - PUT https://registry.npmjs.org/algolia-uploader - Two-factor authentication is required to publish this package but an automation token was specified
npm error 403 In most cases, you or one of your dependencies are requesting
npm error 403 a package version that is forbidden by your security policy, or
npm error 403 on a server you do not have access to.
npm error A complete log of this run can be found in: /home/runner/.npm/_logs/2025-11-16T04_29_06_002Z-debug-0.log
```

原因を探していくうちにnpmjsの`Trusted Publisher`なるものを知った。最近？あったnpmのサプライチェーン攻撃に対する対処の一つなのかな？知らんけど。

{{<blogcard url="https://docs.npmjs.com/trusted-publishers">}}

後はGithubの公式ドキュメントを読んだ。

{{<blogcard url="https://docs.github.com/ja/actions/tutorials/publish-packages/publish-nodejs-packages">}}

まずは次の記載を追加。

```yml
name: Publish Package to npmjs
on:
  release:
    types: [published]
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write # <- ここが大事
```

あと`package.json`に`repository.url`を設定していないとなんかエラーが出る。

```plaintext
npm error code E422
npm error 422 Unprocessable Entity - PUT https://registry.npmjs.org/algolia-uploader - Error verifying sigstore provenance bundle: Failed to validate repository information: package.json: "repository.url" is "", expected to match "https://github.com/htnabe/algolia-uploader" from provenance
npm error A complete log of this run can be found in: /home/runner/.npm/_logs/2025-11-16T08_24_40_553Z-debug-0.log
```

なので次のように`package.json`にurlを追加したらエラーが出なくなった。

```json
  "repository": {
    "type": "git",
    "url": "https://github.com/octocat/my-other-repo.git"
  },
```

urlの最後に.gitを付ける必要がある or 付けた方が良いらしい。あと、`provenance`（来歴）なるものを表示するために必要らしい。これもパッケージの安全性を担保する仕組みの一つなのかな？

運用としては以下のようにした。

1. ローカルで変更を加え
1. `npm version patch`みたいなコマンドで`package.json`に記載のバージョンを上げるついでにタグも作る
1. タグをリモートに上げる
1. npmパッケージの発行アクションが発火
1. 指定したバージョンの確認と、脆弱性を含んだライブラリが含まれてないか確認してpublish

### 古いバージョンのパッケージの削除

[公式のドキュメント](https://docs.npmjs.com/policies/unpublish)にある通り、公開から72時間以内であれば`npm unpublish`コマンドで削除できる。

72時間以上であっても、いくつかの条件を満たせば削除できる。

あるいは、非推奨のバージョンのパッケージであるとして次のようなコマンドで警告を出すこともできる。

`npm deprecate <package>@<version> "<message>"`

ということでいったんパッケージの自動publishまで実装完了した。
