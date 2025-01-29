export const containBannedOperators = (input) => {
  // Match a string that starts with $ followed by a number, optional comma/dot decimal, and may have spaces at the end
  const regex = /^\$(\d+([.,]\d{1,2})?)\s*$/;

  // Check if the string contains a $ sign
  if (input.includes('$')) {
    // If it is exactly just a "$" sign, return false
    if (input === '$') {
      return false;
    }

    // If the input matches the valid format, return false (valid currency, no injection)
    if (input.match(regex)) {
      return false;
    }

    // Otherwise, if there are any extra characters (including letters or symbols) after the valid number, return true
    return true;
  }

  // If there’s no $ sign, return false (no injection detected)
  return false;
};

export const escapeHTML = (input) => {
  return input.replace(/[&<>"']/g, function (char) {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
    }
  });
}