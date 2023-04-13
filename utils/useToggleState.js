import { useState } from 'react';

export const useToggleState = initialValue => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(v => !v);
  return [value, toggle];
};
