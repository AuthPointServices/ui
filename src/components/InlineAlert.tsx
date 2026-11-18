import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';

import { cx } from './styles';

export type AlertVariant = 'informative' | 'positive' | 'notice' | 'negative';

const LOOK: Record<AlertVariant, { box: string; icon: React.ReactNode }> = {
  informative: { box: 'border-informative-900', icon: <Info aria-hidden="true" size={20} className="text-informative-900" /> },
  positive: { box: 'border-positive-900', icon: <CircleCheck aria-hidden="true" size={20} className="text-positive-900" /> },
  notice: { box: 'border-notice-900', icon: <TriangleAlert aria-hidden="true" size={20} className="text-notice-900" /> },
  negative: { box: 'border-negative-900', icon: <CircleAlert aria-hidden="true" size={20} className="text-negative-900" /> },
};

export function InlineAlert({ variant = 'informative', title, children, action, className }: {
  variant?: AlertVariant;
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  const { box, icon } = LOOK[variant];
  return (
    <div role={variant === 'negative' ? 'alert' : 'status'} className={cx('flex gap-3 rounded-lg border-(length:--border-2) bg-bg p-4', box, className)}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-200 leading-tight font-bold text-fg-strong">{title}</p>
        {children && <div className="mt-1 text-100 text-fg">{children}</div>}
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
}
