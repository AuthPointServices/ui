import { Tooltip as AriaTooltip, TooltipTrigger } from 'react-aria-components';

export function Tooltip({ text, children }: { text: string; children: React.ReactElement }) {
  return (
    <TooltipTrigger delay={600}>
      {children}
      <AriaTooltip offset={6} className="max-w-(--size-tooltip-max) rounded-md bg-gray-800 px-2.5 py-1 text-75 text-gray-50 shadow-(--shadow-elevated)">{text}</AriaTooltip>
    </TooltipTrigger>
  );
}
