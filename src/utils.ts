import { QueryParametar } from './types';

export const checkIfQPExists = (qp: QueryParametar): boolean =>
  qp.key != null && qp.value != null && qp.value.length > 0;
