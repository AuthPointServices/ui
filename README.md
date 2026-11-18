# @authpoint/ui

El sistema de diseño de Seedle: los tokens y el comportamiento de Adobe Spectrum 2, con el verde, la letra Geist y los
iconos Lucide de la casa. Lo usan la Cuenta (`accounts-frontend`), las pantallas de acceso (`identity-server/login-ui`)
y, más adelante, la consola y el sitio principal. Cómo se usa cada pieza y por qué está en `DESIGN.md`.

## Instalar

Cada versión se publica ya compilada en las releases del repo:

```sh
pnpm add https://github.com/AuthPointServices/ui/releases/download/v0.1.0/authpoint-ui-0.1.0.tgz
```

Con Tailwind 4, el tema y las clases que usan los componentes:

```css
@import 'tailwindcss';
@import '@authpoint/ui/theme.css';
@source '../node_modules/@authpoint/ui/dist';
```

El tema claro u oscuro lo pone `data-theme="light|dark"` en `<html>`. En Vite, `resolve.dedupe` con `react`, `react-dom`,
`react-aria-components` y `lucide-react`, para que la app y el paquete usen la misma copia.

## Desarrollo

```sh
pnpm install
pnpm check    # lint, tipos, pruebas y contraste de los pares de color
pnpm tokens   # vuelve a generar src/theme.css desde @adobe/spectrum-tokens
pnpm build
```

## Publicar

Subir `version` en `package.json` y etiquetar con la misma: `git tag v0.2.0 && git push origin v0.2.0`. El flujo
`release` comprueba, empaqueta y adjunta el `.tgz` a la release.
