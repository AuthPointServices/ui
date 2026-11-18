import { cx } from './styles';

export function Avatar({ name, size = 'm', className }: { name: string; size?: 's' | 'm' | 'l' | 'xl'; className?: string }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || '?';
  return (
    <span aria-hidden="true" className={cx('grid shrink-0 place-items-center rounded-full bg-accent-subtle font-bold text-accent-content', { s: 'size-6 text-75', m: 'size-8 text-100', l: 'size-12 text-300', xl: 'size-16 text-500' }[size], className)}>
      {initials}
    </span>
  );
}
