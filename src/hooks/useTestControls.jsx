import React from "react";

export const useTestControls = () => {
  const [testData, setTestData] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [isFinished, setIsFinished] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [selectedChoices, setSelectedChoices] = React.useState({
    choice1: { answer: "", questionId: -1 },
    choice2: { answer: "", questionId: -1 },
    choice3: { answer: "", questionId: -1 },
    choice4: { answer: "", questionId: -1 },
    choice5: { answer: "", questionId: -1 },
    choice6: { answer: "", questionId: -1 },
    choice7: { answer: "", questionId: -1 },
    choice8: { answer: "", questionId: -1 },
    choice9: { answer: "", questionId: -1 },
    choice10: { answer: "", questionId: -1 },
  });

  // toggle is finished
  const handleIsFinished = (status) => {
    setIsFinished(status);
  };

  // handle score
  const handeScore = (score) => {
    setScore(score);
  };

  // handle onchange select choice
  const handleSelectedChoices = (id, { name, value }) => {
    setSelectedChoices((prev) => {
      return {
        ...prev,
        [name]: { answer: value, questionId: id },
      };
    });
  };

  const computeScore = () => {
    let score = 0;
    let visited = [];

    for (let i = 0; i < 10; i++) {
      const q = questions[i];

      for (let j = 1; j <= 10; j++) {
        const choiceIdx = `choice${j}`;
        const currChoice = selectedChoices[choiceIdx];

        if (
          currChoice?.questionId === q?.question_id &&
          !visited.includes(q.question_id)
        ) {
          if (q.answer === currChoice.answer) {
            score++;
            visited.push(q.question_id);
          }
          break;
        }
      }
    }

    setScore(score);
    return score;
  };

  const setNewTestData = React.useCallback((data) => {
    setTestData(data);
  }, []);

  const setNewQuestions = React.useCallback((questions) => {
    setQuestions(questions);
  }, []);

  return {
    testData,
    questions,
    isFinished,
    score,
    selectedChoices,
    handleIsFinished,
    handleSelectedChoices,
    computeScore,
    setNewTestData,
    setNewQuestions,
    handeScore,
  };
};
