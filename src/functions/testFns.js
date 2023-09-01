export const shuffleQuestions = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

// toggle is finished
export const handleIsFinished = (setIsFinished) => {
  setIsFinished((prev) => !prev);
};

// handle onchange select choice
export const handleSelectedChoices = (id, { name, value }, setSelectedChoices) => {
  setSelectedChoices((prev) => {
    return {
      ...prev,
      [name]: { answer: value, questionId: id },
    };
  });
};

export const computeScore = (setScore, setIsFinished, questions, selectedChoices) => {
  let score = 0;
  let visited = [];

  for (let i = 0; i < 10; i++) {
    const q = questions[i];

    for (let j = 1; j <= 10; j++) {
      const choiceIdx = `choice${j}`;
      const currChoice = selectedChoices[choiceIdx];

      if (currChoice?.questionId === q?.question_id && !visited.includes(q.question_id)) {
        if (q.answer === currChoice.answer) {
          score++;
          visited.push(q.question_id);
        }
        break;
      }
    }
  }

  if (setScore) {
    setScore(score);
  }

  if (setIsFinished) {
    setIsFinished(true);
  }

  return score;
};

export const choicesStyle = {
  1: {
    bgColor: "bg-indigo-300",
    shadow: "shadow-[0_4px_rgba(129,140,248,1)]",
    shadowActive: "shadow-[inset_0_4px_rgba(129,140,248,1)]",
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
