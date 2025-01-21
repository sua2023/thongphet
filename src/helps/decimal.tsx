export const Decimal = (total: number) => {
  if (!total && total !== 0) {
    return;
  }

  return total.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
