// jsdom no trae CSS.escape; react-aria lo usa en los modales.
globalThis.CSS ??= {
  escape(value: string) {
    let out = '';
    for (let i = 0; i < value.length; i++) {
      const c = value.charCodeAt(i);
      const ch = value.charAt(i);
      if (c === 0) out += '\uFFFD';
      else if ((c >= 1 && c <= 0x1f) || c === 0x7f || (i === 0 && c >= 0x30 && c <= 0x39) || (i === 1 && c >= 0x30 && c <= 0x39 && value.charCodeAt(0) === 0x2d)) out += `\\${c.toString(16)} `;
      else if (i === 0 && ch === '-' && value.length === 1) out += '\\-';
      else if (c >= 0x80 || /[\w-]/.test(ch)) out += ch;
      else out += `\\${ch}`;
    }
    return out;
  },
} as typeof CSS;
