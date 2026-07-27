# TODO - Call of Cthulhu Character Creator

This template is optimized for a strong planner plus cheaper executor workflow.
The planning pass should leave prompts documented well enough that a capable,
lower-cost execution model can pick up any prompt without hidden context.
Each TODO file should usually represent one active epic. In this template,
`Current Focus` is the epic.

## Current Focus

- **Optimization program COMPLETE** (`docs/OPTIMIZATION_PROPOSAL.md`)
- **Shared AI wave COMPLETE** (multi-slot + Zhipu + xAI OAuth in CoC + Delta Green;
  `docs/SHARED_AI_PROVIDERS_ZHIPU_GROK.md`)
- Product track: Regency Cthulhu reputation/export (Prompts 3–4 below)
- canonical Regency files: `docs/regency-cthulhu/`, `eras/regency/`,
  `hooks/usePdfPrinting.ts`

## Scope And Boundaries

- what this pass owns
- what this pass explicitly does not own

## Active Prompt Queue

### [x] Prompt 1 — Era scaffold and manifest order

Create the Regency era folder and register it in the era manifest ahead of
Campfire Tales.

Context:

- `docs/regency-cthulhu/02-chapter-1-creating-a-regency-investigator.md`
  defines the core Regency character-creation rules
- existing era structure lives under `eras/classic-1920s/`,
  `eras/gaslight-1890s/`, and `eras/campfire-tales/`
- the Regency era should inherit Classic 1920s where the book does not
  override behavior

Inputs:

- manifest and era data files in `eras/`
- Regency chapter 1 rules and the existing shared era patterns

Outputs:

- new `regency` era entry in the picker
- new `eras/regency/` data scaffold with theme, decades, occupations, skills,
  prices, equipment, and PDF mapping placeholders

Validation:

- `npm test`
- `npm run build`
- manual check that the era list shows Regency before Campfire Tales

Delegation notes:

- keep the first pass focused on structure, inheritance, and ordering; deeper
  Regency rule details can land in later prompts
- Regency is now the active implementation target; continue into the next
  prompt only after the era is selectable and the scaffold files exist

### [x] Prompt 2 — Occupations, skills, and social class rules

Implement Regency occupations, occupational bands, skills, and social-class
credit handling.

Context:

- Regency uses landed-gentry assumptions by default but still allows servants,
  professionals, and lower-class characters
- occupation bands and skill availability are defined in the chapter 1 text
- `Ride` is flat in Regency, `Drive Carriage/Cart` is its own skill, and
  `Natural Philosophy` replaces Science for the era

Inputs:

- Regency occupation and skill sections from chapter 1
- current occupation/skill UI and era inheritance patterns

Outputs:

- Regency occupation data with band-aware credit ranges and hobby-style cases
- Regency skill data with the new/adjusted skill list and specialization rules

Validation:

- `npm test`
- targeted smoke test for selecting a Regency occupation and seeing the
  expected skills and credit caps

Delegation notes:

- keep the occupational-band rules authoritative and do not invent new social
  bands beyond the book’s Regency structure

### [ ] Prompt 3 — Reputation, equipment, and export support

Add Regency reputation, equipment tables, and export behavior.

Context:

- Regency adds optional Reputation plus special living-standard and estate
  assumptions
- Appendix B contains the equipment, weapons, firearms, and carriage/chase
  material for the era
- the app should remain usable even if a dedicated Regency PDF is not yet
  present

Inputs:

- Regency reputation sections from chapter 1
- Appendix B equipment tables
- current wealth, equipment, and export code

Outputs:

- Regency reputation state in the character sheet
- Regency equipment, prices, weapons, and carriage/chase data wired into the
  gear flow
- export mapping support that falls back cleanly if a dedicated sheet asset is
  not yet available

Subtasks:

- [x] Regency period price list, old-money parsing, and currency display
- [x] Regency equipment kits with male/female high-society variants and
  class-specific archetypes
- [ ] Regency reputation state and export mapping

Validation:

- `npm test`
- `npm run build`
- manual save/load and export smoke test on a Regency character

Delegation notes:

- use the chapter appendix as the canonical equipment source when building the
  era’s item list and kits
- preserve current era behavior for non-Regency characters

### [ ] Prompt 4 — Regency polish and documentation

Finish the era with tests, UI polish, and docs.

Context:

- the Regency era will be the latest addition before Campfire Tales in the era
  picker
- the implementation should be discoverable through TODO, plan, log, and
  changelog updates

Inputs:

- current Regency implementation files
- existing docs and release notes

Outputs:

- regression tests covering Regency-specific rules
- updated development log and changelog notes
- any small UI text or tab adjustments needed for the era

Validation:

- `npm test`
- `npm run build`
- markdown lint for edited docs

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

- Regency equipment and reputation details are still pending implementation
- no dedicated Regency PDF asset is present in the repository yet

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
