import { useEffect, useRef } from 'react';
import { Link } from 'react-aria-components';

import { cx, focusRing } from './styles';

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true'; className?: string }>;
}

// Para navegar sin recargar, la app lo envuelve en el RouterProvider de react-aria.
export function AppFrame({ brand, product, home, actions, nav, current, children }: {
  brand: string;
  product: string;
  home: { href: string; label: string };
  actions?: React.ReactNode;
  nav: { label: string; items: NavItem[] };
  current: string;
  children: React.ReactNode;
}) {
  const tabs = useRef<HTMLElement>(null);
  const shown = useRef<string | null>(null);

  // Al cambiar de sección, el foco al título (WCAG 2.4.3).
  useEffect(() => {
    const bar = tabs.current;
    const tab = bar?.querySelector<HTMLElement>('[aria-current="page"]');
    if (bar && tab && bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: tab.offsetLeft - (bar.clientWidth - tab.clientWidth) / 2 });
    if (shown.current !== null && shown.current !== current) document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true });
    shown.current = current;
  }, [current]);

  return (
    <div className="min-h-dvh bg-layer-1 font-sans text-fg">
      <a href="#main" className="sr-only z-40 rounded-md bg-layer-2 px-4 py-2 text-100 font-bold text-accent-content shadow-(--shadow-elevated) focus:not-sr-only focus:fixed focus:top-3 focus:left-4">
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b-(length:--border-1) border-border bg-bg px-6 max-md:h-14 max-md:px-4">
        <Link href={home.href} aria-label={home.label} className={cx('-mx-2 flex h-(--size-control-m) items-center gap-3 rounded-md px-2 text-300 leading-tight', focusRing)}>
          <span className="font-bold text-fg-strong">{brand}</span>
          <span aria-hidden="true" className="h-5 w-px bg-border-strong" />
          <span className="text-fg-muted">{product}</span>
        </Link>
        {actions && <div className="ml-auto flex items-center gap-1">{actions}</div>}
      </header>
      <nav ref={tabs} aria-label={nav.label} className="sticky top-14 z-20 flex gap-6 overflow-x-auto border-b-(length:--border-1) border-border bg-bg px-4 [scrollbar-width:none] md:hidden">
        {nav.items.map((it) => <Tab key={it.href} item={it} isCurrent={it.href === current} />)}
      </nav>
      <div className="mx-auto flex w-full max-w-320 gap-10 px-6 pt-8 pb-16 max-md:px-4 max-md:pt-6">
        <nav aria-label={nav.label} className="sticky top-24 h-fit w-(--size-nav-max) shrink-0 max-md:hidden">
          <ul className="flex flex-col gap-1">
            {nav.items.map((it) => <li key={it.href}><SideNavLink item={it} isCurrent={it.href === current} /></li>)}
          </ul>
        </nav>
        <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">{children}</main>
      </div>
    </div>
  );
}

function SideNavLink({ item: { href, label, icon: Icon }, isCurrent }: { item: NavItem; isCurrent: boolean }) {
  return (
    <Link
      href={href}
      {...(isCurrent && { 'aria-current': 'page' as const })}
      className={cx(
        'relative flex min-h-(--size-control-m) items-center gap-2.5 rounded-md px-3 py-1 text-100 leading-tight text-fg data-[hovered]:bg-hover',
        isCurrent && 'bg-hover font-bold text-fg-strong',
        focusRing,
      )}
    >
      {isCurrent && <span aria-hidden="true" className="absolute top-1/2 left-1 h-(--size-nav-indicator) w-0.5 -translate-y-1/2 rounded-full bg-accent forced-colors:bg-[Highlight]" />}
      {Icon && <Icon size={18} aria-hidden="true" className="shrink-0" />}
      {label}
    </Link>
  );
}

// La copia invisible en negrita reserva el ancho.
function Tab({ item: { href, label }, isCurrent }: { item: NavItem; isCurrent: boolean }) {
  return (
    <Link
      href={href}
      {...(isCurrent && { 'aria-current': 'page' as const })}
      className={cx('relative grid h-12 shrink-0 items-center text-100 whitespace-nowrap', isCurrent ? 'font-bold text-fg-strong' : 'text-fg-muted data-[hovered]:text-fg-strong', focusRing, '-outline-offset-2')}
    >
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-bold">{label}</span>
      <span className="col-start-1 row-start-1">{label}</span>
      {isCurrent && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent forced-colors:bg-[Highlight]" />}
    </Link>
  );
}
