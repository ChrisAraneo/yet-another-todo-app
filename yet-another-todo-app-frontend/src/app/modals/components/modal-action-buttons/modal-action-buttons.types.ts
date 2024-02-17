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
