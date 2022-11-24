export interface Breakpoints {
  keys: string[];
  values: BreakpointsValues;
  up: (key: string) => string;
  down: (key: string) => string;
  between: (key: string) => string;
  only: (key: string) => string;
  width: (key: string) => string;
  unit?: string;
  step?: number;
}

export interface BreakpointsValues {
  [key: string]: number;
}
