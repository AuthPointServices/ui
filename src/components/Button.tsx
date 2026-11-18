import { Button as AriaButton, Link as AriaLink, type ButtonProps as AriaButtonProps, type LinkProps as AriaLinkProps } from 'react-aria-components';

import { ProgressCircle } from './ProgressCircle';
import { cx, focusRing } from './styles';

export type ButtonVariant = 'accent' | 'secondary' | 'negative' | 'quiet';

const FILL: Record<ButtonVariant, string> = {
  accent: 'bg-accent text-accent-fg data-[hovered]:bg-accent-hover data-[pressed]:bg-accent-down forced-colors:border-(length:--border-2) forced-colors:border-[ButtonText]',
  secondary: 'border-(length:--border-2) border-border-strong bg-transparent text-fg-strong data-[hovered]:bg-hover',
  negative: 'bg-negative-bg text-negative-on data-[hovered]:bg-negative-bg-hover forced-colors:border-(length:--border-2) forced-colors:border-[ButtonText]',
  quiet: 'bg-transparent text-fg-strong data-[hovered]:bg-hover',
};
const OUTLINE: Partial<Record<ButtonVariant, string>> = {
  accent: 'border-(length:--border-2) border-accent bg-transparent text-accent-content data-[hovered]:bg-accent-subtle',
  negative: 'border-(length:--border-2) border-negative-900 bg-transparent text-negative-900 data-[hovered]:bg-negative-100',
};

type Look = { variant?: ButtonVariant | undefined; fillStyle?: 'fill' | 'outline' | undefined; size?: 'm' | 'l' | undefined; isIconOnly?: boolean | undefined };

const look = ({ variant = 'secondary', fillStyle = 'fill', size = 'm', isIconOnly = false }: Look) => cx(
  'relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-[background-color,color,border-color] duration-150',
  size === 'm' ? 'h-(--size-control-m) text-100' : 'h-(--size-control-l) text-200',
  isIconOnly ? (size === 'm' ? 'w-(--size-control-m)' : 'w-(--size-control-l)') : size === 'm' ? 'px-4' : 'px-5',
  (fillStyle === 'outline' && OUTLINE[variant]) || FILL[variant],
  'data-[disabled]:cursor-default data-[disabled]:border-transparent data-[disabled]:bg-gray-100 data-[disabled]:text-fg-disabled',
  'data-[pending]:cursor-progress',
  focusRing,
);

// Los estados de react-aria son data-*; un elemento nativo los tiene como pseudoclases.
const NATIVE: [string, string][] = [['data-[hovered]:', 'hover:'], ['data-[pressed]:', 'active:'], ['data-[focus-visible]:', 'focus-visible:'], ['data-[disabled]:', 'disabled:'], ['data-[pending]:', 'aria-disabled:']];

/** Las clases de un botón para un <button> o un <a> nativo: formularios que envía el navegador, como los de Keycloak. */
export const nativeButtonClass = (l: Look = {}) => NATIVE.reduce((s, [a, b]) => s.replaceAll(a, b), look(l));

export interface ButtonProps extends Omit<AriaButtonProps, 'className' | 'children'>, Look {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({ variant, fillStyle, size, isIconOnly, className, children, ...props }: ButtonProps) {
  return (
    <AriaButton {...props} className={cx(look({ variant, fillStyle, size, isIconOnly }), className)}>
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

export interface LinkButtonProps extends Omit<AriaLinkProps, 'className' | 'children'>, Omit<Look, 'isIconOnly'> {
  children: React.ReactNode;
  className?: string;
}

// Navega, no hace: un enlace con la forma de un botón.
export function LinkButton({ variant, fillStyle, size, className, ...props }: LinkButtonProps) {
  return <AriaLink {...props} className={cx(look({ variant, fillStyle, size }), className)} />;
}
