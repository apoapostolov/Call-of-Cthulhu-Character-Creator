# AGENTS.md - Project Operating Contract

## Purpose

This repository contains a Vite + React + TypeScript app for creating Call of
Cthulhu investigators and exporting filled character sheets.

Use this file as the local operating contract for AI-assisted work in this
repo. Project-local instructions always win inside this tree.

## Source Hierarchy

Use this order when instructions conflict:

1. explicit user instruction in the current session
2. nearest project or folder `AGENTS.md`
3. this file
4. `README.md`, `TODO.md`, `DEVELOPMENT_PLAN.md`, `DEVELOPMENT_LOG.md`, and
   `CHANGELOG.md`
5. surrounding code and repository conventions
6. external best practices only after local practice is understood

## Operating Principles

- Keep `eras/*` data files authoritative for era-specific content.
- Treat generated assets such as build output as derived, not canonical.
- Keep secrets and API keys out of source files, docs, prompts, and logs.
- Use absolute dates in logs, decisions, and release notes.
- Prefer explicit file paths, commands, and validation steps.
- Preserve existing user changes unless the task explicitly asks to replace
  them.
- Do not leave planning labels in production code or user-facing copy.

## Standard Work Loop

### 1. Orient

- Read the nearest `AGENTS.md`.
- Inspect `README.md`, `TODO.md`, `DEVELOPMENT_PLAN.md`,
  `DEVELOPMENT_LOG.md`, and `CHANGELOG.md` before changing behavior.
- Check the working tree and avoid touching unrelated user changes.

### 2. Plan

- Use `TODO.md` for execution-ready work queues.
- Use `DEVELOPMENT_PLAN.md` for the forward-looking plan of the current
  repository or active epic.
- Keep each prompt specific enough that another capable executor can continue
  without hidden context.

### 3. Execute

- Follow existing project structure and style before introducing new patterns.
- Keep edits scoped to the request and adjacent ownership boundary.
- Prefer small, atomic changes over broad rewrites unless the repo already
  favors larger generated updates.

### 4. Validate

- Run the narrowest relevant check first.
- For this repo, start with `npm test` or `npm run build` when behavior or
  runtime output changes.
- If validation cannot be run, say why and record the residual risk in the log.

### 5. Record

- Update `DEVELOPMENT_LOG.md` for meaningful code, workflow, or docs changes.
- Update `CHANGELOG.md` only for user-visible changes, and apply the
  overwrite-first rule from the shared defaults changelog guide when editing
  `Unreleased` so related bullets are rewritten instead of duplicated before a
  release is cut.
- Keep decision records short and dated.

## When To Ask The User

Ask before acting when the choice changes scope, risk, cost, privacy, or
public visibility.

Ask before:

- publishing, tagging, or promoting a release
- deleting or overwriting audit-relevant records
- changing secrets, credentials, billing, or service configuration
- force-pushing or rewriting history
- replacing a canonical workflow with a new one

Do not ask before:

- running documented validation commands
- updating logs, plans, or TODO state required by the project
- making small, low-risk fixes that directly implement the request

## Commit And Push Flow

Do not commit or push unless the user asks, the repo rules require it, or the
task is explicitly a publish or sync task.

## Project Notes

- `npm run dev` starts the local Vite server.
- `npm run build` produces the production bundle.
- `npm test` runs the Vitest suite.
- The app includes optional Google Gemini-powered features, so `.env` files
  and API keys should stay local only.
