export const localizeDate = (date) => {
  const localDate = new Date(date).toLocaleDateString();

  return localDate;
};
