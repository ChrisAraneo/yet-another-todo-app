export type NextButton = {
  click: (event?: any) => Promise<void>;

  color?: string;
  icon?: string;
  label?: string;
};

export type BackButton = {
  click: (event?: any) => Promise<void>;
  color?: string;
  icon?: string;
  label?: string;
};

export type SubmitButton = {
  label: string;
  click: (event?: any) => Promise<void>;
  color?: string;
  icon?: string;
};

/* TODO REMOVE */
export type CancelButton = {
  label: string;
  click: (() => Promise<void>) | (() => void);
};
