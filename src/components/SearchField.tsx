import { Button, Input, SearchField as AriaSearchField, type SearchFieldProps as AriaSearchFieldProps } from 'react-aria-components';
import { Search, X } from 'lucide-react';

import { FieldLabel, fieldBox } from './Field';
import { cx } from './styles';

export interface SearchFieldProps extends Omit<AriaSearchFieldProps, 'className' | 'children'> {
  /** Sin label, pasar `aria-label`. */
  label?: string;
  placeholder?: string;
  className?: string;
}

export function SearchField({ label, placeholder, className, ...props }: SearchFieldProps) {
  return (
    <AriaSearchField {...props} className={cx('group flex flex-col', className)}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className={cx(fieldBox, 'rounded-full')}>
        <Search aria-hidden="true" size={16} className="ml-(--space-control-x) shrink-0 text-fg-muted" />
        <Input {...(placeholder !== undefined && { placeholder })} className="-my-(--border-2) h-[calc(100%+2*var(--border-2))] w-full min-w-0 bg-transparent px-2 outline-none placeholder:text-fg-muted [&::-webkit-search-cancel-button]:hidden" />
        {/* El objetivo ocupa todo el alto del campo. */}
        <Button aria-label="Borrar la búsqueda" className="group/clear -my-(--border-2) grid aspect-square h-[calc(100%+2*var(--border-2))] shrink-0 place-items-center text-fg-muted outline-none group-data-[empty]:hidden">
          <span className="grid size-6 place-items-center rounded-full group-data-[hovered]/clear:bg-hover"><X aria-hidden="true" size={14} /></span>
        </Button>
      </div>
    </AriaSearchField>
  );
}
