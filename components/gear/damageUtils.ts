/**
 * Utility functions for processing weapon damage formulas with Damage Bonus (DB)
 */

export function parseDB(dbRaw: string | null | undefined): { flat: number; dice: Record<number, number> } {
    const res = { flat: 0, dice: {} as Record<number, number> };
    if (!dbRaw || dbRaw.toLowerCase() === 'none') return res;
    const s = dbRaw.toUpperCase().trim();
    // Examples: '+1D4', '+2D6', '-1', '-2'
    const mDice = s.match(/([+-]?)(\d+)D(\d+)/);
    if (mDice) {
        const sign = mDice[1] === '-' ? -1 : 1;
        const cnt = parseInt(mDice[2], 10) * sign;
        const sides = parseInt(mDice[3], 10);
        res.dice[sides] = (res.dice[sides] || 0) + cnt;
        return res;
    }
    const mFlat = s.match(/([+-]?)(\d+)/);
    if (mFlat) {
        const sign = mFlat[1] === '-' ? -1 : 1;
        const val = parseInt(mFlat[2], 10) * sign;
        res.flat += val;
    }
    return res;
}

/**
 * Adjusts weapon damage formulas by replacing DB and ½DB tokens with actual values
 * based on the character's damage bonus.
 * 
 * @param damage - The weapon damage formula (e.g., "1D6+½DB", "1D4+DB")
 * @param dbRaw - The character's damage bonus (e.g., "+1D4", "None", "-1")
 * @returns The computed damage formula with DB values substituted
 */
export function adjustDamageForDB(damage: string | undefined, dbRaw: string | null | undefined): string {
    // If no damage formula, return dash
    if (!damage) return '-';
    
    // If no damage bonus provided, return the original formula unchanged
    if (!dbRaw || dbRaw.trim() === '') return damage;
    
    const db = parseDB(dbRaw);
    const isZeroDB = db.flat === 0 && Object.keys(db.dice).length === 0;
    const isNegativeDB = db.flat < 0; // negative DBs are flat values
    const dbClean = dbRaw.replace(/^\+/, '').toUpperCase();

    // Pre-process 'half DB' or '½DB'
    let damageWork = damage;
    const halfDBRegex = /(half\s*DB|½DB)/gi;
    if (halfDBRegex.test(damageWork)) {
        if (isZeroDB || /none/i.test(dbRaw)) {
            // Remove 'half DB' / '½DB' entirely
            damageWork = damageWork.replace(/\+?\s*(half\s*DB|½DB)/gi, '');
        } else if (isNegativeDB) {
            // Negative DB is not halved; treat as full DB (so it will be injected via 'DB' handling below)
            damageWork = damageWork.replace(/(half\s*DB|½DB)/gi, 'DB');
        } else {
            // Positive dice DB: compute the actual half-die value
            const entries = Object.entries(db.dice);
            if (entries.length > 0) {
                const [sidesStr, cnt] = entries[0];
                const sides = parseInt(sidesStr, 10);
                const count = Math.abs(cnt); // DB should be positive here
                
                // Calculate half DB: halve the die size, round up for odd values
                // 1d4 → 1d2, 1d3 → 1, 1d6 → 1d3, 1d8 → 1d4, etc.
                let halfStr = '';
                if (sides === 2) {
                    // 1d2 becomes 1 (flat)
                    halfStr = String(count);
                } else if (sides === 3) {
                    // 1d3 becomes 1 (flat, rounded up from 1.5)
                    halfStr = String(count);
                } else if (sides === 4) {
                    // 1d4 becomes 1d2
                    halfStr = `${count}D2`;
                } else if (sides === 6) {
                    // 1d6 becomes 1d3
                    halfStr = `${count}D3`;
                } else if (sides === 8) {
                    // 1d8 becomes 1d4
                    halfStr = `${count}D4`;
                } else if (sides === 10) {
                    // 1d10 becomes 1d5 → not a standard die, use 1d6 or flat approximation
                    // Average of 1d10 is 5.5, half is 2.75 ≈ 3, so use 1d6 (avg 3.5) or flat +3
                    halfStr = `${count}D6`;
                } else if (sides === 12) {
                    // 1d12 becomes 1d6
                    halfStr = `${count}D6`;
                } else {
                    // Generic case: halve the die size, round up
                    const halfSides = Math.ceil(sides / 2);
                    halfStr = `${count}D${halfSides}`;
                }
                damageWork = damageWork.replace(/(half\s*DB|½DB)/gi, halfStr);
            } else {
                // Fallback textual if no dice (shouldn't happen for positive DB)
                damageWork = damageWork.replace(/(half\s*DB|½DB)/gi, `half ${dbClean}`);
            }
        }
    }

    // If no DB token present now, return processed string
    if (!/\bDB\b/i.test(damageWork)) return damageWork;

    const tokens = damageWork.split('+').map(t => t.trim()).filter(t => t.length > 0);
    const diceMap: Record<number, number> = {};
    let flat = 0;
    const tails: string[] = [];

    const addDie = (sides: number, count: number) => {
        diceMap[sides] = (diceMap[sides] || 0) + count;
        if (diceMap[sides] === 0) delete diceMap[sides];
    };

    for (const tok of tokens) {
        if (/^DB$/i.test(tok)) {
            // Inject DB dice/flat
            for (const [sidesStr, cnt] of Object.entries(db.dice)) addDie(parseInt(sidesStr, 10), cnt);
            flat += db.flat;
            continue;
        }
        const mDice = tok.toUpperCase().match(/^(\d+)D(\d+)$/);
        if (mDice) {
            addDie(parseInt(mDice[2], 10), parseInt(mDice[1], 10));
            continue;
        }
        const mFlat = tok.match(/^([+-]?\d+)$/);
        if (mFlat) {
            flat += parseInt(mFlat[1], 10);
            continue;
        }
        tails.push(tok);
    }

    // Build ordered dice string: higher sides first
    const diceParts = Object.entries(diceMap)
        .sort((a, b) => parseInt(b[0], 10) - parseInt(a[0], 10))
        .map(([sidesStr, cnt]) => `${cnt}D${sidesStr}`);

    const parts: string[] = [];
    if (diceParts.length > 0) parts.push(diceParts.join('+'));
    if (flat !== 0) parts.push((flat > 0 ? '+' : '') + String(flat));
    const head = parts.join('');

    const tailStr = tails.length ? (head ? '+' : '') + tails.join('+') : '';
    const result = (head || '') + tailStr;
    if (result) return result;
    // If everything collapsed (e.g., only 'DB' with None), return string without DB tokens
    const noDbTokens = tokens.filter(t => !/^DB$/i.test(t));
    const fallback = noDbTokens.join('+');
    return fallback || '-';
}
