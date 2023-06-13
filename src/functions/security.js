export const cipher = (x) => {
  var s = [];
  for (var i = 0; i < x.length; i++) {
    var j = x.charCodeAt(i);
    if (j >= 33 && j <= 126) {
      s[i] = String.fromCharCode(33 + ((j + 14) % 94));
    } else {
      s[i] = String.fromCharCode(j);
    }
  }
  return s.join("");
};

export const decipher = (x) => {
  return cipher(x.split("/").at(-1)).split(":").at(-1);
};
