
import { useState, useCallback, trigger } from 'react';

const useSliderState = (initialValue, onSliderChange) => {
  const [value, setValue] = useState(initialValue);

  const handleSliderChange = useCallback(
    (newValue) => {
      setValue(newValue);
      onSliderChange(newValue);
    },
    [onSliderChange]
  );

  return [value, handleSliderChange];
};

export default useSliderState;
