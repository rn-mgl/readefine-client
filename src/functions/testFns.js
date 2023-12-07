export const shuffleQuestions = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export const choicesStyle = {
  1: {
    bgColor: "bg-indigo-400",
    shadow: "shadow-[0_4px_rgba(99,102,241,1)]",
    shadowActive: "shadow-[inset_0_4px_rgba(99,102,241,1)]",
  },
  2: {
    bgColor: "bg-indigo-500",
    shadow: "shadow-[0_4px_rgba(79,70,229,1)]",
    shadowActive: "shadow-[inset_0_4px_rgba(79,70,229,1)]",
  },
  3: {
    bgColor: "bg-indigo-700",
    shadow: "shadow-[0_4px_rgba(55,48,163,1)]",
    shadowActive: "shadow-[inset_0_4px_rgba(55,48,163,1)]",
  },
  4: {
    bgColor: "bg-indigo-900",
    shadow: "shadow-[0_4px_rgba(25,22,75,1)]",
    shadowActive: "shadow-[inset_0_4px_rgba(25,22,75,1)]",
  },
};
