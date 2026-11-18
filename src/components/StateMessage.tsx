import { CircleAlert } from 'lucide-react';

import { cx } from './styles';

export function StateMessage({ title, children, action, negative = false, className }: {
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  negative?: boolean;
  className?: string;
}) {
  return (
    <div role={negative ? 'alert' : undefined} className={cx('flex flex-col items-center gap-2 px-4 pt-8 text-center', action ? 'pb-10' : 'pb-8', className)}>
      {negative && <CircleAlert aria-hidden="true" size={20} className="text-negative-900" />}
      <p className="text-200 leading-tight font-bold text-balance text-fg-strong">{title}</p>
      {children && <p className="max-w-[56ch] text-100 text-pretty text-fg-muted">{children}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
