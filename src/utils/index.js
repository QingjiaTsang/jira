import { useEffect, useState } from "react";

const isFalse = (val) => val !== 0 && !val;

export const cleanObj = (obj) => {
  let resultObj = { ...obj };
  for (const key in obj) {
    if (isFalse(obj[key])) {
      delete resultObj[key];
    }
  }
  return resultObj;
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
