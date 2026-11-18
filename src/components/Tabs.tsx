import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs, type TabListProps, type TabPanelProps, type TabProps, type TabsProps } from 'react-aria-components';

import { cx, focusRing } from './styles';

export function Tabs(props: Omit<TabsProps, 'className'>) {
  return <AriaTabs {...props} className="flex flex-col" />;
}

export function TabList<T extends object>(props: Omit<TabListProps<T>, 'className'>) {
  return <AriaTabList {...props} className="flex gap-6 overflow-x-auto border-b-(length:--border-2) border-border" />;
}

export function Tab(props: Omit<TabProps, 'className'>) {
  return (
    <AriaTab
      {...props}
      className={cx(
        'relative -mb-0.5 flex h-(--size-tab) cursor-default items-center text-200 font-bold whitespace-nowrap text-fg-muted transition-colors duration-150',
        'data-[hovered]:text-fg-strong data-[selected]:text-fg-strong data-[disabled]:text-fg-disabled',
        'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-transparent data-[selected]:after:bg-accent',
        focusRing,
      )}
    />
  );
}

export function TabPanel(props: Omit<TabPanelProps, 'className'>) {
  return <AriaTabPanel {...props} className={cx('pt-6', focusRing)} />;
}
