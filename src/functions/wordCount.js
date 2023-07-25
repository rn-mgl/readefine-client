export const wordCount = (word) => {
  if (!word) {
    return 0;
  }
  return word.trim().split(/\s+/).filter(Boolean).length;
};
