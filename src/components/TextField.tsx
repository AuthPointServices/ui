import { Input, TextField as AriaTextField, type TextFieldProps as AriaTextFieldProps } from 'react-aria-components';

import { FieldHelp, FieldLabel, fieldBox } from './Field';
import { cx } from './styles';

export interface TextFieldProps extends Omit<AriaTextFieldProps, 'className' | 'children'> {
  label: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  optional?: boolean;
  className?: string;
}

export function TextField({ label, description, errorMessage, placeholder, optional, className, ...props }: TextFieldProps) {
  return (
    <AriaTextField {...props} className={cx('group flex flex-col', className)}>
      <FieldLabel optional={optional}>{label}</FieldLabel>
      <div className={cx(fieldBox, 'rounded-md')}>
        <Input {...(placeholder !== undefined && { placeholder })} className="-my-(--border-2) h-[calc(100%+2*var(--border-2))] w-full min-w-0 bg-transparent px-(--space-control-x) outline-none placeholder:text-fg-muted" />
      </div>
      <FieldHelp description={description} errorMessage={errorMessage} />
    </AriaTextField>
  );
}
