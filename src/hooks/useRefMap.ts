import { useRef } from 'react';

export default function useRefMap<T>(): [
  set: (key: string, value: T) => void,
  get: (key: string) => T | undefined
] {
  const refMap = useRef(new Map<string, T>());

  const set = (key: string, value: T): void => {
    refMap.current.set(key, value);
  };

  const get = (key: string): T | undefined => {
    return refMap.current.get(key);
  };

  return [set, get];
}
