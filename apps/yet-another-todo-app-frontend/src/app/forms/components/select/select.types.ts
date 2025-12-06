export interface Option<T> {
  label: string;
  value: T;
}

export interface DisplayedOption<T> {
  label: string;
  value: T;
  symbols: string[];
  highlight: {
    start: number;
    end: number;
  };
}
