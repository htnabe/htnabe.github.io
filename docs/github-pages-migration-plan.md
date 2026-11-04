# GitHub Pages 移行計画

## 目的と決定事項

- Hugo サイトを GitHub Pages でホスティングする。
- 新しい canonical URL は `https://htnabe.github.io/` とする。
- 移行中は既存の private リポジトリ `htnabe/t-pot` をソースとして使う。
- 最終的には Hugo のソース、設定、ワークフローなども public の `htnabe/htnabe.github.io` で管理し、同リポジトリから GitHub Pages をデプロイする。
- 移行完了後、旧 `htnabe/t-pot` リポジトリは削除する。
- 移行完了の目標を **2028年1月** とする。
- Google の推奨を踏まえ、旧ドメインは新サイトへの切り替え後、少なくとも1年間 HTTP の恒久リダイレクト（301 または 308）を維持する。
- `t-pot.me` の提示された有効期限は **2027-03-18** のため、転送期間を確保するには少なくとも1年更新し、転送期間終了後に廃止する方針とする。

有効期限はユーザーから提示された日付であり、レジストラ上では未確認。更新後の有効期限、更新単位、解約期限はレジストラで確認する。移行完了目標は2028年1月だが、旧 URL からの転送を少なくとも1年間維持するため、実際のドメイン廃止日は転送開始日から1年経過した後とする。

## 現状

- `config/_default/hugo.yaml` の `baseURL` は `https://t-pot.me`。
- Bluesky 投稿ワークフローと投稿スクリプトの既定 URL が `t-pot.me` を参照する。
- `package.json` の Markdown リンクチェックにも `t-pot.me` が設定されている。
- 記事内にも旧ドメインへのリンクがある。
- `Deploy GitHub Pages` ワークフローを追加し、初回デプロイ前の確認中。
- public リポジトリ `htnabe/htnabe.github.io` は作成済み。既存の private リポジトリ `htnabe/t-pot` からソースを新しい Git 履歴で移行する。

## 重要な制約とリスク

1. **ユーザーサイトのリポジトリと公開範囲**

   `https://htnabe.github.io/` を使うには、`htnabe.github.io` リポジトリが必要。最終的にこのリポジトリを Hugo のソース管理にも使うため、サイトのビルド成果物だけでなく、リポジトリ内のソースファイルと Git 履歴も public になる。公開前に現行ファイルと、引き継ぐ場合は Git 履歴も確認し、秘密情報や公開不要な内容がないことを確認する。既存リポジトリの履歴を移行する必要がなければ、新しい履歴で始める方が過去の値を公開しない点で安全。

2. **DNS 設定だけでは転送できない**

   DNS は転送先を指定する機能ではないため、`t-pot.me` の各 URL を新しい URL へ転送するには、レジストラまたは別のホスティングサービスで HTTP 301/308 を提供する必要がある。HTTPS、パス・クエリの維持、`www` の有無を含めて、そのサービスが要件を満たすか事前に確認する。単に転送先 URL を設定できるだけで、HTTPS や 301/308 を提供しないサービスは要件を満たさない可能性がある。

3. **ドメイン更新と転送期間**

   Google Search Central は、サイト移転のリダイレクトを可能な限り長く、一般に少なくとも1年間維持することを推奨している。2027-03-18 の期限までに転送を開始しても、その後1年間維持するにはドメイン更新が必要。転送開始が遅れた場合は、廃止日もその分後ろ倒しにし、最低1年間の転送期間を確保する。ドメインを手放した後は転送を制御できず、旧 URL へのリンクが利用できなくなる可能性がある。

4. **秘密情報と Git 履歴を確認する**

   `SECURITY-REVIEW.md` の指摘に従い、Algolia の現行・過去の検索キーの制限と有効状態を確認する。新リポジトリへ既存の Git 履歴を移す場合は、過去に含まれた値も public になる前提で監査する。Actions Secrets などの実行時シークレットはソースや生成物に含めない。

## 移行手順

### 1. 事前確認と URL 対応表

- public リポジトリ `htnabe/htnabe.github.io` を作成済み。将来はソースもこのリポジトリで管理するため、公開する内容と Git 履歴の方針を確認する。
- ドメイン管理画面で、登録事業者、DNS、apex/`www` の利用状況、HTTPS 対応の転送機能、2027-03-18 以降の更新費用・更新単位・解約期限を確認する。
- Search Console、アクセス解析、SNS プロフィール、外部サイトなど、移転後に更新する管理先を洗い出す。
- 旧サイトと新サイトの URL 対応表を作る。記事、画像・ダウンロード、言語別ページを含め、旧 URL のパスを対応する新 URL に一対一で結び付ける。

