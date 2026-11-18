export const focusRing = 'outline-none data-[focus-visible]:outline-(length:--focus-ring) data-[focus-visible]:outline-offset-(length:--focus-gap) data-[focus-visible]:outline-focus data-[focus-visible]:outline-solid';

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');
