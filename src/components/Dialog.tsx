import { Dialog as AriaDialog, Heading, Modal, ModalOverlay, type ModalOverlayProps } from 'react-aria-components';

import { Button } from './Button';
import { cx } from './styles';

// Anclado arriba: si el contenido crece, el título no se mueve.
const overlay = 'fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/40 px-4 pt-[min(12vh,96px)] pb-4 data-[entering]:animate-[fade-in_150ms] data-[exiting]:animate-[fade-in_100ms_reverse]';
const panel = 'w-full rounded-lg bg-layer-2 shadow-(--shadow-elevated) outline-none';

export function Dialog({ title, children, footer, size = 'm', ...props }: Omit<ModalOverlayProps, 'children' | 'className'> & {
  title: string;
  children: React.ReactNode;
  footer?: (close: () => void) => React.ReactNode;
  size?: 's' | 'm' | 'l';
}) {
  return (
    <ModalOverlay isDismissable {...props} className={overlay}>
      <Modal className={cx(panel, { s: 'max-w-100', m: 'max-w-120', l: 'max-w-180' }[size])}>
        <AriaDialog className="flex max-h-[calc(100dvh-min(12vh,96px)-1rem)] flex-col outline-none">
          {({ close }) => (
            <>
              <Heading slot="title" className="px-8 pt-8 text-500 leading-tight font-bold text-fg-strong max-sm:px-6 max-sm:pt-6">{title}</Heading>
              <div className="min-h-0 flex-1 overflow-y-auto px-8 pt-4 pb-2 text-200 text-fg max-sm:px-6">{children}</div>
              {footer && <div data-dialog-footer className="flex flex-wrap justify-end gap-3 px-8 pt-4 pb-8 max-sm:px-6 max-sm:pb-6">{footer(close)}</div>}
            </>
          )}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}

export function AlertDialog({ title, children, confirm, variant = 'negative', isPending = false, error, onConfirm, ...props }: Omit<ModalOverlayProps, 'children' | 'className'> & {
  title: string;
  children: React.ReactNode;
  confirm: string;
  variant?: 'negative' | 'accent';
  isPending?: boolean;
  error?: string | undefined;
  onConfirm: () => void;
}) {
  return (
    <ModalOverlay {...props} isDismissable={!isPending} isKeyboardDismissDisabled={isPending} className={overlay}>
      <Modal className={cx(panel, 'max-w-120')}>
        <AriaDialog role="alertdialog" className="flex flex-col outline-none">
          {({ close }) => (
            <>
              <Heading slot="title" className="px-8 pt-8 text-500 leading-tight font-bold text-fg-strong">{title}</Heading>
              <div className="px-8 pt-4 text-200 text-fg">{children}</div>
              {error && <p role="alert" className="px-8 pt-3 text-100 font-medium text-negative-900">{error}</p>}
              <div data-dialog-footer className="flex flex-wrap justify-end gap-3 px-8 pt-6 pb-8">
                <Button variant="secondary" isDisabled={isPending} onPress={close}>Cancelar</Button>
                <Button variant={variant} isPending={isPending} onPress={onConfirm} autoFocus={variant === 'accent'}>{confirm}</Button>
              </div>
            </>
          )}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}
