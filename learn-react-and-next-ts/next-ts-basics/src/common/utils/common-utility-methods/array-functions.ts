export const sortArrayByField = <T>(
  arr: T[],
  field: keyof T,
  ascending: boolean = true
): T[] => {
  return arr.sort((a, b) => {
    if (a[field] < b[field]) return ascending ? -1 : 1;
    if (a[field] > b[field]) return ascending ? 1 : -1;
    return 0;
  });
};
