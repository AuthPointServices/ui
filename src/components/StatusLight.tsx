import { cx } from './styles';

export type Status = 'positive' | 'notice' | 'negative' | 'informative' | 'neutral';

const DOT: Record<Status, string> = {
  positive: 'bg-positive-800', notice: 'bg-notice-800', negative: 'bg-negative-800', informative: 'bg-informative-800', neutral: 'bg-gray-600',
};

// Sin status queda el hueco del punto, para que la columna se alinee.
export function StatusLight({ status, size = 'm', children, className }: { status?: Status | undefined; size?: 's' | 'm'; children: React.ReactNode; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-2 text-fg', size === 's' ? 'text-75' : 'text-100', className)}>
      <span aria-hidden="true" className={cx('size-(--size-status-dot) shrink-0 rounded-full', status && DOT[status])} />
      {children}
    </span>
  );
}

const BOLD: Record<Status, string> = {
  positive: 'bg-positive-bg text-positive-on', notice: 'bg-notice-bg text-notice-on', negative: 'bg-negative-bg text-negative-on',
  informative: 'bg-informative-bg text-informative-on', neutral: 'bg-neutral-bg text-neutral-on',
};
const SUBTLE: Record<Status, string> = {
  positive: 'bg-positive-100 text-positive-1000', notice: 'bg-notice-100 text-notice-1000', negative: 'bg-negative-100 text-negative-1000',
  informative: 'bg-informative-100 text-informative-1000', neutral: 'bg-gray-100 text-fg',
};

// subtle para un estado que acompaña a un dato («Esta sesión»); bold para el que pide atención.
export function Badge({ status = 'neutral', fill = 'bold', children }: { status?: Status; fill?: 'bold' | 'subtle'; children: React.ReactNode }) {
  return (
    <span className={cx('inline-flex h-6 items-center rounded-sm px-2 text-75 font-bold whitespace-nowrap forced-colors:border forced-colors:border-[CanvasText]', (fill === 'subtle' ? SUBTLE : BOLD)[status])}>
      {children}
    </span>
  );
}
