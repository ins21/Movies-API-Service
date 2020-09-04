import { useState, useCallback } from 'react';

export const useToggle = (initialValue = false) => {
  const [toggle, changeToggle] = useState(initialValue);

  const toggler = useCallback(() => {
    changeToggle(!toggle);
  }, [toggle]);

  return [toggle, toggler];
};
