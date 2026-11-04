# Security Review: Public Repository Visibility

## Scope

Read-only review of tracked files and locally reachable Git history to identify
credentials that could be exposed if this repository becomes public. Secret
values are intentionally not reproduced here.

## Findings

| Severity | Location | Finding | Assessment |
|---|---|---|---|
| LOW | `config/_default/params.yaml:137` | A literal Algolia `searchOnlyApiKey` is present in the current configuration. | This appears intended for client-side search and may be public, but its active status and restrictions (such as allowed operations, domains, and usage limits) cannot be verified from the repository. Confirm these in Algolia before making the repository public. |
| LOW | `hugo.yaml:64,68,95-99`; `config/_default/params.yaml:80-81,135-137` | Earlier values for the search-only key are present in locally reachable Git history. | Their active status cannot be determined from the repository. Revoke any superseded keys that remain active. |

No embedded Algolia admin/write key, Bluesky app password, GitHub token, or
private-key pattern was identified in tracked files or locally reachable Git
history. The local `.env` file is ignored and untracked; it is not included in
the repository files examined for public exposure.

## Before Changing Visibility

1. In Algolia, verify that the configured key is restricted to the required
   search-only operations and has appropriate usage limits.
2. Check whether historical key values are still active; revoke obsolete keys.
3. Review any secrets outside Git that may be used by Actions or local tooling,
   and confirm they are not copied into generated public artifacts.
