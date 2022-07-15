export type QueryParametar = {
  key: string;
  value: string;
};

export type clearReduce = {
  [key: string]: string | (string | null)[] | null;
};

export type Options = {
  exclude: string[];
};

export interface QState {
  [key: string]: string;
}
