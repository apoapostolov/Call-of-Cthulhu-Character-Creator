# Release Checklist

Use this before publishing, tagging, or syncing a release.

## Preflight

- [ ] Read `DEVELOPMENT_PLAN.md` and `DEVELOPMENT_LOG.md`
- [ ] Confirm the changelog reflects the user-visible outcome, not just the
  code churn
- [ ] Run the narrowest relevant validation command
- [ ] Run `npm test` if the change touches logic, data flow, or saved-state
  behavior
- [ ] Run `npm run build` if the change affects runtime output, bundling, or
  environment setup
- [ ] Check for unrelated working tree changes
- [ ] Confirm `.env` files, secrets, and private artifacts are excluded

## Publish

- [ ] Update version or release metadata if the project uses it
- [ ] Regenerate derived outputs instead of editing them by hand
- [ ] Commit only the related files
- [ ] Tag or push only if the project policy allows it

## Post-Release

- [ ] Record the final validation result in `DEVELOPMENT_LOG.md`
- [ ] Backfill any missing changelog notes while the work is fresh
- [ ] Note residual risk or follow-up work

## Notes

- Keep this list short enough that it stays useful.
- If the repo develops stricter release steps, copy this file and extend the
  local version instead of rewriting the shared pattern.
