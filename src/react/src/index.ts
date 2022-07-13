import React, { MutableRefObject } from 'react';
import { getQState, save, trackForm } from '../../../dist/bundle';

const useQState = (ref: MutableRefObject<HTMLFormElement>) => {
  const [qState] = React.useState(() => getQState());

  React.useEffect(() => {
    const unsubscribe = trackForm(ref.current);

    return () => unsubscribe();
  }, [ref]);

  return [qState, save] as const;
};

export default useQState;
