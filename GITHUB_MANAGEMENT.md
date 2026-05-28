# GitHub Management Playbook

This file describes the default GitHub operating model for this repository.

## Repository Shape

- Use the repository for code, project-local docs, and release notes.
- Keep reusable starter content in the shared defaults repo when it is meant to
  be copied across projects.
- Keep contributor-facing templates aligned with the repo's actual workflow.

## Branch Policy

- Protect `main` or the default branch.
- Require pull requests for changes that affect shared docs, release notes, or
  runtime behavior.
- Require status checks for validation steps that matter.
- Block force pushes and branch deletion on protected branches.

## Review Policy

- Treat AI-generated changes as needing the same review as human changes.
- Prefer small, atomic pull requests.
- Require a human reviewer for release, security, and workflow changes.

## Template Policy

- Store repo-specific templates in this repository when they are meant to be
  edited locally.
- Keep `SECURITY.md`, issue templates, and PR templates aligned with the repo's
  actual workflow if those files are added later.

## GitHub Actions Policy

- Keep workflow permissions minimal.
- Use `GITHUB_TOKEN` with read-only defaults unless a job needs writes.
- Prefer repository-scoped automation over broad personal tokens.
- Require review for workflow file changes.

## Release And Sync Policy

- Use `RELEASE_CHECKLIST.md` before publishing a tag, sync, or release branch.
- Confirm changelog entries match the user-visible story.
- Verify the working tree is clean before pushing a release commit.
- Record what was validated and what remains risky.
