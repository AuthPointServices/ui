import { Switch as AriaSwitch, type SwitchProps as AriaSwitchProps } from 'react-aria-components';

import { cx } from './styles';

export interface SwitchProps extends Omit<AriaSwitchProps, 'className' | 'children'> {
  children: React.ReactNode;
  className?: string;
}

export function Switch({ children, className, ...props }: SwitchProps) {
  return (
    <AriaSwitch {...props} className={cx('group inline-flex min-h-6 cursor-default items-center gap-2.5 text-200 text-fg-strong data-[disabled]:text-fg-disabled touch:min-h-11', className)}>
      <span className={cx(
        'relative inline-flex h-(--size-switch-h) w-(--size-switch-w) shrink-0 items-center rounded-full border-(length:--border-2) border-gray-800 transition-colors duration-150',
        'group-data-[selected]:border-accent group-data-[selected]:bg-accent group-data-[disabled]:border-gray-400',
        'group-data-[focus-visible]:outline-(length:--focus-ring) group-data-[focus-visible]:outline-offset-(length:--focus-gap) group-data-[focus-visible]:outline-solid group-data-[focus-visible]:outline-focus',
      )}>
        <span className="absolute left-0.5 size-[calc(var(--size-switch-h)-8px)] rounded-full bg-gray-800 transition-transform duration-150 group-data-[selected]:translate-x-[calc(var(--size-switch-w)-var(--size-switch-h))] group-data-[selected]:bg-white group-data-[disabled]:bg-gray-400" />
      </span>
      {children}
    </AriaSwitch>
  );
}
