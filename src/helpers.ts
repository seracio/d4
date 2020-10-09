export const mapKeys = (fn) => (obj) =>
  Object.entries(obj).reduce((acc, [key, val]) => {
    return {
      ...acc,
      [fn(val, key)]: val,
    };
  }, {});

export const mapValues = (fn) => (obj) =>
  Object.entries(obj).reduce((acc, [key, val]) => {
    return {
      ...acc,
      [key]: fn(val, key),
    };
  }, {});

export const omit = (keys) => (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    return keys.includes(key) ? acc : { ...acc, [key]: obj[key] };
  }, {});

export const pick = (keys) => (obj) => {
  return keys.reduce((acc, key) => {
    return key in obj ? { ...acc, [key]: obj[key] } : acc;
  }, {});
};

export const mean = (values) =>
  values.reduce((acc, val) => val + acc, 0) / values.length;

export const isNil = (val) => typeof val === "undefined" || val === null;

export const flow = (...fns) => (param) =>
  fns.reduce((acc, fn) => fn(acc), param);

export const asFunc = (val) => (typeof val === "function" ? val : () => val);
