import { Button, Menu, MenuItem, MenuTrigger, Popover, Separator } from 'react-aria-components';
import { LayoutGrid } from 'lucide-react';

import { Avatar } from './Avatar';
import { cx, focusRing } from './styles';

const trigger = cx('grid size-(--size-control-l) place-items-center rounded-full text-fg-muted data-[hovered]:bg-hover data-[hovered]:text-fg-strong data-[pressed]:bg-hover touch:size-11', focusRing);
const popover = 'rounded-lg border-(length:--border-1) border-border bg-layer-2 shadow-(--shadow-elevated) outline-none';

export interface Product { id: string; name: string; href: string; logo: string }

export function ProductSwitcher({ products }: { products: Product[] }) {
  if (!products.length) return null;
  const columns = Math.min(3, products.length);
  return (
    <MenuTrigger>
      <Button aria-label="Ir a otro producto" className={trigger}><LayoutGrid aria-hidden="true" size={20} /></Button>
      <Popover placement="bottom end" offset={8} className={cx(popover, 'p-2')}>
        <Menu aria-label="Productos" style={{ gridTemplateColumns: `repeat(${columns}, 6.5rem)` }} className="grid gap-1 outline-none">
          {products.map((p) => (
            <MenuItem key={p.id} id={p.id} href={p.href} textValue={p.name} className="flex flex-col items-center gap-2 rounded-md px-2 pt-3 pb-2 text-100 text-fg-strong outline-none data-[focused]:bg-hover">
              <img src={p.logo} alt="" width={40} height={40} />
              <span className="max-w-full truncate">{p.name}</span>
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

export interface AccountAction { id: string; label: string; href?: string; onAction?: () => void; icon?: React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' }> }

// La cabecera dice quién es y no es una opción: va fuera del Menu.
export function AccountMenu({ name, email, actions }: { name: string; email?: string | undefined; actions: AccountAction[] }) {
  const last = actions.length - 1;
  return (
    <MenuTrigger>
      <Button aria-label={`Cuenta de ${name}`} className={cx('ml-1 grid place-items-center rounded-full', focusRing)}>
        <Avatar name={name} className="touch:size-11" />
      </Button>
      <Popover placement="bottom end" offset={8} className={cx(popover, 'w-80 max-w-[calc(100vw-2rem)]')}>
        <div className="flex items-center gap-3 border-b-(length:--border-1) border-border px-4 py-4">
          <Avatar name={name} size="l" />
          <div className="min-w-0">
            <p className="truncate text-200 font-bold text-fg-strong">{name}</p>
            {email && email !== name && <p className="truncate text-100 text-fg-muted">{email}</p>}
          </div>
        </div>
        <Menu aria-label={`Cuenta de ${name}`} className="p-1 outline-none" onAction={(k) => actions.find((a) => a.id === k)?.onAction?.()}>
          {actions.flatMap((a, i) => [
            ...(i === last && last > 0 ? [<Separator key="sep" className="my-1 h-px bg-border" />] : []),
            <MenuItem key={a.id} id={a.id} textValue={a.label} {...(a.href && { href: a.href })} className="flex min-h-(--size-control-m) items-center gap-2.5 rounded-md px-3 text-200 text-fg-strong outline-none data-[focused]:bg-hover">
              {a.icon && <a.icon size={18} aria-hidden="true" />}
              {a.label}
            </MenuItem>,
          ])}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
