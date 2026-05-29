export const saveSetAsArray = <T,>(value: Set<T> | T[] | null | undefined): T[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : Array.from(value);
};

export const loadArrayAsSet = <T,>(value: Set<T> | T[] | null | undefined): Set<T> => {
  if (!value) return new Set<T>();
  return value instanceof Set ? new Set(value) : new Set(value);
};
