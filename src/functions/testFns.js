export const shuffleQuestions = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
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
