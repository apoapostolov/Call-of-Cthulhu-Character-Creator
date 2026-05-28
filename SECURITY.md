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

## Notes

- This repository is a public fan project, so keep legal and privacy-sensitive
  material out of release artifacts.
- Pair this file with branch protection or CODEOWNERS when stricter review
  control is needed.
