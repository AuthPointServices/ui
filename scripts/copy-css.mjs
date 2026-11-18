// El tema va en el paquete tal cual: lo procesa el Tailwind de cada app.
import { copyFileSync } from 'node:fs';

copyFileSync(new URL('../src/theme.css', import.meta.url), new URL('../dist/theme.css', import.meta.url));
