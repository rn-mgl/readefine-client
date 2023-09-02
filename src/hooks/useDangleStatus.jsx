import React from "react";

export const useDangleStatus = () => {
  const [wordData, setWordData] = React.useState({});
  const [definitionData, setDefinitionData] = React.useState([]);
  const [correctWord, setCorrectWord] = React.useState([{}]);
  const [canSeeTutorial, setCanSeeTutorial] = React.useState(false);
  const [gameOver, setGameOver] = React.useState({ over: false, status: "" });
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [guess, setGuess] = React.useState({ letters: [], letterPos: 0 });
  const [entryGuesses, setEntryGuesses] = React.useState([]);
  const [canSeeHint, setCanSeeHint] = React.useState(false);
  const [lives, setLives] = React.useState({
    status: [1, 1, 1, 1, 1],
    activePos: 4,
  });
  const [timer, setTimer] = React.useState(0);

  // reset game stats
  const resetGameStats = () => {
    setCorrectWord([{}]);
    setWordData({});
    setEntryGuesses([]);
    setCanSeeHint(false);
    setLives({ status: [1, 1, 1, 1, 1], activePos: 4 });
    setGameOver({ over: false, status: "" });
    setTimer(0);
  };

  // toggle can see tutorial
  const handleCanSeeTutorial = () => {
    setCanSeeTutorial((prev) => !prev);
  };

  // toggle can see hint
  const handleCanSeeHint = () => {
    setCanSeeHint((prev) => !prev);
  };

  // toggle is playing
  const handleIsPlaying = () => {
    setIsPlaying((prev) => {
      if (prev) {
        resetGameStats();
      }
      return !prev;
    });
  };

  // handle game over
  const handleGameOverStatus = (over, status) => {
    setGameOver({ over, status });
  };

  // handle onchange input
  const handleInput = (key) => {
    if (guess.letterPos >= correctWord.length) return;
    const newLetters = [...guess.letters];
    newLetters[guess.letterPos] = key;
    setGuess((prev) => {
      return {
        letters: newLetters,
        letterPos: prev.letterPos + 1,
      };
    });
  };

  // handle delete character
  const deleteCharacter = () => {
    if (guess.letterPos - 1 < 0) return;
    const newLetters = [...guess.letters];
    newLetters[guess.letterPos - 1] = null;
    setGuess((prev) => {
      return {
        letters: newLetters,
        letterPos: prev.letterPos - 1,
      };
    });
  };

  // add to guess entry
  const addToGuessEntry = () => {
    const newEntryGuesses = [...entryGuesses];
    newEntryGuesses.push(guess.letters);
    setEntryGuesses(newEntryGuesses);
  };

  // remove heart
  const removeHeart = () => {
    // game over if no more hearts
    if (lives.activePos <= 0) {
      setGameOver({ over: true, status: "lose" });
    }

    const newLives = [...lives.status];
    newLives[lives.activePos] = 0;

    setLives((prev) => {
      return {
        status: newLives,
        activePos: prev.activePos - 1 < 0 ? 0 : prev.activePos - 1,
      };
    });
  };

  // submit guess
  const submitGuess = () => {
    const stringGuess = guess.letters.join("");

    // do not record if not completely filled inputs
    if (stringGuess.length !== wordData.word.length) return;

    let corrects = 0;

    // add entry
    addToGuessEntry();

    for (let i = 0; i < correctWord.length; i++) {
      const guessCandidate = guess.letters[i];
      const toGuess = correctWord[i];

      // if same letters
      if (toGuess === guessCandidate) {
        corrects += 1;

        // add correct points and win if is the same length of the word
        if (corrects >= correctWord.length) {
          setGameOver({ over: true, status: "win" });
          return;
        }
      }
    }

    // if the corrects are not equal to word length, remove heart
    if (corrects !== correctWord.length) {
      removeHeart();
    }

    // reset guess
    setGuess({ letters: Array(correctWord.length).fill(""), letterPos: 0 });
  };

  const resetEntryGuesses = () => {
    setEntryGuesses([]);
  };

  const resetTimer = () => {
    setTimer(0);
  };

  const setNewDefinitionData = (data) => {
    setDefinitionData(data);
  };

  const setNewWordData = (word) => {
    setWordData(word);
  };

  const setNewCorrectWord = (word) => {
    setCorrectWord(word);
  };

  const setNewGuess = (letters, letterPos) => {
    setGuess({ letters, letterPos });
  };

  // new set of lives
  const setNewLives = (status) => {
    setLives({ status, activePos: status?.length - 1 });
  };

  React.useEffect(() => {
    if (wordData.word_id && !gameOver.over) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [setTimer, gameOver.over, wordData.word_id]);

  return {
    wordData,
    definitionData,
    correctWord,
    canSeeTutorial,
    guess,
    entryGuesses,
    canSeeHint,
    lives,
    timer,
    gameOver,
    isPlaying,
    addToGuessEntry,
    deleteCharacter,
    handleCanSeeTutorial,
    handleCanSeeHint,
    handleIsPlaying,
    handleInput,
    handleGameOverStatus,
    resetEntryGuesses,
    resetTimer,
    submitGuess,
    setNewDefinitionData,
    setNewCorrectWord,
    setNewGuess,
    setNewLives,
    setNewWordData,
  };
};
