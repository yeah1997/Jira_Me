import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? true : !value);

//
export const cleanObject = (object: Object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    if (isFalsy(result[key])) delete result[key];
  });

  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debounceValue;
};
