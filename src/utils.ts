import { QueryParametar, QState } from './types';

export const checkIfQPExists = (qp: QueryParametar): boolean =>
  qp.key != null && qp.value != null && qp.value.length > 0;

export const parseQueryString = (queryString: string): QState => {
  const qs = queryString.split('?')[1].split('&');

  return qs.reduce((qState: QState, qp: string) => {
    const [key, value] = qp.split('=');

    qState[key] = value;

    return qState;
  }, {});
};
