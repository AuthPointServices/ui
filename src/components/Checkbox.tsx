import {
  Checkbox as AriaCheckbox, CheckboxGroup as AriaCheckboxGroup, type CheckboxGroupProps as AriaCheckboxGroupProps, type CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components';
import { Check, Minus } from 'lucide-react';

import { FieldHelp, FieldLabel } from './Field';
import { cx } from './styles';

export interface CheckboxProps extends Omit<AriaCheckboxProps, 'className' | 'children'> {
  children?: React.ReactNode;
  className?: string;
}

export function Checkbox({ children, className, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox {...props} className={cx('group inline-flex min-h-6 min-w-6 cursor-default items-center gap-2.5 text-200 text-fg-strong data-[disabled]:text-fg-muted touch:min-h-11 touch:min-w-11', className)}>
      {({ isSelected, isIndeterminate }) => (
        <>
          <span className={cx(
            'grid size-(--size-checkbox) shrink-0 place-items-center rounded-sm border-(length:--border-2) transition-colors duration-150',
            isSelected || isIndeterminate ? 'border-accent bg-accent text-accent-fg group-data-[hovered]:border-accent-hover group-data-[hovered]:bg-accent-hover' : 'border-field-border group-data-[hovered]:border-gray-800',
            'group-data-[invalid]:border-negative-900 group-data-[disabled]:border-gray-400',
            // Marcada e inactiva sigue rellena, o no se distingue de una sin marcar.
            isSelected || isIndeterminate ? 'group-data-[disabled]:bg-gray-400' : 'group-data-[disabled]:bg-transparent',
            'group-data-[focus-visible]:outline-(length:--focus-ring) group-data-[focus-visible]:outline-offset-(length:--focus-gap) group-data-[focus-visible]:outline-solid group-data-[focus-visible]:outline-focus',
          )}>
            {isIndeterminate ? <Minus aria-hidden="true" size={12} strokeWidth={3} /> : isSelected && <Check aria-hidden="true" size={12} strokeWidth={3} />}
          </span>
          {children}
        </>
      )}
    </AriaCheckbox>
  );
}

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'className' | 'children'> {
  label: string;
  description?: string;
  errorMessage?: string;
  children: React.ReactNode;
  className?: string;
}

export function CheckboxGroup({ label, description, errorMessage, children, className, ...props }: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup {...props} className={cx('flex flex-col', className)}>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-col">{children}</div>
      <FieldHelp description={description} errorMessage={errorMessage} />
    </AriaCheckboxGroup>
  );
}
