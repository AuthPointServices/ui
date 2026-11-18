import { ProgressBar } from 'react-aria-components';

export function ProgressCircle({ size = 20, ...props }: { size?: number; 'aria-label': string }) {
  return (
    <ProgressBar isIndeterminate {...props} className="inline-flex">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </ProgressBar>
  );
}
