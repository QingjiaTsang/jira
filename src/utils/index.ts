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

// 后面用泛型来规范类型
export const useDebounce = (value: unknown, delay?: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
