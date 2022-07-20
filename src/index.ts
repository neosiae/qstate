import queryString, { ParsedQuery } from 'query-string';
import { clearReduce, Options, QueryParametar } from './types';
import { isQPdefined, isExcluded, updateQueryString } from './utils';

export const save = (qp: QueryParametar): void => {
  if (qp == null)
    throw new Error(
      'QueryParametar should not be empty. Please pass a valid object.',
    );

  const params = new URLSearchParams(window.location.search);

  params.set(qp.key, qp.value);

  updateQueryString(params.toString());
};

export const clear = (ref: HTMLElement): void => {
  if (ref == null)
    throw new Error('Reference is not defined. Please pass a valid reference.');

  const form = ref as HTMLFormElement;
  const names = Array.from(form.elements).map((element) =>
    element.getAttribute('name'),
  );

  const qs = queryString.parse(document.location.search);

  const clearState = (
    accumulator: clearReduce,
    [key, value]: [string, string | (string | null)[] | null],
  ) => {
    if (!names.includes(key)) accumulator[key] = value;

    return accumulator;
  };

  const initialQs = Object.entries(qs).reduce<clearReduce>(clearState, {});

  updateQueryString(queryString.stringify(initialQs));
};

export const trackForm = (
  ref: HTMLElement,
  options?: Options,
): [() => void, () => void] => {
  if (ref == null)
    throw new Error('Reference is not defined. Please pass a valid reference.');

  const form = ref as HTMLFormElement;

  const handler = (event: Event): void => {
    const { name: key, value } = event.target as HTMLFormElement;

    if (isExcluded(key, options)) return;

    if (isQPdefined({ key, value })) save({ key, value });
  };

  form.addEventListener('blur', handler, true);

  return [
    () => form.removeEventListener('blur', handler, true),
    () => clear(form),
  ];
};

export const getQState = (
  location?: string,
): ParsedQuery<string> | Record<string, never> => {
  const search = decodeURIComponent(location ?? window.location.search);

  return search.length > 0
    ? queryString.parse(search, { arrayFormat: 'comma' })
    : {};
};

export { Options } from './types';
