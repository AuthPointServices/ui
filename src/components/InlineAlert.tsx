import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';
import { Button } from 'react-aria-components';

import { cx, focusRing } from './styles';

export type AlertVariant = 'informative' | 'positive' | 'notice' | 'negative';

const LOOK: Record<AlertVariant, { box: string; icon: React.ReactNode }> = {
  informative: { box: 'border-informative-900', icon: <Info aria-hidden="true" size={20} className="text-informative-900" /> },
  positive: { box: 'border-positive-900', icon: <CircleCheck aria-hidden="true" size={20} className="text-positive-900" /> },
  notice: { box: 'border-notice-900', icon: <TriangleAlert aria-hidden="true" size={20} className="text-notice-900" /> },
  negative: { box: 'border-negative-900', icon: <CircleAlert aria-hidden="true" size={20} className="text-negative-900" /> },
};

export function InlineAlert({ variant = 'informative', title, children, action, onDismiss, className }: {
  variant?: AlertVariant;
  /** Sin título, la frase va en su lugar. */
  title?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}) {
  const { box, icon } = LOOK[variant];
  return (
    <div role={variant === 'negative' ? 'alert' : 'status'} className={cx('flex gap-3 rounded-lg border-(length:--border-2) bg-bg p-4', box, className)}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        {title && <p className="text-200 leading-tight font-bold text-fg-strong">{title}</p>}
        {children && <div className={cx('text-100 text-fg', title && 'mt-1')}>{children}</div>}
        {action && <div className="mt-3">{action}</div>}
      </div>
      {onDismiss && (
        <Button onPress={onDismiss} aria-label="Cerrar el aviso" className={cx('-my-1 -mr-1 grid size-8 shrink-0 place-items-center rounded-full text-fg-muted data-[hovered]:bg-hover data-[hovered]:text-fg-strong touch:size-11', focusRing)}>
          <X aria-hidden="true" size={16} />
        </Button>
      )}
    </div>
  );
}
