# Project Structure

This project is a Hugo-based blog with a Hugo module theme.

## Root Files

- `README.md`: Human-facing setup and command entry point
- `AGENTS.md`: Agent-facing orientation and task/automation index
- `config/_default/`: Main Hugo configuration split by key (for example `hugo.yaml`, `params.yaml`, `menus.yaml`)
- `package.json`: Build/dev/update scripts and npm-managed Node dependencies
- `go.mod`: Hugo module dependency definition
- `.prettierrc`: Formatting rules

## Primary Source Directories

- `content/`: Markdown content root
- `content/ja/`: Japanese content
- `content/en/`: English content
- `content/{ja,en}/posts/{daily,gallery,math,tech}/`: Category-based post directories
- `layouts/`: Hugo layout overrides and partials
- `assets/`: Source styles and assets (for example `assets/css/_custom.scss`)
- `archetypes/`: Front matter templates for new content
- `static/`: Static files copied as-is to build output
- `docs/`: Development, operational, and archived project documentation
- `.github/`: GitHub automation configuration plus agent definitions and task skills

## Workspace/Theme Related

- `packages/hugoautogen/`: Hugo npm package metadata workspace mirrored into the npm workspace
- `packages/hugoautogen/hugo_packagemeta.json`: Hugo-generated npm metadata

## Generated Directories (Do Not Edit Directly)

- `public/`: Built site output
- `resources/`: Hugo resource cache and generated assets
- `node_modules/`: Installed npm-managed packages

## Typical Edit Targets

- Add/update posts: `content/{ja,en}/posts/**`
- Adjust site config: `config/_default/*.yaml`
- Adjust styles: `assets/css/_custom.scss`
- Add custom head/script snippets: `layouts/partials/custom-head.html`