### 2. ソース移行と Pages デプロイ

- Hugo のソース、コンテンツ、設定、必要なスクリプトとワークフローを `htnabe.github.io` に移す。公開不要なファイルやローカル環境用ファイルは含めない。
- Git 履歴を移すかどうかは公開前監査の結果で判断する。履歴を移さない場合も、必要なファイルを移行したことと既存の作業履歴を別途保管したことを確認する。
- `htnabe.github.io` 内の Actions で Hugo をビルドし、生成物を GitHub Pages にデプロイする。
- Actions のシークレットは GitHub Actions Secrets に保存し、ソースやビルド成果物へ出力しない。
- `config/_default/hugo.yaml` を `https://htnabe.github.io/` に切り替える。
- Pages の公開元を GitHub Actions に設定し、ビルドとデプロイの成功を確認する。

### 3. ビルド成果物の検証

新しい Pages URL で、少なくとも以下を確認する。

- トップページ、記事、画像、CSS/JavaScript、ページ内リンクが正常に表示される。
- 日本語・英語のページ、言語切り替え、canonical、hreflang が新 URL を指す。
- `sitemap.xml`、`robots.txt`、RSS などの生成 URL が新 URL を指す。
- Algolia 検索結果および Bluesky の記事リンクが新 URL を使う。
- リンクチェック用コマンドと記事中の自サイト URL を新 URL に更新する。
- public リポジトリの全ファイルと公開する Git 履歴を確認し、ソース内の秘密情報、ローカル専用データ、公開不要なファイルがない。

### 4. 切り替えとリダイレクト

- 新サイトの検証が完了してから、公開リンク、プロフィール、記事中の自サイトリンク、Search Console のサイトマップを新 URL に更新する。
- `t-pot.me` のルートだけでなく、各記事・言語ページ・対象ファイルを対応する新 URL へ直接転送する 301/308 を設定する。関連性のない一律トップページ転送や、転送の連鎖は避ける。
- apex/`www`、HTTP/HTTPS の対象 URL について、証明書と DNS を含めて実際の HTTP ステータス、転送先、パス・クエリの保持を確認する。
- 転送開始後、旧・新サイト双方のアクセスと Search Console のインデックス状況を監視する。Google Search Central の Change of Address がこの移転で利用可能かも確認する。

### 5. ドメイン廃止

- **2027-03-18 より前**に、旧 URL からの転送を続けるために必要な期間だけ更新する。
- 新サイトへの切り替え後、少なくとも1年間の転送が完了したことを確認する。移行完了の目標は2028年1月だが、転送開始が2027年1月より遅れた場合は、1年間を満たすまでドメインを維持する。
- 転送期間終了後、新サイトの継続稼働、サイトマップ、リンク、検索登録、バックアップを最終確認してから更新停止・廃止手続きを行う。期限後に旧ドメインが第三者に取得される可能性も考慮する。
- `htnabe.github.io` でサイトと必要な自動化が安定稼働し、旧リポジトリに必要な未移行データがないことを確認してから `htnabe/t-pot` を削除する。削除前に必要なバックアップを取り、ワークフローや外部連携が旧リポジトリを参照していないことを確認する。
- 廃止後は `https://htnabe.github.io/` が唯一の案内先であることを、管理するプロフィールやドキュメントで確認する。

## 目安

| 時期 | 完了条件 |
|---|---|
| 2026年11月 | public リポジトリの公開範囲、ドメイン更新・転送条件を確認 |
| 2026年12月 | ソース移行、デプロイ自動化と新 URL での機能・リンク検証を完了 |
| 2027年1月まで | 新 URL を案内先に切り替え、旧 URL からの 301/308 を開始 |
| 2027年1月〜2028年1月 | 新旧サイト、転送、検索登録を監視し、最低1年間の転送を維持 |
| 2028年1月 | `htnabe.github.io` への移行完了と `t-pot` リポジトリ削除を目標に最終確認。転送開始から1年未満の場合はドメインを維持 |
| 2028年3月18日以降を目安 | 1年間の転送完了後、更新停止・廃止（更新後の期限はレジストラで要確認） |

日程は作業計画であり、レジストラの手続き、Pages の利用条件、転送サービスの対応状況によって前後する。転送が HTTPS と URL ごとの 301/308 に対応しない場合は、ドメイン廃止前に代替手段または期限を見直す。2028-03-18 は更新後の有効期限を確認するまで仮の目安であり、最低1年間の転送を満たす日がそれより後なら、廃止も延期する。

## 参照

- [GitHub Docs: What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [GitHub Docs: Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Docs: GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Google Search Central: How to move a site](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Google Search Central: Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
