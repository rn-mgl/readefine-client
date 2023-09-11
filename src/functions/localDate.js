const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const localizeDate = (date) => {
  const localDate = new Date(date).toLocaleDateString();
  const dateSplit = localDate.split("/");
  const month = dateSplit[0];
  const day = dateSplit[1];
  const year = dateSplit[2];

  const stringedDate = `${months[month]} ${day}, ${year}`;

  return stringedDate;
};

export const inputDate = (date) => {
  const splitDate = date.split("/");
  let month = splitDate[0];
  let day = splitDate[1];
  const year = splitDate[2];

  month = parseInt(month) < 10 ? "0" + month : month;
  day = parseInt(day) < 10 ? "0" + day : day;

  const newDate = `${year}-${month}-${day}`;

  return newDate;
};

export const getDaysInMonth = (d, complete) => {
  const currDate = new Date(d).getDate();
  const date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  let days = [];

  if (complete) {
    while (date.getMonth() === new Date().getMonth()) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
  } else {
    while (currDate > date.getDate() && date.getMonth() === new Date().getMonth()) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
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
