---
name: Seedle
description: El sistema de diseño de Seedle sobre Adobe Spectrum 2, para la Cuenta, la consola de administración y los productos.
colors:
  accent: "#00794a"
  accent-content: "#00794a"
  accent-subtle: "#f4fbf6"
  focus: "#00794a"
  bg: "#ffffff"
  layer-1: "#f8f8f8"
  layer-2: "#ffffff"
  fg: "#292929"
  fg-strong: "#131313"
  fg-muted: "#505050"
  border: "#e1e1e1"
  border-strong: "#c6c6c6"
  field-border: "#8f8f8f"
  positive: "#05834e"
  notice: "#c24e00"
  negative: "#d73220"
typography:
  heading:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.3
rounded:
  sm: "4px"
  md: "8px"
  lg: "10px"
  xl: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "9999px"
    height: "32px"
    padding: "0 16px"
  button-secondary:
    textColor: "{colors.fg-strong}"
    rounded: "9999px"
    height: "32px"
    padding: "0 16px"
  field:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg-strong}"
    rounded: "{rounded.md}"
    height: "32px"
---

# Design System: Seedle

## Overview

La estructura, las medidas y el comportamiento son los de Adobe Spectrum 2: los tokens de `@adobe/spectrum-tokens`
15.7.0 y los componentes de `react-aria-components`. La identidad es de Seedle: el verde como único acento, la letra
Geist y los iconos de Lucide. Adobe es el referente de oficio, nunca de aspecto: ni su azul ni Adobe Clean.

Es una superficie de trabajo (modo Operate): se lee de un vistazo, cada pantalla sirve a una tarea y la marca está en
los detalles, no en la decoración.

**Key Characteristics:**
- Un solo acento, el verde; los colores de estado sólo para estados.
- Densidad media de Spectrum en escritorio y su escala móvil con el dedo o por debajo de 768 px.
- Tema claro y oscuro con los mismos papeles; el oscuro se activa con `data-theme="dark"` en `<html>`.
- WCAG 2.2 AA comprobado al generar los tokens (`pnpm tokens --verify`).

## Colors

Los grises y los colores de estado son los de Spectrum. El acento es la escala azul de Spectrum llevada al tono 158
de OKLCH a la misma luminosidad, así que conserva sus contrastes.

