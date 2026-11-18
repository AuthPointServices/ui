import { ToggleButton, ToggleButtonGroup, type Key } from 'react-aria-components';

import { cx, focusRing } from './styles';

export interface Segment<K extends Key> { id: K; label: string }

// Para filtrar la misma vista; si cambia de contenido, Tabs.
export function SegmentedControl<K extends Key>({ label, items, selected, onChange, className }: {
  label: string;
  items: Segment<K>[];
  selected: K;
  onChange: (id: K) => void;
  className?: string;
}) {
  return (
    <ToggleButtonGroup
      aria-label={label}
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[selected]}
      onSelectionChange={(keys) => { const k = [...keys][0]; if (k !== undefined) onChange(k as K); }}
      className={cx('inline-flex rounded-full bg-gray-100 p-0.5', className)}
    >
      {items.map((it) => (
        <ToggleButton
          key={it.id}
          id={it.id}
          className={cx(
            'grid h-[calc(var(--size-control-m)-4px)] items-center rounded-full px-4 text-100 font-medium text-fg data-[hovered]:text-fg-strong',
            'data-[selected]:bg-layer-2 data-[selected]:font-bold data-[selected]:text-fg-strong data-[selected]:shadow-(--shadow-emphasized) forced-colors:data-[selected]:outline-2',
            focusRing,
          )}
        >
          {/* La copia invisible en negrita reserva el ancho. */}
          <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-bold">{it.label}</span>
          <span className="col-start-1 row-start-1 text-center">{it.label}</span>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
