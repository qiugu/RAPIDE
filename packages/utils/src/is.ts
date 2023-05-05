const opt = Object.prototype.toString;

export function isString(arg: unknown): boolean {
  return opt.call(arg) === '[object String]';
}

export function isObject(arg: unknown): boolean {
  return opt.call(arg) === '[object Object]';
}