### Primary
- **Verde Seedle** (#00794a, `accent`): el botón principal, la sección actual, las casillas marcadas, el foco.
- **Verde texto** (#00794a, `accent-content`): enlaces y texto en verde sobre el fondo o sobre `accent-subtle`.

### Neutral
- **Fondo** (#ffffff, `bg`): la barra global y los campos.
- **Suelo** (#f8f8f8, `layer-1`): el fondo de las páginas.
- **Capa** (#ffffff, `layer-2`): tarjetas, popovers y diálogos.
- **Texto** (#292929, `fg`), **fuerte** (#131313, `fg-strong`) y **secundario** (#505050, `fg-muted`).
- **Bordes**: separadores (#e1e1e1, `border`), cabecera de tabla (#c6c6c6, `border-strong`) y campos (#8f8f8f,
  `field-border`, 3:1 sobre el fondo).

### Estado
- `positive`, `notice`, `negative`, `informative`: los pasos 900 para texto e iconos, los 100 como fondo suave.
- Rellenos con texto encima (botón negativo, badges, avisos flotantes): `*-bg` con su `*-on`, blanco o negro según
  cuál pase AA en cada tema.
- Gráficos sin texto (la barra de un medidor): `accent-visual` y `notice-visual`, 3:1 contra la pista `track` y el fondo.

### Named Rules
**Un color, un sentido.** El verde es la marca y la acción. Si algo está bien, se dice con texto, no con verde.

## Typography

**Font:** Geist Variable (con ui-sans-serif y system-ui).

### Hierarchy
- **Heading** (700, `text-700` 28 px): el título de cada página.
- **Title** (700, `text-300` 18 px): títulos de sección, de diálogo (`text-500`) y de mensajes de estado (`text-200`).
- **Body** (400, `text-100` 14 px, interlineado 1.5): el texto de la interfaz; `text-200` (16 px) en campos y menús.
- **Label** (700, `text-75` 12 px): cabeceras de tabla y ayudas de campo.

Con el dedo la escala sube un paso (14 → 17 px) desde los propios tokens; los componentes no cambian de clase.

## Layout

- **Armazón** (`AppFrame`): barra global de 64 px (56 en estrecho) con la marca y la app («Seedle | Cuenta»), el
  selector de productos y el menú de la cuenta; secciones a la izquierda en 240 px; contenido hasta 1280 px.
- Por debajo de 768 px las secciones pasan a pestañas desplazables bajo la barra.
- Espaciado en la escala de 4 px; 16 entre elementos de un grupo, 24 o 32 entre grupos.
- Controles de 32 px (24 los pequeños); 44 con el dedo o por debajo de 768 px.

## Elevation & Depth

Plano por capas: el suelo `layer-1`, las tarjetas `layer-2` sin sombra. La sombra es sólo para lo que flota.

### Shadow Vocabulary
- **Elevated** (`--shadow-elevated`): popovers, menús, diálogos y avisos flotantes.
- **Emphasized** (`--shadow-emphasized`): reservada para una tarjeta que se arrastra o se destaca.

## Shapes

- `sm` 4 px: casillas y esqueletos pequeños. `md` 8 px: campos, menús, filas de navegación.
- `lg` 10 px: tarjetas, diálogos, popovers. `xl` 16 px: superficies grandes.
- Botones, buscador y avatares, en pastilla o círculo.

## Components

- **Button**: `accent` para la acción principal (una por vista), `secondary` con borde, `negative` sólo para
  confirmar lo que no se deshace, `quiet` para iconos. Mientras espera conserva el ancho y muestra la rueda.
- **Campos** (TextField, SearchField, Select, CheckboxGroup): etiqueta encima, «(opcional)» en vez de asterisco, ayuda
  debajo; con error, el mensaje ocupa el sitio de la ayuda.
- **Table**: columnas fijas, cabecera en `text-75`, orden con flecha visible, selección con casillas. Esqueleto con la
  forma de las filas reales; vacío y error con `TableMessage`.
- **SeatMeter**, **StatusLight**, **Badge**, **InlineAlert**, **Dialog** y **AlertDialog**, **ActionMenu**,
  **Toasts**, **Tabs**, **Tooltip**, **Switch**, **Avatar**: ver `src/components`.
- **AppFrame**, **ProductSwitcher** y **AccountMenu**: el armazón común a la Cuenta, la consola y el sitio principal.
- **Clases nativas** (`nativeButtonClass`, `nativeInputClass`, `nativeRadioClass`): el mismo aspecto sobre `<button>`,
  `<a>` e `<input>` nativos, para formularios que envía el navegador (las pantallas de Keycloak). Fuera de ahí, los
  componentes.
- **Tema**: lo pone `data-theme` en `<html>`; `dark:` sigue a ese atributo, no a la preferencia del sistema.

## Do's and Don'ts

- Do: decir el estado con texto; el color acompaña.
- Do: reservar el sitio de lo que llega (contadores, mensajes) para que nada se mueva al cambiar de estado.
- Don't: tarjetas dentro de tarjetas, sombras en superficies que no flotan, el verde como textura.
- Don't: atenuar un formulario mientras se envía: se bloquea con `inert` y sólo el botón dice que espera.
<!-- decision:20261117-en-la-tabla-los-cuerpos-de-vacio -->
- Do (decisión `20261117-en-la-tabla-los-cuerpos-de-vacio`, juez claude-opus-5.5 xhigh, opción B): Los cuerpos sin
  filas de una tabla o lista (búsqueda sin resultados, vacío, error) miden su contenido más 32 px arriba y 40 px
  abajo. El bloque va centrado en el ancho visible y 4 px por encima del centro. Nunca se estiran a un número de filas
  ni al alto de la ventana. Lo que está encima de la tabla (búsqueda, contador, encabezados) no se mueve en ningún
  cambio de estado. El reintento ocurre en el sitio, sin pasar por el esqueleto. Ninguna banda vacía dentro de la
  tabla pasa de 40 px. La regla de un cuerpo que mide lo mismo que con datos se queda para las tarjetas cuyo alto fija
  la rejilla, porque una tabla no tiene un alto fijo con datos.
  Se mide con: `solape-hermanos`, `banda-vacia`. Propuestos: `check nuevo (condición 0)`, `check nuevo (condición 2)`,
  `check nuevo (condición 3)`, `check nuevo (condición 4)`, `check nuevo (condición 6)`.
  Lo juzga el juez: A 1440 y 1024 el título del mensaje se lee en una sola línea; a 390 ocupa como mucho dos,
  centradas, con el botón 16 px debajo.
  Aplica también a: «Estado error de la tabla», «Reintento (error → cargando → datos)», «Tabla a 390 con scroll
  horizontal», «Carga inicial → vacío o error», «Resto de tablas de la consola (Invitaciones, Administradores,
  Herramientas, Organizaciones del área interna de Seedle)».
<!-- /decision:20261117-en-la-tabla-los-cuerpos-de-vacio -->
<!-- decision:20261117-en-el-medidor-de-puestos-la-cifra-dice -->
- Do (decisión `20261117-en-el-medidor-de-puestos-la-cifra-dice`, juez claude-opus-5.5 xhigh, opción A): Un medidor de
  cupo dibuja lo consumido y dice lo que queda. El relleno es lo usado, el hueco del carril es lo libre y la cifra,
  alineada con el final del carril, nombra lo libre. El color de estado aparece una sola vez por objeto, en el
  relleno, y sólo cuando el cupo se agota. El texto es neutro y tiene el mismo estilo en todas las filas y estados.
  aria-valuenow es lo que dibuja la barra y aria-valuetext es exactamente lo que dice la cifra. Ningún relleno se
  redondea a vacío o a lleno si no lo está.
  Se mide con: `solape-hermanos`, `texto-truncado`. Propuestos: `check nuevo (condición 0)`, `check nuevo (condición
  1)`, `check nuevo (condición 2)`, `check nuevo (condición 3)`, `check nuevo (condición 4)`, `check nuevo (condición
  5)`, `check nuevo (condición 6)`, `check nuevo (condición 8)`.
  Lo juzga el juez: En la captura de lleno, el único elemento ámbar de la fila es el relleno de la barra; la cifra se
  ve del mismo color y peso que en las demás filas. En la captura con forced-colors: active, el relleno de cada
  medidor se ve en el color de resaltado del sistema y el carril tiene un contorno visible de 1 px.
  Aplica también a: «Fila de letgrid en lleno («0 libres de 25»)», «Botones «Gestionar» de cada fila», «Estado
  cargando del medidor», «Otros sitios que muestren puestos (tarjeta de Resumen, columna de puestos en Herramientas y
  en Organizaciones del área interna de Seedle)».
<!-- /decision:20261117-en-el-medidor-de-puestos-la-cifra-dice -->
<!-- decision:20261117-error-de-un-campo-textfield-invalido -->
- Do (decisión `20261117-error-de-un-campo-textfield-invalido`, juez claude-opus-5.5 xhigh, opción A): El error de un
  campo se marca con un solo rojo, negative-900, en tres sitios: el contorno del control que tiene el valor, un icono
  de alerta y el mensaje. El mensaje sustituye a la ayuda en su mismo hueco, con el mismo tamaño y alto de línea
  (12/16 px), y sus líneas siguientes se alinean con el texto, no con el icono. Un grupo de opciones no tiene
  contorno: su única marca es el mensaje y ninguna opción cambia de color. Nada más se pone rojo: ni la etiqueta, ni
  el valor, ni el fondo, ni el botón, ni las opciones deshabilitadas. El error aparece al enviar o al salir del campo,
  lleva el foco al primer campo inválido, se quita al cambiar el valor y nunca deshabilita el envío. Lo que está
  encima del campo no se mueve nunca, y lo de debajo tampoco cuando el mensaje y la ayuda ocupan las mismas líneas.
  Se mide con: `solape-hermanos`, `solape-hermanos-2`, `texto-truncado`. Propuestos: `check nuevo (condición 0)`,
  `check nuevo (condición 1)`, `check nuevo (condición 2)`, `check nuevo (condición 3)`, `check nuevo (condición 4)`,
  `check nuevo (condición 5)`, `check nuevo (condición 6)`, `check nuevo (condición 8)`, `check nuevo (condición 9)`,
  `check nuevo (condición 10)`.
  Lo juzga el juez: En la captura con forced-colors: active, el campo inválido tiene un contorno de un color distinto
  del de los campos válidos, y su icono y su mensaje se leen. En la captura de lleno, el único rojo del diálogo está
  en el campo Correo (contorno, icono y mensaje); la opción letgrid sin puestos se ve en gris y su motivo tiene el
  mismo color que «1 puesto libre».
  Aplica también a: «Mensaje «Ya hay alguien en tu empresa con este correo. Búscalo en Usuarios.» (Invitar, lleno)»,
  «Opción «letgrid · Sin puestos libres» (Herramientas, lleno)», «Errores que no son de un campo (fallo de red al
  enviar, sesión caducada, sin permiso)», «Resto de formularios de la consola (Configuración, alta de organización y
  cambio de papel en el área interna de Seedle, asignar herramienta)», «Búsqueda sin resultados en las tablas».
<!-- /decision:20261117-error-de-un-campo-textfield-invalido -->
<!-- decision:20261118-entrar-en-su-estado-lleno-aviso-de-exito -->
- Do (decisión `20261118-entrar-en-su-estado-lleno-aviso-de-exito`, juez claude-opus-5.5 xhigh, opción A): Las
  pantallas de acceso se anclan arriba y, si no caben, se desplaza el documento. El aire entre la barra del idioma y
  el título depende sólo del alto de la ventana y nunca del contenido: clamp(32px, 13svh, 160px) desde 768 px de ancho
  y 24 px por debajo. Así, en una misma ventana, el título está a la misma altura en todos los estados y con o sin
  error. Los avisos y errores de página van siempre debajo del subtítulo. Ninguna columna centra en vertical ni
  reparte el alto libre: lo que sobra queda al pie. En las pantallas de uno o dos campos, el título, los avisos, los
  campos y el botón principal caben en la primera vista de 1440x780 y 1024x700. Los proveedores, la passkey y los
  enlaces secundarios pueden quedar bajo el pliegue. En los formularios largos, el botón queda al final del recorrido
  y nunca se pega al pie. No hay scroll interno, scroll horizontal ni barras fijas. El panel de la marca mide el alto
  de la ventana y no se desplaza. Al final del desplazamiento quedan entre 32 y 48 px bajo el último elemento.
  Se mide con: `solape-hermanos`, `sobrante-repartido`. Propuestos: `check nuevo (condición 0)`, `check nuevo
  (condición 1)`, `check nuevo (condición 2)`, `check nuevo (condición 3)`, `check nuevo (condición 4)`, `check nuevo
  (condición 5)`, `check nuevo (condición 7)`.
  Lo juzga el juez: En la captura de lleno a 1440x852 se ven enteros, sin desplazar, el título, el aviso, los dos
  campos y el botón «Iniciar sesión». El nombre Seedle del panel se ve completo, con el mismo margen al pie que en la
  captura de vacío.
  Aplica también a: «Crear la cuenta (nombre, apellidos, correo, contraseña con requisitos y proveedores)»,
  «Configurar los dos pasos (código QR, clave, código y nombre del dispositivo) y elegir la contraseña con la lista de
  requisitos», «Avisos, errores, cerrar sesión y verificar el correo (contenido corto)», «Aviso de lleno («Si hay una
  cuenta con ese correo, en unos minutos te llegará el enlace.»)», «Campo Correo con foco en lleno», «Botón de passkey
  en lleno», «Selector de idioma».
<!-- /decision:20261118-entrar-en-su-estado-lleno-aviso-de-exito -->
