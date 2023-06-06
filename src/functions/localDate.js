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

export const getDaysInMonth = (d) => {
  const currDate = new Date(d).getDate();
  const date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  let days = [];

  while (currDate >= date.getDate() && date.getMonth() === new Date().getMonth()) {
    days.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }

  return days;
};

export const monthMap = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};
