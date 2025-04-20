export type NavigationItem = {
  icon: string;
  label: string;
  active: boolean;
  click: (() => void) | (() => Promise<void>);
};
