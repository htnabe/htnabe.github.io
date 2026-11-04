# Agent Guardrails

## Editing Scope

- Prefer minimal diffs and avoid unrelated formatting changes.
- Edit source files only; do not hand-edit generated output.
- Avoid broad rewrites of long markdown articles unless requested.

## Do Not Edit Directly

- `public/**`
- `resources/**`
- `node_modules/**`

## Security and Scope

- Do not add or expose secrets.
- Do not change external service credentials or keys unless explicitly requested.

## References

- Build and validation commands: `docs/development-workflow.md`
