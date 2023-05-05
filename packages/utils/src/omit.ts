export default function omit<T extends Object, K extends keyof T>(
  obj: T,
  keys: Array<K | string>
): Omit<T, K> {
  const clone = {
    ...obj
  };

  Object.keys(keys).forEach(key => {
    if (key in clone) {
      delete clone[key];
    }
  });

  return clone;
}
