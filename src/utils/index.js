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
