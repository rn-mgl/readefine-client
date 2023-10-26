export const monthMap = {
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

  const stringedDate = `${monthMap[month]} ${day}, ${year}`;

  return stringedDate;
};

export const localizeTime = (time) => {
  const localTime = new Date(time).toLocaleTimeString();
  const timeSplit = localTime.split(":");
  const timeOfDaySplit = localTime.split(" ");
  const hour = timeSplit[0];
  const minute = timeSplit[1];
  const timeOfDay = timeOfDaySplit[1];

  const stringedTime = `${hour}:${minute} ${timeOfDay}`;

  return stringedTime;
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

export const getDaysInMonth = (d, month) => {
  const currDate = new Date(d).getDate();
  const currMonth = new Date().getMonth();
  const date = new Date(new Date().getFullYear(), currMonth, 1);
  let days = [];

  if (month === currMonth + 1) {
    while (currDate > date.getDate() && date.getMonth() === currMonth) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
  } else {
    while (date.getMonth() === currMonth) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
  }

  return days;
};
