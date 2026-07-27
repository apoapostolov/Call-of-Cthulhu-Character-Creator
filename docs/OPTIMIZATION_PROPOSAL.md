# Optimization Proposal — Call of Cthulhu Character Creator

**Date:** 2026-07-27  
**Target:** `Call-of-Cthulhu-Character-Creator` v1.0.3  
**Status:** **COMPLETE** (Waves A–C + finish pass 2026-07-27)

---

## Outcome summary

| Metric | Before | After |
|--------|--------|-------|
| Main JS chunk | ~2.18 MB | **~430–440 KB** (gzip ~130 KB) |
| Test suite pollution | 14 files / 148 tests (`.kilo` dupes) | **7–8 files / ~84 tests** |
| Era data load | All eras eager | **Per-era dynamic import** |
| AI model catalogs | Static in main graph | **Fallback + background hydrate** |
| pdf-lib / @google/genai | First paint | **On print / on generate** |
| Character context | One fat provider | **Identity / skills / gear / extras slices** |
| Skill rows | Re-render all | **`React.memo` + stable point callback** |

Live dev: **http://localhost:10001/** with WSL polling HMR.

---

## What shipped

### Wave A — Hygiene
- Exclude `.kilo/**` from Vitest/tsconfig; gitignore
- Memoize `useCharacter` return object
- Canonical western id `western-1880s` + localStorage migrate
- Remove dead DG UI stubs
- `npm run typecheck`; SECURITY notes on baked keys

### Wave B — Bundle
- `React.lazy` tabs/modals
- Dynamic `pdf-lib` on print
- Vite `manualChunks`
- `eras/load-era.ts` per-era loaders; thin `manifest.ts`
- Async weapons loader
- AI catalogs deferred; dynamic provider clients

### Wave C — Runtime re-renders
- Sliced `CharacterProvider` + narrow hooks
- Migrated skills/gear/bio/badges consumers
- `SkillRow` memo + stable `handleSkillPointChange(skillName, amount)`
- Non-mutating skill list sort; shared `EMPTY_ASSIGNMENT`

### Finish pass — Domain purity
- `domain/rolls.ts`
- `domain/scout-badges.ts`
- `domain/skill-distribution-profile.ts`
- Unit tests: `tests/domain-rolls.test.ts`

---

## Explicitly out of scope (not blockers)

- Full rewrite of remaining `useCharacter` orchestration (~1.8k LOC still React state)
- Zustand / Redux
- Regency reputation product epic (`TODO.md` Prompts 3–4)
- Shipping OCR book dumps; legal content issues
- ESLint package + full `strict` mode (incremental later if desired)

---

## Later wave — shared AI providers (post-optimization) — **DONE 2026-07-27**

Originally outside the closed A–C bar; shipped as the next multi-repo wave:

| Provider | Intent | CoC | DG | OSE |
|----------|--------|-----|-----|-----|
| **Zhipu / Z.ai GLM Coding Plan** | Coding endpoint + plan API key | ✅ | ✅ | ✅ |
| **Grok / xAI API key** | `api.x.ai/v1` bearer | ✅ | ✅ | ✅ |
| **Grok / xAI OAuth** | Device code + `/__xai_oauth` proxy | ✅ | ✅ | ✅ |
| **Multi-slot AI UI** | creative / simple / vision / image | ✅ | ✅ | ✅ |

**Canonical implementation proposal:**

→ **`docs/SHARED_AI_PROVIDERS_ZHIPU_GROK.md`**

### CoC residual (not part of optimization “done”)

| Track | Status |
|-------|--------|
| Waves A–C + finish pass | **100% done** |
| Shared AI later wave (CoC side) | **100% done** |
| Regency reputation/export | Product backlog (`TODO.md` 3–4) — **not optimization** |
| Optional: full TS strict / ESLint / useCharacter rewrite | Explicitly out of scope |

**Optimization program on CoC is 100% complete.** Remaining CoC items are product (Regency), not the proposal.

---

## How to verify

```bash
npm test
npm run typecheck
npm run build
# Dev (HMR + polling):
npm run dev -- --port 10001 --host 0.0.0.0 --strictPort
```

Expect multi-chunk `dist/assets/` (index ~430KB, separate era/AI/pdf chunks).

---

## Key files

| Path | Role |
|------|------|
| `docs/OPTIMIZATION_PROPOSAL.md` | This document |
| `eras/load-era.ts` | Lazy era data |
| `eras/manifest.ts` | Metadata + `loadEraData` |
| `context/CharacterContext.tsx` | Sliced contexts |
| `domain/*.ts` | Pure rules helpers |
| `hooks/useAggregatedData.ts` | Async era aggregation |
| `hooks/useAiRuntime.ts` | Lazy AI clients |
| `vite.config.ts` | Polling HMR + chunks |

**Optimization program: done.** Further work is product features (Regency) or optional polish only.
