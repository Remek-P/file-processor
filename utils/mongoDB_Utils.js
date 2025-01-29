export const containBannedOperators = (input) => {
  //Valid for $ currency (numbers with "." or "," as a separator and invalid for any text;
  const regex = /^\$(\d+([.,]\d+)?(\s*)?)$/g;
  return !input.match(regex);
}

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