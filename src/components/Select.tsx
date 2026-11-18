import { Button, ListBox, ListBoxItem, Popover, Select as AriaSelect, SelectValue, type Key, type SelectProps as AriaSelectProps } from 'react-aria-components';
import { Check, ChevronDown } from 'lucide-react';

import { FieldHelp, FieldLabel, fieldBox } from './Field';
import { cx, focusRing } from './styles';

export interface SelectOption { id: Key; label: string; description?: string }

export interface SelectProps<T extends SelectOption> extends Omit<AriaSelectProps<T>, 'className' | 'children' | 'items'> {
  label: string;
  items: T[];
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
}

export function Select<T extends SelectOption>({ label, items, description, errorMessage, placeholder = 'Elige una opción', className, ...props }: SelectProps<T>) {
  return (
    <AriaSelect {...props} placeholder={placeholder} className={cx('group flex flex-col', className)}>
      <FieldLabel>{label}</FieldLabel>
      <Button className={cx(fieldBox, 'cursor-default justify-between gap-2 rounded-md px-(--space-control-x) text-left', focusRing)}>
        <SelectValue className="min-w-0 truncate data-[placeholder]:text-fg-muted">
          {({ isPlaceholder, selectedText, defaultChildren }) => (isPlaceholder ? defaultChildren : selectedText)}
        </SelectValue>
        <ChevronDown aria-hidden="true" size={16} className="shrink-0 text-fg-muted" />
      </Button>
      <FieldHelp description={description} errorMessage={errorMessage} />
      <Popover className="min-w-(--trigger-width) rounded-md border-(length:--border-1) border-border bg-layer-2 p-1 shadow-(--shadow-elevated) outline-none">
        <ListBox items={items} className="max-h-80 overflow-auto outline-none">
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.label} className="group/item flex cursor-default items-start gap-2 rounded-sm px-3 py-1.5 text-200 text-fg-strong outline-none data-[focused]:bg-hover data-[disabled]:text-fg-disabled">
              <span className="min-w-0 flex-1">
                <span className="block">{item.label}</span>
                {item.description && <span className="block text-75 text-fg-muted">{item.description}</span>}
              </span>
              <Check aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-accent-content opacity-0 group-data-[selected]/item:opacity-100" />
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
