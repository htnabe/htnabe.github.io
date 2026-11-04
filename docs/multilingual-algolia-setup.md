# HikaeMe での多言語 Algolia 対応

多言語サイトで Algolia 用 JSON を出力するための最小構成。

## 出力先

- `/algolia.json`: 既定言語（ja）
- `/en/algolia.json`: 英語（en）

## 必須設定

### `config/_default/hugo.yaml`

```yaml
defaultContentLanguage: "ja"
defaultContentLanguageInSubdir: false

languages:
  ja:
    locale: "ja-JP"
    label: "日本語"
    weight: 1
  en:
    locale: "en-US"
    label: "English"
    weight: 2
```

### `config/_default/outputFormats.yaml`

```yaml
Algolia:
  baseName: "algolia"
  isPlainText: true
  mediaType: "application/json"
  notAlternative: true
```

### `config/_default/outputs.yaml`

```yaml
home:
  - "HTML"
  - "Algolia"
section:
  - "HTML"
```

### `config/_default/params.yaml`

```yaml
enableAlgolia: true

algolia:
  appId: "YOUR_APP_ID"
  searchOnlyApiKey: "YOUR_SEARCH_ONLY_API_KEY"
  indexName: "nabeBlog"
  vars:
    - "title"
    - "summary"
    - "content"
    - "date"
    - "publishdate"
    - "permalink"
    - "keywords"
  params:
    - "tags"
    - "categories"
```

## コンテンツ配置

- 日本語: `content/ja/**`
- 英語: `content/en/**`

## GitHub Actions による自動更新

`.github/workflows/update-algolia.yml` は main への push（PR のマージを含む）で
サイトをビルドし、`algolia-uploader` で日本語・英語の両 JSON を同じインデックスに反映します。
翻訳記事同士の上書きを防ぐため、アップロード前に `objectID` に `ja:` / `en:` を付けます。
記事の削除や設定変更も反映するため、変更パスによる実行制限はありません。
ビルド用の Dart Sass は公式リリースの固定バージョンを SHA-256 検証後にインストールします。

リポジトリの **Settings → Secrets and variables → Actions** に、次の Repository secrets を登録してください。

| Secret | 設定値 |
| --- | --- |
| `ALGOLIA_APP_ID` | `config/_default/params.yaml` の `algolia.appId` と同じ App ID |
| `ALGOLIA_ADMIN_API_KEY` | 対象インデックスの更新に必要な権限を持つ API キー（検索専用キーは不可） |
| `ALGOLIA_INDEX_NAME` | サイト設定の `algolia.indexName` と同じインデックス名（現在は `nabeBlog`） |

キーの値をコードやログに記載しないでください。Secret が未設定の場合、アップロードは明示的に失敗します。
Actions の **Update Algolia index → Run workflow** から、main を選択して手動実行することもできます。
main 以外を選択した手動実行はスキップします。更新の競合を避けるため、アップロードは同時実行しません。

## 検証

```bash
npm run build
jq 'length' public/algolia.json
jq 'length' public/en/algolia.json
jq '.[0].permalink' public/en/algolia.json
```
