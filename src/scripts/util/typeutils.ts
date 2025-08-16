export function typedRecord<T>() {
  return <K extends string>(obj: { [k in K]: T }) => obj;
}
