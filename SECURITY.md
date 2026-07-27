# Security Defaults

Use this file as the starting point for repository security guidance in this
project.

## Goals

- keep secrets out of the repository
- make automation predictable and minimal
- surface security issues early
- keep the repo easy to audit

## Repository Defaults

- Keep API keys, tokens, service passwords, and private URLs out of source
  files, docs, prompts, logs, and changelogs.
- Prefer environment variables or local-only configuration for secrets.
- Never commit `.env` files or other local credential stores.
- Treat AI feature keys, PDF source URLs, and private test fixtures as
  sensitive if they are not meant for public distribution.
- Review dependency and workflow changes like code, not just configuration.

## GitHub Actions Defaults

- Set the default `GITHUB_TOKEN` permission to `read` unless a workflow needs
  more.
- Grant write permissions only to the specific job that needs them.
- Avoid broad repository write tokens in workflows.
- Pin third-party actions to commit SHAs when practical.
- Treat workflow changes as privileged changes and require review.

## If A Secret Leaks

1. Revoke or rotate the secret immediately.
2. Remove the secret from the repository and its history if needed.
3. Verify whether GitHub secret scanning or push protection caught it.
4. Record the incident in `DEVELOPMENT_LOG.md` if the repo keeps one.

## New Providers (Zhipu / xAI OAuth)

- Z.ai Coding Plan keys and xAI API keys follow the same rules as other
  provider keys (Settings storage, optional dev-only Vite `define`).
- **xAI OAuth access/refresh tokens** are session secrets: prefer
  `sessionStorage`, never log them, never commit them, never put them in
  CHANGELOG or issue templates.
- See `docs/SHARED_AI_PROVIDERS_ZHIPU_GROK.md`.

## AI Keys And Public Builds

- Prefer runtime keys entered in Settings (stored in the browser only).
- `vite.config.ts` can inject `VITE_*` / provider env vars via `define` for
  local convenience. **Do not bake production secrets into public builds** —
  anything passed through Vite `define` is readable in the shipped JS.
- For public deploy: leave provider env vars unset at build time, or strip
  baked keys unless an explicit opt-in is documented for a private host.
- Treat `localStorage` API keys as XSS-sensitive; do not log them.

## Notes

- This repository is a public fan project, so keep legal and privacy-sensitive
  material out of release artifacts.
- Pair this file with branch protection or CODEOWNERS when stricter review
  control is needed.
- Engineering proposal: `docs/OPTIMIZATION_PROPOSAL.md`.
