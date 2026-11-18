import {
  Cell as AriaCell, Collection, Column as AriaColumn, Row as AriaRow, Table as AriaTable, TableBody as AriaTableBody, TableHeader as AriaTableHeader, useTableOptions,
  type CellProps, type ColumnProps, type RowProps, type TableBodyProps, type TableHeaderProps, type TableProps,
} from 'react-aria-components';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { Checkbox } from './Checkbox';
import { StateMessage } from './StateMessage';
import { cx, focusRing } from './styles';

const ROW = { m: '[--row:var(--size-row-m)]', xl: '[--row:var(--size-row-xl)]' };

// table-fixed: las columnas no se mueven al cambiar los datos.
export function Table({ rows = 'm', ...props }: Omit<TableProps, 'className'> & { rows?: keyof typeof ROW }) {
  // relative: sin él, los inputs ocultos de las casillas ensanchan la página.
  return (
    <div className={cx('@container relative w-full overflow-x-auto', ROW[rows])}>
      <AriaTable {...props} className="w-full table-fixed border-separate border-spacing-0 text-100 outline-none" />
    </div>
  );
}

export function TableHeader<T extends object>({ columns, children, ...props }: Omit<TableHeaderProps<T>, 'className'>) {
  const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions();
  return (
    <AriaTableHeader {...props} className="text-left">
      {selectionBehavior === 'toggle' && selectionMode === 'multiple' && !allowsDragging && (
        <AriaColumn className="w-12 border-b-(length:--border-1) border-border-strong pl-3"><Checkbox slot="selection" /></AriaColumn>
      )}
      <Collection {...(columns && { items: columns })}>{children}</Collection>
    </AriaTableHeader>
  );
}

export function Column({ children, allowsSorting, className, ...props }: Omit<ColumnProps, 'className' | 'children'> & { children: React.ReactNode; className?: string }) {
  return (
    <AriaColumn
      {...props}
      allowsSorting={allowsSorting ?? false}
      className={cx('h-(--size-control-m) truncate border-b-(length:--border-1) border-border-strong px-3 text-75 font-bold text-fg-muted', allowsSorting && 'cursor-default data-[hovered]:text-fg-strong', focusRing, className)}
    >
      {({ sortDirection }) => (
        <span className="inline-flex items-center gap-1">
          {children}
          {allowsSorting && (sortDirection === 'ascending' ? <ArrowUp aria-hidden="true" size={14} className="text-fg-strong" />
            : sortDirection === 'descending' ? <ArrowDown aria-hidden="true" size={14} className="text-fg-strong" />
              : <ArrowUpDown aria-hidden="true" size={14} />)}
        </span>
      )}
    </AriaColumn>
  );
}

export function TableBody<T extends object>(props: Omit<TableBodyProps<T>, 'className'>) {
  return <AriaTableBody {...props} />;
}

export function Row<T extends object>({ columns, children, ...props }: Omit<RowProps<T>, 'className'>) {
  const { selectionBehavior, selectionMode } = useTableOptions();
  return (
    <AriaRow
      {...props}
      className={cx('group/row h-(--row) text-fg-strong data-[hovered]:bg-hover data-[selected]:bg-accent-subtle data-[selected]:data-[hovered]:bg-accent-subtle-hover', focusRing, '-outline-offset-2')}
    >
      {selectionBehavior === 'toggle' && selectionMode === 'multiple' && <Cell className="pl-3"><Checkbox slot="selection" /></Cell>}
      <Collection {...(columns && { items: columns })}>{children}</Collection>
    </AriaRow>
  );
}

export function Cell({ className, ...props }: Omit<CellProps, 'className'> & { className?: string }) {
  return <AriaCell {...props} className={cx('border-b-(length:--border-1) border-border px-3 py-2', focusRing, '-outline-offset-2', className)} />;
}

// Encoge en vez de ocultar: con display:none el colSpan del vacío no cuadra.
export const hideWhenNarrow = '@max-[40rem]:invisible @max-[40rem]:w-0 @max-[40rem]:overflow-hidden @max-[40rem]:p-0';

// sticky: centrado en lo visible aunque la tabla se desplace.
export function TableMessage(props: React.ComponentProps<typeof StateMessage>) {
  return <StateMessage {...props} className="sticky left-0 w-[100cqw]" />;
}

/** `narrowBars`: líneas que la fila sólo tiene en estrecho. `block`: una forma en vez de líneas (la casilla, el botón). */
export type SkeletonColumn = { className?: string; bars?: string[]; narrowBars?: string[]; block?: string };

export function TableSkeleton({ label, columns, rows = 5 }: { label: string; columns: SkeletonColumn[]; rows?: number }) {
  return (
    <div role="status">
      <span className="sr-only">{label}</span>
      <div aria-hidden="true">
        {Array.from({ length: rows }, (_, r) => (
          <div key={r} className="flex min-h-(--row) items-center border-b-(length:--border-1) border-border py-2">
            {columns.map((c, i) => (
              <span key={i} className={cx('flex shrink-0 flex-col px-3', c.className)}>
                {c.block && <span className={cx('bg-gray-100', c.block)} />}
                {/* Del alto de la línea real, para que la fila mida lo mismo. */}
                {[...(c.bars ?? []).map((w) => [w, '']), ...(c.narrowBars ?? []).map((w) => [w, 'hidden @max-[40rem]:flex'])].map(([w, only], l) => (
                  <span key={l} className={cx('flex h-[1lh] items-center', l ? 'text-75' : 'text-100', only)}>
                    <span className={cx('max-w-full rounded-full bg-gray-100', l ? 'h-2.5' : 'h-3', w)} />
                  </span>
                ))}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
