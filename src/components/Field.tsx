import { useContext } from 'react';
import { FieldError, FieldErrorContext, Label, Text } from 'react-aria-components';
import { CircleAlert } from 'lucide-react';

import { cx } from './styles';

// «(opcional)» y no un asterisco, que el lector no anuncia bien.
export function FieldLabel({ children, optional }: { children: React.ReactNode; optional?: boolean | undefined }) {
  return (
    <Label className="mb-1 block text-100 leading-tight font-medium text-fg-muted">
      {children}
      {optional && <span className="font-normal"> (opcional)</span>}
    </Label>
  );
}

export function FieldDescription({ children }: { children: React.ReactNode }) {
  return <Text slot="description" className="mt-1 block text-75 leading-tight text-fg-muted">{children}</Text>;
}

export function FieldErrorText({ children }: { children?: React.ReactNode }) {
  return (
    <FieldError className="mt-1 flex items-start gap-1.5 text-75 leading-tight text-negative-900">
      <CircleAlert aria-hidden="true" size={14} className="mt-px shrink-0" />
      <span>{children}</span>
    </FieldError>
  );
}

// El error ocupa el sitio de la ayuda: el campo de abajo no se mueve.
export function FieldHelp({ description, errorMessage }: { description?: string | undefined; errorMessage?: string | undefined }) {
  const invalid = useContext(FieldErrorContext)?.isInvalid ?? false;
  return (
    <>
      {description && !invalid && <FieldDescription>{description}</FieldDescription>}
      <FieldErrorText>{errorMessage}</FieldErrorText>
    </>
  );
}

/** Un <input> nativo con la caja de un campo, para formularios que envía el navegador; el alto lo pone quien lo usa. */
export const nativeInputClass = cx(
  'w-full min-w-0 rounded-md border-(length:--border-2) border-field-border bg-bg px-(--space-control-x) text-200 text-fg-strong placeholder:text-fg-muted',
  'transition-[border-color] duration-150 hover:border-gray-700',
  'outline-none focus-visible:outline-(length:--focus-ring) focus-visible:outline-offset-(length:--focus-gap) focus-visible:outline-solid focus-visible:outline-focus',
  'aria-invalid:border-negative-900 aria-invalid:hover:border-negative-900 disabled:border-gray-200 disabled:text-fg-disabled',
);

/** Un <input type="radio"> nativo con el círculo de Spectrum: marcado, el borde del acento se ensancha hacia el centro. */
export const nativeRadioClass = cx(
  'size-(--size-checkbox) shrink-0 cursor-pointer appearance-none rounded-full border-(length:--border-2) border-field-border bg-bg',
  'transition-[border-color,border-width] duration-150 hover:border-gray-800 checked:border-[5px] checked:border-accent checked:hover:border-accent-hover',
  'outline-none focus-visible:outline-(length:--focus-ring) focus-visible:outline-offset-(length:--focus-gap) focus-visible:outline-solid focus-visible:outline-focus',
  'disabled:cursor-default disabled:border-gray-400',
);

// Sin radio: lo pone cada campo.
export const fieldBox = cx(
  'flex h-(--size-control-m) w-full min-w-0 items-center border-(length:--border-2) border-field-border bg-bg text-200 text-fg-strong',
  'transition-[border-color] duration-150 hover:border-gray-700',
  'has-[[data-focus-visible]]:outline-(length:--focus-ring) has-[[data-focus-visible]]:outline-offset-(length:--focus-gap) has-[[data-focus-visible]]:outline-solid has-[[data-focus-visible]]:outline-focus',
  'group-data-[invalid]:border-negative-900 group-data-[disabled]:border-gray-200 group-data-[disabled]:text-fg-disabled',
);
