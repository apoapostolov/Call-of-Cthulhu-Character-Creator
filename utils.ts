// utils.ts
import type { AttributeSet, Attribute } from './types';

export function parseSkillPointFormula(formula: string, attributes: AttributeSet): { total: number, calculation: string } {
    if (!formula || !attributes) return { total: 0, calculation: '' };

    try {
        // Normalize common textual variants in formulas so we can evaluate them reliably
        let processedFormula = formula
            // Normalize multiplication sign
            .replace(/×/g, '*')
            // Some data uses "x" or "X" (e.g., "EDU x 2"). Convert only when it appears as an operator
            // between an attribute/number and an attribute/number, to avoid corrupting tokens like "DEX".
            .replace(/(\b(?:STR|CON|DEX|INT|POW|APP|SIZ|EDU)\b|\d+)\s*[xX]\s*(\b(?:STR|CON|DEX|INT|POW|APP|SIZ|EDU)\b|\d+)/g, '$1 * $2')
            // Tolerate leading word "either" sometimes found in text
            .replace(/either\s+/i, '');

        const evaluateExpression = (expr: string): { value: number, display: string } => {
            const trimmedExpr = expr.trim();
            if (!trimmedExpr) return { value: 0, display: '' };

            let display = trimmedExpr;
            let forEval = trimmedExpr;
            const attributeRegex = /(STR|CON|DEX|INT|POW|APP|SIZ|EDU)/g;
            
            forEval = forEval.replace(attributeRegex, (match) => String(attributes[match as Attribute]));
            display = display.replace(attributeRegex, (match) => `${match}(${attributes[match as Attribute]})`);
            // Pretty-print multiplication in the display string
            display = display.replace(/\*/g, '×');
            
            // eslint-disable-next-line no-new-func
            const value = Number(new Function(`return ${forEval}`)());
            if (isNaN(value)) throw new Error(`Could not evaluate expression: ${forEval}`);
            return { value, display };
        };

        const parts = processedFormula.split(' + ');
        let total = 0;
        let calculationParts: string[] = [];

        for (const part of parts) {
            if (part.includes(' or ')) {
                // Strip outer parentheses around an OR-group, e.g., (DEX * 2 or POW * 2)
                const inner = part.trim().replace(/^\((.*)\)$/s, '$1');
                const choices = inner.split(' or ').map(c => c.trim());
                const evaluatedChoices = choices.map(evaluateExpression);
                
                if (evaluatedChoices.length === 0) continue;

                const winner = evaluatedChoices.reduce((max, current) => current.value > max.value ? current : max, evaluatedChoices[0]);
                
                total += winner.value;
                calculationParts.push(`max(${evaluatedChoices.map(c => c.display).join(', ')})`);
            } else {
                const { value, display } = evaluateExpression(part);
                total += value;
                calculationParts.push(display);
            }
        }
        
        const finalCalculation = `${calculationParts.filter(p => p).join(' + ')} = ${Math.round(total)}`;
        
        return { total: Math.round(total), calculation: finalCalculation };

    } catch (e) {
        console.error("Error parsing skill point formula:", formula, e);
        return { total: 0, calculation: "Error parsing formula" };
    }
}

// Normalize item names imported from corebook tables by stripping footnote markers
// such as (†), (+), and asterisks used for annotations.
export function normalizeItemName(name: string): string {
    if (!name) return name;
    let s = String(name);
    // Remove specific parenthetical footnotes like (†) and (+)
    s = s.replace(/\s*\((?:\u2020|†|\+)\)\s*/g, ' ');
    // Remove any asterisks used as footnote markers
    s = s.replace(/\*/g, '');
    // Collapse extra spaces and trim
    s = s.replace(/\s{2,}/g, ' ').trim();
    return s;
}
