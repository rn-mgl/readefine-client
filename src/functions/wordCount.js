export const wordCount = (word) => {
  if (!word) {
    return 0;
  }
  return word.split(" ").length - 1;
};
