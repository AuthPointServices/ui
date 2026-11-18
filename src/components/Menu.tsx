import { Menu as AriaMenu, MenuItem, MenuTrigger, Popover, Separator } from 'react-aria-components';
import { Ellipsis } from 'lucide-react';

import { Button } from './Button';
import { cx } from './styles';

export interface MenuAction { id: string; label: string; icon?: React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>; negative?: boolean; isDisabled?: boolean; separatorBefore?: boolean }

const item = 'flex cursor-default items-center gap-2.5 rounded-sm px-3 py-1.5 text-200 outline-none data-[focused]:bg-hover data-[disabled]:text-fg-disabled';

export function ActionMenu({ label, actions, onAction, trigger, placement = 'bottom end' }: {
  label: string;
  actions: MenuAction[];
  onAction: (id: string) => void;
  trigger?: React.ReactNode;
  placement?: 'bottom start' | 'bottom end';
}) {
  return (
    <MenuTrigger>
      {trigger ?? <Button variant="quiet" isIconOnly aria-label={label}><Ellipsis aria-hidden="true" size={18} /></Button>}
      <Popover placement={placement} className="min-w-44 rounded-md border-(length:--border-1) border-border bg-layer-2 p-1 shadow-(--shadow-elevated) outline-none">
        <AriaMenu aria-label={label} onAction={(k) => onAction(String(k))} className="outline-none">
          {actions.flatMap((a) => [
            ...(a.separatorBefore ? [<Separator key={`${a.id}-sep`} className="my-1 h-px bg-border" />] : []),
            <MenuItem key={a.id} id={a.id} isDisabled={a.isDisabled ?? false} textValue={a.label} className={cx(item, a.negative ? 'text-negative-900' : 'text-fg-strong')}>
              {a.icon && <a.icon size={16} aria-hidden />}
              {a.label}
            </MenuItem>,
          ])}
        </AriaMenu>
      </Popover>
    </MenuTrigger>
  );
}
