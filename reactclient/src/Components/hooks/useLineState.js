
import { useState, useCallback } from 'react';

const useLineState = (initialState, onStateChange) => {
  const [state, setState] = useState(initialState);

  const handleSetState = useCallback(
    (newState) => {
      setState(newState);
      onStateChange(newState);
      console.log('Updated data:', newState);
    },
    [onStateChange]
  );

  return [state, handleSetState];
};

export default useLineState;
