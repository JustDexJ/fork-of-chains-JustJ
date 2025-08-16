export function createLogger(
  id: string,
  color: string,
): (msg: string, ...args: any[]) => any[] {
  return function logmsg(msg: string, ...args: any[]) {
    return [`%c[${id}]%c ${msg}`, `color: ${color}`, "", ...args];
  };
}
