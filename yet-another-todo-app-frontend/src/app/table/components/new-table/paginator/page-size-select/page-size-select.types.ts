export type Option<T> = {
  label: string;
  value: T;
};

export type DisplayedOption<T> = {
  label: string;
  value: T;
  symbols: string[];
  highlight: {
    start: number;
    end: number;
  };
};
