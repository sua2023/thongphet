export const dateOfMonth = () => {
  const today = new Date();
  const startDate = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), 1)
  );

  const endDate = new Date(
    Date.UTC(today.getFullYear(), today.getMonth() + 1, 0)
  );

  return { startDate, endDate };
};
