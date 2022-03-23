import { Dispatch, SetStateAction, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialState;
    } catch {
      return initialState;
    }
  });

  const setValue = (value: T | ((old: T) => T)): void => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    try {
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // no-empty workaround
    }
  };

  return [storedValue, setValue];
}
