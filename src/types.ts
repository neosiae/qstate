export type QueryParametar = {
  key: string;
  value: string;
};

export type Options = {
  exclude: string[];
};

export interface QState {
  [key: string]: string;
}
