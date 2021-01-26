import React, { useState, useEffect } from 'react';

export default function useLocalStorageState(key, initValue) {
  const storedValue = window.localStorage.getItem(key) || initValue;

  const [value, setValue] = useState(storedValue);

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [value]);

  return [value, (newValue) => setValue(newValue)];
}
