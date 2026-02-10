// Currency utilities: parse price strings and format cents

// Parses price strings like:
// - USD: "$4.50", "98¢", "$9.95-$35.00", "$1,200.00+"
// - UK Pounds: "£5.10"
// - Victorian/Dark Ages: "24d" (pence), "12s" (shillings), "£1" (pounds)
// - Complex Victorian: "£2/6s" (£2 and 6 shillings), "£2/6s/3d" (£2, 6s, 3d)
// - Ranges: "12-15d", "£5–£7" (returns lower bound)
// Returns the lower-bound price in cents (treating pence as base unit for historical eras)
// For Victorian/Dark Ages: 1d = 100 "cents", 12d = 1s, 240d = £1
export const parsePriceToCents = (price?: string | null): number | null => {
  if (!price) return 0;
  const s = price.replace(/\s+/g, '').replace(/,/g, '');
  
  // Complex Victorian format: "£2/6s/3d" or "£2/6s" or "6s/3d"
  const victorianMatch = s.match(/(?:£(\d+))?(?:\/)?(?:(\d+)s)?(?:\/)?(?:(\d+)d)?/);
  if (victorianMatch && (victorianMatch[1] || victorianMatch[2] || victorianMatch[3])) {
    const pounds = parseInt(victorianMatch[1] || '0', 10);
    const shillings = parseInt(victorianMatch[2] || '0', 10);
    const pence = parseInt(victorianMatch[3] || '0', 10);
    const totalPence = pounds * 240 + shillings * 12 + pence;
    if (totalPence > 0) return totalPence; // Return pence directly
  }
  
  // Simple Dark Ages/Victorian pence format: "24d", "240+d", "12-15d", "1d–6d"
  if (s.includes('d') && !s.includes('$')) {
    const matches = s.match(/(\d+)(?:\+|[-–])?(?:\d*d)?/);
    if (matches) {
      const pence = parseInt(matches[1], 10);
      return isNaN(pence) ? null : pence; // Dark Ages: direct pence value
    }
  }
  
  // Simple shillings format: "2s", "10s"
  if (s.includes('s') && !s.includes('$') && !s.includes('/')) {
    const matches = s.match(/(\d+)s/);
    if (matches) {
      const shillings = parseInt(matches[1], 10);
      return isNaN(shillings) ? null : shillings * 12; // 1s = 12d
    }
  }
  
  // UK Pounds format: "£5", "£5.10", "£5–£7"
  if (s.includes('£')) {
    const matches = s.match(/£(\d+(?:\.\d{1,2})?)/);
    if (matches) {
      const pounds = parseFloat(matches[1]);
      if (isNaN(pounds)) return null;
      // For Victorian/Dark Ages: £1 = 240d
      // For modern UK with decimals: £1 = 100 pence (but we keep as pence units for consistency)
      if (matches[1].includes('.')) {
        return Math.round(pounds * 100); // Modern UK: £1 = 100 new pence
      } else {
        return Math.round(pounds * 240); // Victorian/Dark Ages: £1 = 240 old pence
      }
    }
  }
  
  // Extract all numeric parts (with optional $ or ¢)
  const matches = s.match(/\$?\d+(?:\.\d{1,2})?|\d+¢/g);
  if (!matches || matches.length === 0) return null;
  // Take the first number as lower-bound
  const first = matches[0];
  if (first.endsWith('¢')) {
    const cents = parseInt(first.slice(0, -1), 10);
    return isNaN(cents) ? null : cents;
  }
  // Dollar amount
  const num = parseFloat(first.replace('$', ''));
  if (isNaN(num)) return null;
  return Math.round(num * 100);
};

export const formatCentsUSD = (cents: number): string => {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// You can implement your game system's rules for determining starting money or loot here.
