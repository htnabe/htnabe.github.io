# Security Review: Public Repository

## Scope

This review covers the source files published in this repository. The initial
commit imports the site source without the Git history of the former private
`htnabe/t-pot` repository. Secret values are intentionally not reproduced here.

## Findings

| Severity | Location | Finding | Assessment |
|---|---|---|---|
| LOW | `config/_default/params.yaml:137` | A literal Algolia `searchOnlyApiKey` is present in the current configuration. | This appears intended for client-side search and is now public. Its active status and restrictions (such as allowed operations, domains, and usage limits) cannot be verified from the repository. Confirm these in Algolia. |
| LOW | Former private repository history (not copied) | Earlier values for the search-only key existed in the original `htnabe/t-pot` Git history. | Those values are not in this repository's Git history. Their active status cannot be determined here; revoke any superseded keys that remain active. |

No embedded Algolia admin/write key, Bluesky app password, GitHub token, or
private-key pattern was identified in the published source files. The former
repository's `.env` file was ignored and untracked and was not copied.

## Operational Follow-up

1. In Algolia, verify that the configured key is restricted to the required
   search-only operations and has appropriate usage limits.
2. Check whether historical key values from the former repository are still
   active; revoke obsolete keys.
3. Store automation credentials only in GitHub Actions Secrets, and confirm
   they are not copied into generated public artifacts.
