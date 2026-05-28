# Decision Record

## Title

- short decision name

## Status

- proposed | accepted | superseded

## Date

- YYYY-MM-DD

## Context

- why this decision needed to be made

## Decision

- the chosen approach

## Alternatives Considered

- option 1 and why it was not chosen
- option 2 and why it was not chosen

## Consequences

- what becomes simpler
- what becomes harder

## Validation

- how to verify the decision was sound

## Follow-Up

- any future trigger for revisiting this decision

## Example

### Keep Gemini features optional by default

- Status: accepted
- Date: 2026-05-28
- Context: the app supports optional AI-assisted generation, but the core
  character creator must remain usable without any external API key.
- Decision: keep Gemini-powered features disabled until a key is supplied in a
  local environment file.
- Alternatives considered:
  - require a key at startup, which would block non-AI usage
  - remove the AI features, which would reduce the app's optional functionality
- Consequences:
  - the base app stays usable without setup friction
  - AI features need clear local configuration guidance
- Validation: start the app without a Gemini key and confirm the core workflow
  still works.
- Follow-Up: revisit only if the feature set changes or the provider contract
  changes materially.
