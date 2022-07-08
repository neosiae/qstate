import { QueryParametar } from './types';

export const save = (qp: QueryParametar): void => {
  const params = new URLSearchParams(window.location.search);

  params.set(qp.key, qp.value);

  const url = `${window.location.pathname}?${params.toString()}`;

  window.history.replaceState(null, '', url);
};

export const trackForm = (ref: HTMLElement): (() => void) => {
  const form = ref as HTMLFormElement;

  const handler = (event: Event): void => {
    const { name: key, value } = event.target as HTMLFormElement;

    save({ key, value });
  };

  const elements = Array.from(form.elements);

  elements.forEach((element) => element.addEventListener('blur', handler));

  return () =>
    elements.forEach((element) => element.removeEventListener('blur', handler));
};
