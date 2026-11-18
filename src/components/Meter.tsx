import { Label, Meter as AriaMeter, useLocale } from 'react-aria-components';

import { cx } from './styles';

export function SeatMeter({ label, used, total, className }: { label: string; used: number; total: number; className?: string }) {
  const { locale } = useLocale();
  // «1500» bajo «12.040» parece un error.
  const n = new Intl.NumberFormat(locale, { useGrouping: 'always' });
  const free = Math.max(total - used, 0);
  const full = free === 0;
  const freeText = `${n.format(free)} ${free === 1 ? 'libre' : 'libres'}`;
  const ofText = ` de ${n.format(total)}`;
  // Ni vacía con ocupados ni llena con libres.
  const width = used <= 0 ? '0%' : full ? '100%' : `clamp(var(--size-meter-l), ${(used / total) * 100}%, calc(100% - var(--size-meter-l)))`;
  return (
    <AriaMeter value={used} minValue={0} maxValue={Math.max(total, 1)} valueLabel={freeText + ofText} className={cx('flex flex-col gap-2', className)}>
      <div className="flex items-baseline justify-between gap-4 text-100">
        <Label className="min-w-0 truncate font-medium text-fg-strong"><span className="sr-only">Puestos de</span> {label}</Label>
        <span className="shrink-0 whitespace-nowrap tabular-nums">
          <span className="font-medium text-fg-strong">{freeText}</span>
          <span className="text-fg">{ofText}</span>
        </span>
      </div>
      <span className="block h-(--size-meter-l) overflow-hidden rounded-full bg-track forced-colors:border forced-colors:border-[CanvasText]">
        <span
          className={cx('block h-full rounded-full transition-[width] duration-300 forced-colors:bg-[Highlight]', full ? 'bg-notice-visual' : 'bg-accent-visual')}
          style={{ width }}
        />
      </span>
    </AriaMeter>
  );
}
