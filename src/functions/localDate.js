export const localizeDate = (date) => {
  const localDate = new Date(date).toLocaleDateString();

  return localDate;
};

export const inputDate = (date) => {
  const splitDate = date.split("/");
  const month = splitDate[0];
  const day = splitDate[1];
  const year = splitDate[2];

  const newDate = `${year}-${month}-${day}`;

  return newDate;
};
