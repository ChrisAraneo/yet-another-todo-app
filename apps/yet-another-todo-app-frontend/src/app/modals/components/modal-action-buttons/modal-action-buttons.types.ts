export interface NextButton {
  click: (event?: any) => Promise<void>;
  color?: string;
  icon?: string;
  label?: string;
}

export interface BackButton {
  click: (event?: any) => Promise<void>;
  color?: string;
  icon?: string;
  label?: string;
}

export interface SubmitButton {
  label: string;
  click: (event?: any) => Promise<void>;
  color?: string;
  icon?: string;
}
