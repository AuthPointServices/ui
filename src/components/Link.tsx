import { Link as AriaLink, type LinkProps as AriaLinkProps } from 'react-aria-components';

import { cx, focusRing } from './styles';

export interface LinkProps extends Omit<AriaLinkProps, 'className'> {
  className?: string;
  /** Fuera de una frase: sin subrayado hasta el hover. */
  standalone?: boolean;
}

export function Link({ className, standalone = false, ...props }: LinkProps) {
  return (
    <AriaLink
      {...props}
      className={cx(
        'rounded-sm font-medium text-accent-content underline-offset-2 data-[hovered]:underline',
        standalone ? 'no-underline' : 'underline',
        focusRing,
        className,
      )}
    />
  );
}
