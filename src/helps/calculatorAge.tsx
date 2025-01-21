export const CalculatorAge = (date: Date|undefined) => {
  if (!date) {
    return null;
  }
  const birthDate = new Date(date);
  const today = new Date();

  // Calculate the difference in milliseconds
  const ageInMilliseconds = today.getTime() - birthDate.getTime();

  // Convert milliseconds to years
  const ageDate = new Date(ageInMilliseconds);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970); // 1970 is the epoch year

  return age;
};
