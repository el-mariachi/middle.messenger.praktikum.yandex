export default function trim(source: string, userSymbols?: string) {
  let trimRE = /^\s*(.*?)\s*$/g;
  if (userSymbols) {
    const escapeRE = /([$()*+.?[^{|\\])/g;
    const escapedUserSymbols = userSymbols.replace(escapeRE, '\\$1');
    trimRE = new RegExp(`^[${escapedUserSymbols}]*(.*?)[${escapedUserSymbols}]*$`, 'g');
  }
  return source.replace(trimRE, '$1');
}
