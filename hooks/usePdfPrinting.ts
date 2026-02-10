import { useState, useCallback } from 'react';
import { useEraContext } from '../context/SourceContext';
import { useAggregatedData } from './useAggregatedData';
import { useSheetContext } from '../context/SheetContext';
import { SHEET_CONFIG } from '../eras/sheet-config';
import type { ToastType, Skill, AttributeSet, DGItem } from '../types';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { getYearFromDecade } from '../utils/date';

function getBaseSkillName(name: string): string {
  const m = name.match(/^(.*?)(?:\s*\(|$)/);
  return m ? m[1].trim() : name;
}

function inferOwnLanguageName(nationality: string | null | undefined): string {
  const s = (nationality || '').toLowerCase();
  const has = (k: string) => s.includes(k);
  if (!s) return 'English';
  if (has('british') || has('england') || has('english') || has('american') || has('scottish') || has('irish') || has('canadian') || has('australian')) return 'English';
  if (has('mexican') || has('spanish')) return 'Spanish';
  if (has('german') || has('central european')) return 'German';
  if (has('french')) return 'French';
  if (has('italian')) return 'Italian';
  if (has('russian')) return 'Russian';
  if (has('polish') || has('eastern european')) return 'Polish';
  if (has('japanese')) return 'Japanese';
  if (has('chinese')) return 'Chinese';
  if (has('dutch')) return 'Dutch';
  if (has('scandinavian')) return 'Swedish';
  if (has('israeli') || has('hebrew')) return 'Hebrew';
  if (has('native american') || has('african american') || has('asian american') || has('unspecified') || has('mixed')) return 'English';
  return 'English';
}

export const usePdfPrinting = (showToast: (msg: string, type?: ToastType) => void) => {
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const { selectedEra } = useEraContext();
  const aggregated = useAggregatedData(selectedEra);
  const { getSheetPath } = useSheetContext();
  type PrintData = { characterName: string | null; attributes: AttributeSet | null; skills: Record<string, number>; inventory: DGItem[]; portraitDataUrl?: string | null; damageBonus?: string | null; spendingLevel?: string | null; nationality?: string | null; cash?: string | null; assets?: string | null; gender?: string | null; occupationName?: string | null; dob?: string | null };
  // Map gender to PDF Pronouns field using literal Gender label (not actual pronouns)
  const pronounForGender = (g: string | null | undefined): string => {
    const s = (g || '').toLowerCase().trim();
    if (s === 'male') return 'Male';
    if (s === 'female') return 'Female';
    return '';
  };
  const calcAgeFromDob = (dob: string | null | undefined): number | null => {
    if (!dob) return null;
    try {
      const yr = new Date(dob).getFullYear();
      if (!isFinite(yr)) return null;
      const cur = (() => {
        try { const dec = (aggregated as any)?.DECADES?.[0]?.name; if (dec) return getYearFromDecade(dec); } catch {}
        return new Date().getFullYear();
      })();
      const age = cur - yr;
      return age >= 0 && age < 200 ? age : null;
    } catch { return null; }
  };

  const fillSkills = (form: any, allSkills: Skill[], values: Record<string, number>) => {
    const skillFields = form.getFields().filter((f: any) => String(f.getName()).startsWith('Skill_'));
    const byName = new Map<string, number>();
    // Map by exact name
    for (const [name, val] of Object.entries(values)) byName.set(name.toLowerCase(), val);
    // Also map by stub (base) if present
    const byStub = new Map<string, number>();
    allSkills.forEach(s => {
      const base = getBaseSkillName(s.name).toLowerCase();
      const v = values[s.name];
      if (typeof v === 'number') byStub.set(base, Math.max(v, byStub.get(base) ?? 0));
    });

    // Helper to fill specialization name/value pairs
    const fillSpecs = (specs: { name: string; value: number }[], nameFields: string[], valueFields: string[]) => {
      const sorted = specs.filter(s => typeof s.value === 'number').sort((a, b) => b.value - a.value);
      for (let i = 0; i < Math.max(nameFields.length, valueFields.length); i++) {
        const spec = sorted[i];
        const nameId = nameFields[i];
        const valId = valueFields[i];
        if (nameId) { try { const nf = form.getTextField(nameId); nf?.setText(spec ? spec.name : ''); } catch {} }
        if (valId) { try { const vf = form.getTextField(valId); vf?.setText(spec ? String(spec.value) : ''); } catch {} }
      }
    };
    // Art and Craft (2 slots)
    const artCraftSpecs = Object.keys(values)
      .filter(n => /^\s*(Art\s*and\s*Craft|Art|Craft)\s*\(/i.test(n))
      .map(n => ({ name: n.replace(/^\s*(Art\s*and\s*Craft|Art|Craft)\s*\(/i, '').replace(/\)\s*$/, ''), value: values[n] as number }));
    fillSpecs(artCraftSpecs, ['SkillDef_ArtCraft1', 'SkillDef_ArtCraft2'], ['Skill_ArtCraft1', 'Skill_ArtCraft2']);
    // Language (Other) specializations (up to 3 slots)
    const langSpecs = Object.keys(values)
      .map(n => ({ raw: n, m: n.match(/^\s*Language\s*\(([^)]+)\)/i) }))
      .filter(x => x.m && !/^own$/i.test(x.m![1]) && !/^other$/i.test(x.m![1]))
      .map(x => ({ name: x!.m![1], value: values[x.raw] as number }));
    fillSpecs(langSpecs, ['SkillDef_OtherLanguage', 'SkillDef_OtherLanguage1', 'SkillDef_OtherLanguage2'], ['Skill_OtherLanguage', 'Skill_OtherLanguage1', 'Skill_OtherLanguage2']);
    // Language (Own) numeric value -> Skill_OwnLanguage
    const ownLangVal = values['Language (Own)'];
    if (typeof ownLangVal === 'number') {
      try { const tf = form.getTextField('Skill_OwnLanguage'); tf?.setText(String(ownLangVal)); } catch {}
    }
    // Science (up to 3)
    const sciSpecs = Object.keys(values)
      .map(n => ({ raw: n, m: n.match(/^\s*Science\s*\(([^)]+)\)/i) }))
      .filter(x => x.m)
      .map(x => ({ name: x!.m![1], value: values[x.raw] as number }));
    fillSpecs(sciSpecs, ['SkillDef_Science1', 'SkillDef_Science2', 'SkillDef_Science3'], ['Skill_Science1', 'Skill_Science2', 'Skill_Science3']);
    // Fighting (exclude Brawl) - up to 2
    const fightSpecs = Object.keys(values)
      .map(n => ({ raw: n, m: n.match(/^\s*Fighting\s*\(([^)]+)\)/i) }))
      .filter(x => x.m && !/^brawl$/i.test(x.m![1]))
      .map(x => ({ name: x!.m![1], value: values[x.raw] as number }));
    fillSpecs(fightSpecs, ['SkillDef_Fighting1', 'SkillDef_Fighting2'], ['Skill_Fighting1', 'Skill_Fighting2']);
    // Pilot (1)
    const pilSpecs = Object.keys(values)
      .map(n => ({ raw: n, m: n.match(/^\s*Pilot\s*\(([^)]+)\)/i) }))
      .filter(x => x.m)
      .map(x => ({ name: x!.m![1], value: values[x.raw] as number }));
    fillSpecs(pilSpecs, ['SkillDef_Pilot'], ['Skill_Pilot']);
    // Survival (1)
    const survSpecs = Object.keys(values)
      .map(n => ({ raw: n, m: n.match(/^\s*Survival\s*\(([^)]+)\)/i) }))
      .filter(x => x.m)
      .map(x => ({ name: x!.m![1], value: values[x.raw] as number }));
    fillSpecs(survSpecs, ['SkillDef_Survival'], ['Skill_Survival']);

    for (const f of skillFields) {
      const name: string = String(f.getName());
      // Skip specialization slots handled above
      if (/^Skill_ArtCraft[12]$/.test(name)) continue;
      if (/^Skill_(OwnLanguage|OtherLanguage|OtherLanguage1|OtherLanguage2|Science[123]|Pilot|Survival|Fighting[12])$/.test(name)) continue;
      if (/_half$|_fifth$|_Chk$/.test(name)) continue; // ignore modifiers/checks for now
      const key = name.replace(/^Skill_/, '');
      const exact = byName.get(key.toLowerCase());
      const base = byStub.get(key.toLowerCase());
      const val = exact ?? base;
      if (typeof val === 'number') {
        try { f.setText(String(val)); } catch {}
      }
    }
  };

  const printSheet = useCallback(async (data: PrintData) => {
    try {
      setIsPrinting(true);
      const sheetUrl = getSheetPath(selectedEra, false, SHEET_CONFIG);
      const res = await fetch(sheetUrl);
      if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);
      const bytes = await res.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);
      const form = pdfDoc.getForm();

      // Identity
      const nameFieldId = aggregated.PDF_FIELD_MAP?.characterName || 'Investigators_Name';
      try { const nf = form.getTextField(nameFieldId); nf?.setText(data.characterName || ''); } catch {}
      // Pronouns field: use Gender label (Male/Female/empty), not literal pronouns
      try {
        const pid = aggregated.PDF_FIELD_MAP?.pronouns || 'Pronouns';
        const pf = form.getTextField(pid);
        const pron = pronounForGender(data.gender || null);
        pf?.setText(pron);
      } catch {}
      // Occupation
      try {
        const oid = aggregated.PDF_FIELD_MAP?.occupation || 'Occupation';
        const of = form.getTextField(oid);
        if (data.occupationName) of?.setText(String(data.occupationName));
      } catch {}

      // Attributes
      const attrs = data.attributes;
      if (attrs) {
        const map: Record<string, number> = {
          STR: attrs.STR, DEX: attrs.DEX, INT: attrs.INT, CON: attrs.CON,
          APP: attrs.APP, POW: attrs.POW, SIZ: attrs.SIZ, EDU: attrs.EDU,
        };
        Object.entries(map).forEach(([k, v]) => {
          const id = aggregated.PDF_FIELD_MAP?.[k] || k;
          try { const tf = form.getTextField(id); tf?.setText(String(v)); } catch {}
        });
        // Starting Sanity = POW
        const sanId = aggregated.PDF_FIELD_MAP?.currentSanity || 'CurrentSanity';
        try { const sf = form.getTextField(sanId); sf?.setText(String(attrs.POW)); } catch {}
      }
      // Age from DOB
      const ageVal = calcAgeFromDob(data.dob || null);
      if (ageVal != null) {
        try { const af = form.getTextField(aggregated.PDF_FIELD_MAP?.age || 'Age'); af?.setText(String(ageVal)); } catch {}
      }

      // Spending Level (fill from character wealth summary if provided)
      if (data.spendingLevel) {
        try { const f = form.getTextField('SpendingLevel'); f?.setText(data.spendingLevel); } catch {}
      }
      // Cash / Assets
      if (data.cash) {
        try { const f = form.getTextField('Cash'); f?.setText(data.cash); } catch {}
      }
      if (data.assets) {
        try { const f = form.getTextField('Assets1'); f?.setText(data.assets); } catch {}
      }

      // Skills
      fillSkills(form, aggregated.SKILLS, data.skills);
      // Language (Own) name based on nationality -> SkillDef_OwnLanguage
      try {
        const tf = form.getTextField('SkillDef_OwnLanguage');
        const langName = inferOwnLanguageName(data.nationality);
        tf?.setText(langName);
      } catch {}

      // Explicit CoC firearms fields: the sheet exposes 3 fields: Handguns, Rifles/Shotguns, and one generic Firearms specialization
      try {
        const setNum = (id: string, val: number | undefined | null) => {
          if (typeof val !== 'number') return;
          try { form.getTextField(id).setText(String(val)); } catch {}
        };
        const handgun = ((): number | undefined => {
          const v = data.skills['Handgun'];
          if (typeof v === 'number') return v;
          const legacy = data.skills['Firearms (Handgun)'];
          return typeof legacy === 'number' ? legacy : undefined;
        })();
        const rifle = ((): number | undefined => {
          const v = data.skills['Rifle/Shotgun'];
          if (typeof v === 'number') return v;
          const legacy = data.skills['Firearms (Rifle/Shotgun)'];
          return typeof legacy === 'number' ? legacy : undefined;
        })();
        setNum('Skill_FireArmsHandguns', handgun);
        setNum('Skill_FireArmsRifles', rifle);
        // Choose best remaining firearms specialization (not handgun or rifle/shotgun)
        const entries = Object.entries(data.skills || {}) as [string, number][];
        const candidates = entries
          .filter(([k, v]) => typeof v === 'number')
          .filter(([k]) => {
            const s = k.toLowerCase();
            const isFirearmsSpec = s.includes('firearm') || s.includes('machine gun') || s.includes('submachine') || s.includes('heavy weapon') || s.includes('explosive');
            const isHandgun = s.includes('handgun');
            const isRifleShotgun = s.includes('rifle') || s.includes('shotgun');
            return isFirearmsSpec && !isHandgun && !isRifleShotgun;
          });
        let otherName: string | null = null;
        let otherVal: number | null = null;
        for (const [k, v] of candidates) {
          if (otherVal === null || v > otherVal) { otherVal = v; otherName = k; }
        }
        if (otherName && typeof otherVal === 'number') {
          // Derive a clean label: prefer inside of parentheses if present
          const m = otherName.match(/^[^()]*\(([^)]+)\)/);
          const label = m ? m[1] : otherName;
          try { form.getTextField('SkillDef_Firearms').setText(label); } catch {}
          setNum('Skill_Firearms', otherVal);
        } else {
          // Backwards-compatibility with older labels
          const smg = data.skills['Submachine/Machine Guns'];
          const heavy = data.skills['Heavy Weapons/Explosives'];
          const useSmg = (typeof smg === 'number' ? smg : -1) >= (typeof heavy === 'number' ? heavy : -1);
          const label = useSmg ? (typeof smg === 'number' ? 'Submachine/Machine Guns' : null)
                               : (typeof heavy === 'number' ? 'Heavy Weapons/Explosives' : null);
          const val = useSmg ? (typeof smg === 'number' ? smg : null)
                             : (typeof heavy === 'number' ? heavy : null);
          if (label && typeof val === 'number') {
            try { form.getTextField('SkillDef_Firearms').setText(label); } catch {}
            setNum('Skill_Firearms', val);
          }
        }
      } catch {}

      // Select and fill best weapons (ranged first, then melee), up to 3
      const parseDB = (dbRaw: string | null | undefined) => {
        if (!dbRaw) return { flat: 0, dice: [] as number[] };
        const s = dbRaw.trim();
        if (/^none$/i.test(s)) return { flat: 0, dice: [] };
        const out = { flat: 0, dice: [] as number[] };
        const dice = s.match(/([+-]?\d+)D(\d+)/i);
        if (dice) {
          const sign = dice[1].startsWith('-') ? -1 : 1;
          const cnt = Math.abs(parseInt(dice[1], 10));
          const sides = parseInt(dice[2], 10);
          for (let i = 0; i < cnt; i++) out.dice.push(sign * sides);
        } else {
          const flat = parseInt(s, 10);
          if (!isNaN(flat)) out.flat = flat;
        }
        return out;
      };
      const db = parseDB(data.damageBonus || null);
      const maxOfDamage = (expr: string | undefined): number => {
        if (!expr) return 0;
        let total = 0;
        const parts = expr.toUpperCase().split('+').map(p => p.trim());
        for (const p of parts) {
          if (/^DB$/i.test(p)) {
            // add DB at max
            total += db.dice.reduce((s, d) => s + Math.max(d, 0), 0) + db.flat;
            continue;
          }
          const m = p.match(/^(\d+)D(\d+)$/);
          if (m) { total += parseInt(m[1], 10) * parseInt(m[2], 10); continue; }
          const n = parseInt(p, 10);
          if (!isNaN(n)) total += n;
        }
        return total;
      };
      const isRanged = (skillName: string | undefined): boolean => {
        if (!skillName) return false;
        const s = skillName.toLowerCase();
        return s.includes('firearms') || s.includes('handgun') || s.includes('rifle') || s.includes('shotgun') || s.includes('bow') || s.includes('throw');
      };
      // Weapons come from the agent's inventory (kit + personal), not from the era catalogue
      const weaponItems = (data.inventory || []).filter(it => it && (it.damage || it.skill));
      const scored = weaponItems.map(it => ({ it, ranged: isRanged(it.skill), score: maxOfDamage((it.damage || '').replace(/\bDB\b/i, 'DB')) }));
      const ranged = scored.filter(s => s.ranged).sort((a, b) => b.score - a.score);
      const melee = scored.filter(s => !s.ranged).sort((a, b) => b.score - a.score);
      const pick = [...ranged, ...melee].slice(0, 3).map(s => s.it);
      const skillValFor = (skillLabel: string | undefined): number | null => {
        if (!skillLabel) return null;
        const exact = data.skills[skillLabel];
        if (typeof exact === 'number') return exact;
        const base = skillLabel.replace(/\s*\(.+\)\s*$/, '').trim();
        const byBase = data.skills[base];
        return typeof byBase === 'number' ? byBase : null;
      };
      pick.forEach((w, i) => {
        const idx = i + 1; // 1..3
        const setText = (id: string, val: string | undefined) => { const f = form.getTextField?.(id); if (f && val) f.setText(String(val)); };
        setText(`Weapon_Name${idx}`, w.name);
        setText(`Weapon_Damage${idx}`, w.damage || '-');
        setText(`Weapon_Attacks${idx}`, w.uses || '-');
        setText(`Weapon_Ammo${idx}`, w.ammoCapacity || '-');
        setText(`Weapon_Range${idx}`, w.range || '-');
        setText(`Weapon_Malf${idx}`, (w as any).armorPiercing || '-');
        // Regular from skill
        const reg = skillValFor(w.skill) || 0;
        const rf = form.getTextField?.(`Weapon_Regular${idx}`);
        if (rf) rf.setText(String(reg));
      });

      // Weapon thresholds: Hard = 1/2 Regular, Extreme = 1/5 Regular
      const parseNum = (s: string | undefined | null) => {
        if (!s) return NaN;
        const m = String(s).match(/\d+/);
        return m ? parseInt(m[0], 10) : NaN;
      };
      for (let i = 0; i < 10; i++) {
        const regId = `Weapon_Regular${i}`;
        const hardId = `Weapon_Hard${i}`;
        const extId = `Weapon_Extreme${i}`;
        let regVal = NaN as number;
        try {
          const rf = form.getTextField(regId);
          const txt = rf.getText ? rf.getText() : '';
          regVal = parseNum(txt);
        } catch {
          regVal = NaN;
        }
        if (!isNaN(regVal)) {
          const hard = Math.floor(regVal / 2);
          const ext = Math.floor(regVal / 5);
          try { form.getTextField(hardId).setText(String(hard)); } catch {}
          try { form.getTextField(extId).setText(String(ext)); } catch {}
        }
      }

      // Fill Gear/Possessions fields from agent inventory, excluding weapons already listed
      try {
        const pickedNames = new Set(pick.map(w => w.name));
        const isWeapon = (it: DGItem) => Boolean(it.damage) || /firearm|weapon|rifle|shotgun|pistol|handgun|bow|knife|sword/i.test(`${it.section || ''} ${it.name || ''}`);
        const gear = (data.inventory || [])
          .filter(it => it && (!isWeapon(it) || !pickedNames.has(it.name)))
          .map(it => it.name)
          .filter(Boolean);
        const id1 = 'Gear/Possessions';
        const id2 = 'Gear/Possessions1';
        // Line-aware packing to align to ruled rows: 5 lines × ~18 chars per line
        const LINES_PER_COL = 5;
        const PER_LINE = 18;
        const packLines = (tokens: string[]) => {
          const out: string[] = [];
          let line = '';
          for (const t of tokens) {
            const candidate = line ? `${line}, ${t}` : t;
            if (candidate.length <= PER_LINE) {
              line = candidate;
            } else {
              // push current line (trim any trailing comma/space just in case)
              out.push(line.replace(/,\s*$/,'').trim());
              line = t;
              if (out.length >= LINES_PER_COL) break;
            }
            if (out.length >= LINES_PER_COL) break;
          }
          if (out.length < LINES_PER_COL && line) out.push(line.replace(/,\s*$/,'').trim());
          // pad with empty lines to exactly 5 for baseline alignment
          while (out.length < LINES_PER_COL) out.push('');
          return out;
        };
        // Left column first
        const leftLines: string[] = [];
        const rightLines: string[] = [];
        let current: string[] = [];
        for (const t of gear) {
          current.push(t);
          const packed = packLines(current);
          if (packed[LINES_PER_COL-1] !== '') {
            // overflowed onto padding; move last token to next column
            current.pop();
            break;
          }
        }
        leftLines.push(...packLines(current));
        const remaining = gear.slice(current.length);
        rightLines.push(...packLines(remaining));
        // Write into editable form fields (not fixed-drawn text)
        let tf1: any = null;
        let tf2: any = null;
        try { tf1 = form.getTextField(id1); tf1?.setText(leftLines.join('\n')); } catch {}
        try { tf2 = form.getTextField(id2); tf2?.setText(rightLines.join('\n')); } catch {}
        // Set DA to force ~15.5pt line spacing (pdf-lib uses 1.2 * fontSize)
        // 15.5 / 1.2 ≈ 12.9167
        try {
          const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
          const da = (size: number) => `0 g\n/${helv.name} ${size.toFixed(2)} Tf`;
          const size = 15.5 / 1.2; // ~12.92
          try { tf1?.acroField?.setDefaultAppearance?.(da(size)); tf1?.updateAppearances?.(helv); } catch {}
          try { tf2?.acroField?.setDefaultAppearance?.(da(size)); tf2?.updateAppearances?.(helv); } catch {}
        } catch {}
      } catch {}

      // Portrait embedding (prefer headshot)
      const portraitFieldId = aggregated.PDF_FIELD_MAP?.portrait || 'Portrait';
      const portraitButton = form.getButton?.(portraitFieldId);
      const durl = data.portraitDataUrl || null;
      if (portraitButton && durl) {
        try {
          const ab = await (await fetch(durl)).arrayBuffer();
          let img;
          if (/^data:image\/png/i.test(durl)) img = await pdfDoc.embedPng(ab);
          else img = await pdfDoc.embedJpg(ab);
          portraitButton.setImage(img);
        } catch (e) {
          console.warn('Could not embed portrait image', e);
        }
      }

      // Save and trigger download
      const out = await pdfDoc.save();
      const blob = new Blob([out], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'coc_investigator.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('PDF generated. Check your downloads.', 'success');
    } catch (e) {
      console.error(e);
      showToast('Failed to generate PDF. See console.', 'error');
    } finally {
      setIsPrinting(false);
    }
  }, [selectedEra, aggregated, getSheetPath, showToast]);

  return { isPrinting, printSheet };
};
