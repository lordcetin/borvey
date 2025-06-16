export const joinWithComma = (items: string[]): string => {
  return items.filter(Boolean).join(", ");
};