import { useState, useCallback } from 'react';

const useTabState = (initialState, onStateChange) => {
  const [state, setState] = useState(initialState);

  const handleSetState = useCallback(
    (newState) => {
      setState(newState);
      onStateChange(newState);
    },
    [onStateChange]
  );

  return [state, handleSetState];
};

export default useTabState;
