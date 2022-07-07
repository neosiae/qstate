import { QueryParametar } from './types';

export const save = (qp: QueryParametar): void => {
  const params = new URLSearchParams(window.location.search);

  params.set(qp.key, qp.value);

  const url = window.location.pathname + '?' + params.toString();

  window.history.pushState(null, '', url);
};

export const trackForm = (ref: HTMLElement): void => {
  const form = ref as HTMLFormElement;

  Array.from(form.elements).forEach((element) => {
    element.addEventListener('blur', (event) => {
      const { name: key, value } = event.target as HTMLFormElement;

      save({ key, value });
    });
  });
};
