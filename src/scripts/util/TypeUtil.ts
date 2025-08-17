export function isDefinitionArgs<T extends {}>(args: any[]): args is [T] {
  return args.length === 1 && args[0] && typeof args[0] === "object";
}
