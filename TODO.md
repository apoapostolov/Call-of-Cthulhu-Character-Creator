# TODO - Call of Cthulhu Character Creator

This template is optimized for a strong planner plus cheaper executor workflow.
The planning pass should leave prompts documented well enough that a capable,
lower-cost execution model can pick up any prompt without hidden context.
Each TODO file should usually represent one active epic. In this template,
`Current Focus` is the epic.

## Current Focus

- next epic name and one-sentence mission
- explicit canonical file or system owner

## Scope And Boundaries

- what this pass owns
- what this pass explicitly does not own

## Active Prompt Queue

Start active entries at `Prompt 1`. Add `Prompt 1A`, `Prompt 1B`, etc. only
when a single deliverable needs to be split without hiding partial completion.

## Working Rules

- Execution-ready rule: every active prompt must be documented so a capable,
  lower-cost executor can perform the work without relying on hidden planner
  context.
- Prompt completeness rule: prompts should state canonical inputs, expected
  outputs, validation, and constraints. Avoid vague prompts like "improve X"
  or "clean this up" without acceptance criteria.
- One-epic-per-file rule: treat `Current Focus` as the active epic for this
  file. If you need to work multiple unrelated epics in parallel, split them
  into separate TODO files instead of multiplexing one file.
- Prompt granularity rule: add a new top-level prompt when the work introduces
  a materially different deliverable, validation path, ownership boundary, or
  context bundle. Add a sub-prompt when splitting one deliverable into
  sequential or parallel chunks without hiding partial completion.
- Prompt growth rule: if execution reveals missing but necessary work, extend
  the queue in place by adding prompts or sub-prompts rather than keeping the
  dependency chain implicit in prose.
- Constant pushing rule: if session context and thinking budget still allow
  useful progress after completing a prompt, continue immediately to the next
  clear prompt. Do not stop between prompts unless the next step has a real
  blocker, requires user input, or would force a major context rebuild.
- Prompt autonomy rule: AI is allowed to expand a prompt with additional
  subtasks, create follow-up prompts or sub-prompts, split or combine prompts,
  and modify prompt boundaries when discoveries suggest a better implementation
  path. If a better approach changes scope or sequencing in a meaningful way,
  present the proposal to the user before committing to the new direction.
- Subagent trigger rule: propose subagents when a prompt has lengthy steps,
  independent branches, repeated verification, or any work that can be
  parallelized without shared-write conflicts.
- Subagent sizing rule: use one coordinator plus 1-3 worker subagents by
  default. Use 4 total agents as the practical upper bound in one TODO file
  unless the user explicitly wants a larger delegation setup or the work is
  split into separate TODO files.
- Subagent split rule: assign read-only discovery, verification, and cross-check
  work to separate agents when possible. Reserve writing agents for disjoint
  file sets or clearly separated responsibilities.
- Subagent role rule: prefer splitting work into exploration, implementation,
  and validation when the task is large enough to benefit from parallelism.
  Use a dedicated reviewer or integration checker when the work touches shared
  interfaces, generated outputs, or end-to-end behavior.
- Subagent escalation rule: if the work needs more than 4 coordinated agents,
  or the agents need to discuss and react to each other, split the epic into
  multiple TODO files or use a broader coordination pattern instead of stacking
  more workers in one queue.
- Delegation rule: planning should aim to produce prompts that can be handed to
  a cheaper but capable execution model with minimal loss of quality. State the
  files, commands, checks, and stop conditions explicitly enough for delegated
  execution.
- Canonical source rule: state the authoritative files or systems for the
  current undertaking and prefer updating those in place.
- Derived artifact rule: generated outputs should be regenerated, not
  hand-edited, unless the user explicitly asks otherwise.
- Safety rule: include rollback notes, irreversible-step warnings, and archive
  guidance whenever a prompt changes or removes important material.
- Cleanup rule: when asked to clean this file, remove completed prompt dumps
  from the active TODO instead of preserving them. If archiving is useful,
  write the removed prompt dump to `TODO_ARCHIVE.md` or a project-specific
  archive after it has been erased from the active TODO.
- Removal rule: if the user says to remove prompts, tasks, or completed items
  from this file, delete them outright. Do not archive them elsewhere unless
  the user explicitly asks for an archive.
- Protected template rule: keep the example prompt template, rule scaffold, and
  template minimums in this file unless the user explicitly says to remove the
  template itself.
- Markdown rule: run `npx -y markdownlint-cli2 --fix <file>` after editing any
  markdown. See [`MARKDOWN_LINT.md`](MARKDOWN_LINT.md) for the standard config,
  which annoying rules we usually disable, and enforcement options.

## Decision Log

- YYYY-MM-DD: important scope or design decision

## Risks And Blockers

- open risk
- explicit blocker if present

## Template

Use this structure when a new major undertaking becomes the active queue in
this file:

```md
# TODO - <Project Name>

## Current Focus

- epic name and one-sentence mission
- explicit canonical file or system owner

## Scope And Boundaries

- what this pass owns
- what this pass explicitly does not own

## Active Prompt Queue

### [ ] Prompt 1 — <goal>

Short prompt description.

Context:

- canonical files, systems, and assumptions this prompt depends on

Inputs:

- exact files, commands, or upstream prompts to inspect before acting

Outputs:

- expected file or system result

Validation:

- tests, lint, preview commands, or manual checks

Delegation notes:

- constraints, non-goals, and implementation guidance needed for a cheaper
  executor to finish safely

### [ ] Prompt 1A — <sub-goal>

Use sub-prompts when a prompt needs to be split without hiding partial
completion.

Dependencies:

- parent prompt or upstream prerequisite if applicable

Completed output:

- concrete finished deliverable

## Decision Log

- YYYY-MM-DD: important scope or design decision

## Risks And Blockers

- open risk
- explicit blocker if present
```
