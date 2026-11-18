import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';

import { ProgressCircle } from './ProgressCircle';
import { cx, focusRing } from './styles';

export type ButtonVariant = 'accent' | 'secondary' | 'negative' | 'quiet';

const VARIANTS: Record<ButtonVariant, string> = {
  accent: 'bg-accent text-accent-fg data-[hovered]:bg-accent-hover data-[pressed]:bg-accent-down',
  secondary: 'border-(length:--border-2) border-border-strong bg-transparent text-fg-strong data-[hovered]:bg-hover',
  negative: 'bg-negative-bg text-negative-on data-[hovered]:bg-negative-bg-hover',
  quiet: 'bg-transparent text-fg-strong data-[hovered]:bg-hover',
};

export interface ButtonProps extends Omit<AriaButtonProps, 'className' | 'children'> {
  variant?: ButtonVariant;
  size?: 'm' | 'l';
  /** Necesita `aria-label`. */
  isIconOnly?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = 'secondary', size = 'm', isIconOnly = false, className, children, ...props }: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={cx(
        'relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-[background-color,color,border-color] duration-150',
        size === 'm' ? 'h-(--size-control-m) text-100' : 'h-(--size-control-l) text-200',
        isIconOnly ? (size === 'm' ? 'w-(--size-control-m)' : 'w-(--size-control-l)') : size === 'm' ? 'px-4' : 'px-5',
        VARIANTS[variant],
        'data-[disabled]:cursor-default data-[disabled]:border-transparent data-[disabled]:bg-gray-100 data-[disabled]:text-fg-disabled',
        'data-[pending]:cursor-progress',
        focusRing,
        className,
      )}
    >
      {({ isPending }) => (
        <>
          {/* opacity y no visibility: conserva el ancho y el nombre accesible. */}
          <span className={cx('inline-flex items-center gap-2', isPending && 'opacity-0')}>{children}</span>
          {isPending && <span className="absolute inset-0 grid place-items-center"><ProgressCircle aria-label="Un momento" size={16} /></span>}
        </>
      )}
    </AriaButton>
  );
}
