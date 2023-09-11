export type SubmitButton = {
  label: string;
  click: (event?: any) => Promise<void>;
  color?: string;
  icon?: string;
};

export type CancelButton = {
  label: string;
  click: (() => Promise<void>) | (() => void);
};
