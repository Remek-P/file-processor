import escapeStringRegexp from "escape-string-regexp";

export const containBannedOperators = (input) => {
  // Regex to match:
  // 1. Just "$" by itself.
  // 2. "$" followed by a number, which may have a comma or dot as a decimal point, and no text after that.
  const validCurrencyRegex = /^\$(\d+([.,]\d+)?)(\s*)$/;

  // Check if the string contains the $ sign
  if (input.includes('$')) {
    if (input === '$') {
      return false;
    }
    // If input matches the valid format, return false (no injection, valid query)
    if (validCurrencyRegex.test(input)) {
      return false;
    }

    // If there is anything after a valid "$number" format (e.g., text or extra characters), return true (invalid query)
    return true;
  }

  // If there’s no $ sign, return false (no injection found)
  return false;
};

export function sanitizeMongoQuery(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // First preserve valid currency patterns
  const preserveCurrency = input.replace(
      /(\$\d+[.,]?\d*|\$\s*\d+[.,]?\d*)/g,
      match => `__CURRENCY_${Buffer.from(match).toString('base64')}__`
  );

  // Handle special characters but be lenient with apostrophes
  const mongoSafe = preserveCurrency
      // Escape MongoDB operators
      .replace(/\$(?![0-9])/g, '\\$')
      // Escape dots in field names
      .replace(/\./g, '\\.')
      // Remove null bytes
      .replace(/\x00/g, '');

  // Restore currency patterns
  return mongoSafe.replace(
      /__CURRENCY_([A-Za-z0-9+/=]+)__/g,
      (_, encoded) => Buffer.from(encoded, 'base64').toString()
  );
}