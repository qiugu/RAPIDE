import { isString, isObject } from './is';

type ClassNameArg = string | string[];

export default function classnames(...args: ClassNameArg[]): string {
  let clsArr = [];

  for (const cls of args) {
    if (!cls) continue;

    if (isString(cls)) {
      clsArr.push(cls);
    } else if (Array.isArray(cls)) {
      clsArr = clsArr.concat(cls);
    } else if (isObject(cls)) {
      Object.keys(cls).forEach(key => {
        if (cls[key]) {
          clsArr.push(key);
        }
      });
    } else {
      console.error('Parameters type is string/array/object!');
    }
  }

  return clsArr.join(' ');
}
