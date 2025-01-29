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
