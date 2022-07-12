import queryString, { ParsedQuery } from 'query-string';
import { QueryParametar } from './types';
import { checkIfQPExists } from './utils';

export const save = (qp: QueryParametar): void => {
  if (qp == null)
    throw new Error(
      'QueryParametar should not be empty. Please pass a valid object.',
    );

  const params = new URLSearchParams(window.location.search);

  params.set(qp.key, qp.value);

  const url = `${window.location.pathname}?${params.toString()}`;

  window.history.replaceState(null, '', url);
};

export const trackForm = (ref: HTMLElement): (() => void) => {
  if (ref == null)
    throw new Error('Reference is not defined. Please pass a valid reference.');

  const form = ref as HTMLFormElement;

  const handler = (event: Event): void => {
    const { name: key, value } = event.target as HTMLFormElement;

    if (checkIfQPExists({ key, value })) save({ key, value });
  };

  form.addEventListener('blur', handler, true);

  return () => form.removeEventListener('blur', handler, true);
};

export const getQState = (location?: string): ParsedQuery<string> | null => {
  const search = decodeURIComponent(location ?? window.location.search);

  return search.length > 0
    ? queryString.parse(search, { arrayFormat: 'comma' })
    : null;
};
