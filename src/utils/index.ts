import { useEffect, useState } from "react";

const isFalse = (val: unknown): boolean => !(val === 0 || !!val);

export const cleanObj = (obj: object) => {
  let resultObj = { ...obj };
  for (const key in obj) {
    // @ts-ignore: 回头再来改这儿的类型声明
    if (isFalse(obj[key])) {
      // @ts-ignore: 回头再来改这儿的类型声明
      delete resultObj[key];
    }
  }
  return resultObj;
};

// 相当于生命周期里的componentDidMount，挂载时执行
export const useMount = (callback: Function) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

interface Person {
  name: string;
  age: number;
}
// clear, removeIndx, add
export const useArray = (persons: Person[]) => {
  const [value, setValue] = useState(persons);

  const clear = () => {
    setValue([]);
  };
  const removeIndx = (idx: number) => {
    setValue(value.filter((person, index) => index !== idx));
  };
  const add = (person: Person) => {
    setValue([...value, person]);
  };
  return { value, clear, removeIndx, add };
};
