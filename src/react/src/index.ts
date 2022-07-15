import React, { MutableRefObject } from 'react';
import { getQState, save, trackForm, clear } from '../../../dist/bundle';
import type { Options } from '../../../dist/bundle';

const useQState = (
  ref: MutableRefObject<HTMLFormElement>,
  options?: Options,
) => {
  const [qState] = React.useState(() => getQState());
  const clearState = () => clear(ref.current);

  React.useEffect(() => {
    const [unsubscribe] = trackForm(ref.current, options);

    return () => unsubscribe();
  }, [ref]);

  return [qState, save, clearState] as const;
};

export default useQState;
