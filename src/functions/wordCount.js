export const wordCount = (word) => {
  if (!word) {
    return 0;
  }
  return word.trim().split(" ").length - 1;
};
