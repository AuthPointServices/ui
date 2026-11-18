// UNSTABLE_ en react-aria: versión fija y sólo se usa aquí.
import { UNSTABLE_Toast as AriaToast, UNSTABLE_ToastContent as ToastContent, UNSTABLE_ToastQueue as ToastQueue, UNSTABLE_ToastRegion as ToastRegion, Button, Text } from 'react-aria-components';
import { CircleAlert, CircleCheck, Info, X } from 'lucide-react';
import { flushSync } from 'react-dom';

import { cx, focusRing } from './styles';

export interface ToastData { message: string; variant?: 'positive' | 'negative' | 'neutral' }

export const toasts = new ToastQueue<ToastData>({
  wrapUpdate: (fn) => { if ('startViewTransition' in document) document.startViewTransition(() => flushSync(fn)); else fn(); },
});

const ICON = { positive: CircleCheck, negative: CircleAlert, neutral: Info };
const LOOK = { positive: 'bg-positive-bg text-positive-on', negative: 'bg-negative-bg text-negative-on', neutral: 'bg-neutral-bg text-neutral-on' };

export function Toasts() {
  return (
    <ToastRegion queue={toasts} className="fixed right-4 bottom-4 z-50 flex flex-col-reverse gap-2 outline-none max-sm:left-4">
      {({ toast }) => {
        const variant = toast.content.variant ?? 'neutral';
        const Icon = ICON[variant];
        return (
          <AriaToast toast={toast} style={{ viewTransitionName: toast.key }} className={cx('flex min-h-(--size-toast) max-w-(--size-toast-max) items-center gap-3 rounded-md py-2 pr-2 pl-4 shadow-(--shadow-elevated) max-sm:max-w-none', LOOK[variant], focusRing)}>
            <Icon aria-hidden="true" size={20} className="shrink-0" />
            <ToastContent className="min-w-0 flex-1"><Text slot="title" className="text-100 font-medium">{toast.content.message}</Text></ToastContent>
            <Button slot="close" aria-label="Cerrar el aviso" className={cx('grid size-8 shrink-0 place-items-center rounded-full hover:bg-current/15', focusRing)}>
              <X aria-hidden="true" size={16} />
            </Button>
          </AriaToast>
        );
      }}
    </ToastRegion>
  );
}
