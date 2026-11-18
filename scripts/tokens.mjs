// src/theme.css desde @adobe/spectrum-tokens; el acento cambia de tono a la misma luminosidad para conservar los contrastes.
// --verify falla si el archivo no está al día o si un par baja de AA.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const tokensFile = require.resolve('@adobe/spectrum-tokens/dist/json/variables.json');
const pkg = JSON.parse(readFileSync(new URL('../../package.json', `file://${tokensFile}`), 'utf8'));
const T = JSON.parse(readFileSync(tokensFile, 'utf8'));

// El azul de Adobe es 264.
const BRAND_HUE = 158;

function resolve(name, { scale = 'desktop', theme = 'light' } = {}) {
  const pick = (t) => {
    if (t.value !== undefined) return typeof t.value === 'string' && t.value.startsWith('{') ? resolve(t.value.slice(1, -1), { scale, theme }) : t.value;
    const s = t.sets;
    return pick(s[scale] ?? s[theme] ?? Object.values(s)[0]);
  };
  const t = T[name];
  if (!t) throw new Error(`falta el token ${name}`);
  return pick(t);
}

// sRGB ↔ OKLCH (Ottosson).
const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const gam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const rgb = (s) => s.match(/[\d.]+/g).slice(0, 3).map((n) => Number(n) / 255);
function toOklch([r, g, b]) {
  [r, g, b] = [r, g, b].map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(a, B), (Math.atan2(B, a) * 180) / Math.PI];
}
function fromOklch([L, C, H]) {
  const a = C * Math.cos((H * Math.PI) / 180), b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
}
const inGamut = (c) => c.every((x) => x >= -1e-4 && x <= 1 + 1e-4);
// Si no cabe en sRGB, menos croma; nunca otra luminosidad.
function rehue(value) {
  const [L, C] = toOklch(rgb(value));
  let c = C;
  while (c > 0 && !inGamut(fromOklch([L, c, BRAND_HUE]))) c -= 0.002;
  const out = fromOklch([L, Math.max(c, 0), BRAND_HUE]).map((x) => Math.round(gam(Math.min(1, Math.max(0, x))) * 255));
  return `rgb(${out.join(', ')})`;
}
const luminance = (s) => rgb(s).map(lin).reduce((acc, c, i) => acc + c * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600];
const GRAYS = [25, 50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const STATUS = { positive: 'positive-color', notice: 'notice-color', negative: 'negative-color', informative: 'informative-color' };

// Los rellenos de estado de Spectrum (botón negativo, badges); el texto encima, blanco o negro según cuál pase AA.
function statusFills(theme) {
  const out = {};
  for (const k of ['positive', 'notice', 'negative', 'informative', 'neutral-subdued']) {
    const name = k === 'neutral-subdued' ? 'neutral' : k;
    const bg = resolve(`${k}-background-color-default`, { theme });
    out[`--color-${name}-bg`] = bg;
    out[`--color-${name}-bg-hover`] = T[`${k}-background-color-hover`] ? resolve(`${k}-background-color-hover`, { theme }) : bg;
    out[`--color-${name}-on`] = contrast('rgb(255, 255, 255)', bg) >= 4.5 ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
  }
  return out;
}

function colors(theme) {
  const out = {};
  for (const s of STEPS) out[`--color-seed-${s}`] = rehue(resolve(`blue-${s}`, { theme }));
  for (const g of GRAYS) out[`--color-gray-${g}`] = resolve(`gray-${g}`, { theme });
  for (const [k, base] of Object.entries(STATUS)) for (const s of [100, 200, 700, 800, 900, 1000]) out[`--color-${k}-${s}`] = resolve(`${base}-${s}`, { theme });
  const seed = (s) => `var(--color-seed-${s})`;
  // El verde no tiene la luminancia del azul al mismo paso: se busca el paso que pasa AA.
  const step = (from, ok) => {
    const i = STEPS.indexOf(from);
    const near = [...STEPS].sort((x, y) => Math.abs(STEPS.indexOf(x) - i) - Math.abs(STEPS.indexOf(y) - i));
    return near.find((s) => ok(out[`--color-seed-${s}`])) ?? from;
  };
  const darker = (s, n) => (theme === 'dark' ? STEPS[Math.max(STEPS.indexOf(s) - n, 0)] : STEPS[Math.min(STEPS.indexOf(s) + n, STEPS.length - 1)]);
  const bg = resolve('background-base-color', { theme });
  const fill = step(900, (c) => contrast('rgb(255, 255, 255)', c) >= 4.5);
  const text = step(900, (c) => contrast(c, bg) >= 4.5);
  // Rellenos sin texto: 3:1 contra la pista y el fondo (WCAG 1.4.11).
  const track = resolve('gray-200', { theme });
  const visible = (c) => contrast(c, track) >= 3 && contrast(c, bg) >= 3;
  const visual = step(800, (c) => visible(c));
  const notice = [800, 900, 1000, 700].find((s) => visible(out[`--color-notice-${s}`])) ?? 800;
  Object.assign(out, {
    '--color-bg': resolve('background-base-color', { theme }),
    '--color-layer-1': resolve('background-layer-1-color', { theme }),
    '--color-layer-2': resolve('background-layer-2-color', { theme }),
    '--color-fg': resolve('neutral-content-color-default', { theme }),
    '--color-fg-strong': resolve('gray-900', { theme }),
    '--color-fg-muted': resolve('neutral-subdued-content-color-default', { theme }),
    '--color-fg-disabled': resolve('disabled-content-color', { theme }),
    '--color-border': resolve('gray-200', { theme }),
    '--color-border-strong': resolve('gray-400', { theme }),
    '--color-field-border': resolve('gray-500', { theme }),
    '--color-hover': resolve('gray-100', { theme }),
    '--color-accent': seed(fill), '--color-accent-hover': seed(darker(fill, 1)), '--color-accent-down': seed(darker(fill, 2)),
    '--color-accent-fg': 'rgb(255, 255, 255)', '--color-accent-content': seed(text), '--color-accent-subtle': seed(100), '--color-accent-subtle-hover': seed(200),
    '--color-focus': seed(fill),
    ...statusFills(theme),
    '--color-track': 'var(--color-gray-200)', '--color-accent-visual': seed(visual), '--color-notice-visual': `var(--color-notice-${notice})`,
  });
  return out;
}

const SIZES = {
  '--size-control-s': 'component-height-75', '--size-control-m': 'component-height-100', '--size-control-l': 'component-height-200', '--size-control-xl': 'component-height-300',
  '--size-icon-s': 'workflow-icon-size-75', '--size-icon-m': 'workflow-icon-size-100', '--size-icon-l': 'workflow-icon-size-200',
  '--size-row-m': 'table-row-height-medium-regular', '--size-row-xl': 'table-row-height-extra-large',
  '--size-checkbox': 'checkbox-control-size-medium', '--size-switch-w': 'switch-control-width-medium', '--size-switch-h': 'switch-control-height-medium',
  '--size-tab': 'tab-item-height-medium', '--size-toast': 'toast-height', '--size-toast-max': 'toast-maximum-width',
  '--size-nav-min': 'side-navigation-minimum-width', '--size-nav-max': 'side-navigation-maximum-width', '--size-nav-indicator': 'side-navigation-indicator-height',
  '--size-avatar-m': 'avatar-size-300', '--size-status-dot': 'status-light-dot-size-medium',
  '--size-meter-l': 'meter-thickness-large', '--size-meter-s': 'meter-thickness-small', '--size-tooltip-max': 'tooltip-maximum-width', '--size-field': 'field-width',
  '--space-control-x': 'component-edge-to-text-100', '--space-icon-gap': 'text-to-visual-100', '--space-popover': 'popover-edge-to-content-area',
  '--text-75': 'font-size-75', '--text-100': 'font-size-100', '--text-200': 'font-size-200', '--text-300': 'font-size-300', '--text-400': 'font-size-400',
  '--text-500': 'font-size-500', '--text-600': 'font-size-600', '--text-700': 'font-size-700', '--text-800': 'font-size-800', '--text-900': 'font-size-900',
};
const FIXED = {
  '--radius-sm': 'corner-radius-small-default', '--radius-md': 'corner-radius-medium-default', '--radius-lg': 'corner-radius-large-default',
  '--radius-xl': 'corner-radius-extra-large-default',
  '--border-1': 'border-width-100', '--border-2': 'border-width-200', '--focus-ring': 'focus-indicator-thickness', '--focus-gap': 'focus-indicator-gap',
};
const flat = (v) => (typeof v === 'object' ? flat(v.desktop ?? Object.values(v)[0]) : v);

const SHADOWS = { '--shadow-emphasized': 'drop-shadow-emphasized', '--shadow-elevated': 'drop-shadow-elevated' };
const shadows = (theme) => Object.fromEntries(Object.entries(SHADOWS).map(([k, n]) => [k, T[n].value.map((l) => {
  const c = l.color.sets?.[theme] ?? l.color.sets?.light ?? l.color;
  return `${l.x} ${l.y} ${l.blur} ${l.spread} ${c.value ?? c}`;
}).join(', ')]));

const decl = (o, pad = '  ') => Object.entries(o).map(([k, v]) => `${pad}${k}: ${v};`).join('\n');
const sizes = (scale) => Object.fromEntries(Object.entries(SIZES).map(([k, n]) => [k, flat(resolve(n, { scale }))]));
// La escala móvil de Spectrum deja controles de 30 y 40 px; con el dedo, 44.
const TOUCH_MIN = 44;
const touchSizes = () => {
  const s = sizes('mobile');
  for (const k of ['--size-control-s', '--size-control-m']) s[k] = `${Math.max(parseFloat(s[k]), TOUCH_MIN)}px`;
  return s;
};
// También por ancho: un móvil con ratón es raro.
const TOUCH = '(pointer: coarse), (max-width: 767px)';
const fixed = Object.fromEntries(Object.entries(FIXED).map(([k, n]) => [k, flat(resolve(n))]));

const css = `/* Generado por scripts/tokens.mjs desde @adobe/spectrum-tokens ${pkg.version} (Apache-2.0, ver NOTICE). No se edita a mano. */
@theme {
  --font-sans: 'Geist Variable', ui-sans-serif, system-ui, sans-serif;
  --leading-tight: ${resolve('line-height-100')};
  --leading-normal: ${resolve('line-height-200')};
${decl(fixed)}
${decl(sizes('desktop'))}
${decl(colors('light'))}
${decl(shadows('light'))}
}

/* En bloque: la forma corta sólo toma la primera condición. */
@custom-variant touch {
  @media ${TOUCH} {
    @slot;
  }
}

/* El tema lo pone data-theme, no la preferencia del sistema (la de Tailwind por omisión). */
@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));

@media ${TOUCH} {
  :root {
${decl(touchSizes(), '    ')}
  }
}

[data-theme='dark'] {
  color-scheme: dark;
${decl(colors('dark'))}
${decl(shadows('dark'))}
}

@layer base {
  html {
    font-family: var(--font-sans);
    color: var(--color-fg);
    background: var(--color-bg);
    -webkit-font-smoothing: antialiased;
  }
  /* En body: el rem sigue siendo el del navegador. */
  body {
    font-size: var(--text-100);
    line-height: var(--leading-normal);
  }
  @keyframes fade-in {
    from { opacity: 0; }
  }
  ::selection {
    background: color-mix(in oklab, var(--color-accent) 24%, transparent);
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}
`;

const problems = [];
for (const theme of ['light', 'dark']) {
  const c = colors(theme);
  const val = (k) => (c[k].startsWith('var(') ? c[c[k].slice(4, -1)] : c[k]);
  const pairs = [['--color-accent-fg', '--color-accent', 4.5], ['--color-accent-content', '--color-bg', 4.5], ['--color-fg', '--color-bg', 4.5],
    ['--color-fg-muted', '--color-bg', 4.5], ['--color-focus', '--color-bg', 3], ['--color-field-border', '--color-bg', 3],
    ...['positive', 'notice', 'negative'].flatMap((k) => [[`--color-${k}-900`, '--color-bg', 4.5], [`--color-${k}-900`, '--color-layer-1', 4.5], [`--color-${k}-1000`, `--color-${k}-100`, 4.5]]),
    ['--color-fg-muted', '--color-layer-1', 4.5], ['--color-accent-content', '--color-layer-1', 4.5], ['--color-accent-content', '--color-accent-subtle', 4.5],
    ...['positive', 'notice', 'negative', 'informative', 'neutral'].flatMap((k) => [[`--color-${k}-on`, `--color-${k}-bg`, 4.5], [`--color-${k}-on`, `--color-${k}-bg-hover`, 4.5]]),
    ['--color-accent-visual', '--color-track', 3], ['--color-accent-visual', '--color-bg', 3], ['--color-notice-visual', '--color-track', 3], ['--color-notice-visual', '--color-bg', 3]];
  for (const [a, b, min] of pairs) {
    const r = contrast(val(a), val(b));
    if (r < min) problems.push(`${theme}: ${a} sobre ${b} = ${r.toFixed(2)}:1, mínimo ${min}:1`);
  }
}

const path = new URL('../src/theme.css', import.meta.url);
if (process.argv.includes('--verify')) {
  if (readFileSync(path, 'utf8') !== css) problems.push('src/theme.css no está al día: pnpm tokens');
  if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
} else {
  if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
  writeFileSync(path, css);
  console.log(`src/theme.css desde @adobe/spectrum-tokens ${pkg.version}`);
}
