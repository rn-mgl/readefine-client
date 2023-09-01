import React from "react";

export const useRiddleStatus = () => {
  const [riddleData, setRiddleData] = React.useState({});
  const [correctWord, setCorrectWord] = React.useState([]);
  const [guess, setGuess] = React.useState({ letters: [], letterPos: 0 });
  const [canSeeTutorial, setCanSeeTutorial] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [gameOver, setGameOver] = React.useState({ over: false, status: "" });
  const [entryGuesses, setEntryGuesses] = React.useState([]);
  const [timer, setTimer] = React.useState(0);
  const [lives, setLives] = React.useState({
    status: [1, 1, 1, 1, 1],
    activePos: 4,
  });

  // reset game stats
  const resetGameStats = () => {
    setRiddleData({});
    setCorrectWord([]);
    setGuess({ letters: [], letterPos: 0 });
    setLives({ status: [1, 1, 1, 1, 1], activePos: 4 });
    setTimer(0);
    setEntryGuesses([]);
    setGameOver({ over: false, status: "" });
  };

  // toggle can see tutorial
  const handleCanSeeTutorial = () => {
    setCanSeeTutorial((prev) => !prev);
  };

  // toggle is playing, if playing reset, else main menu
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

  // handle input from virtual keyb
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

  // add to guesses
  const addToGuessEntry = () => {
    setEntryGuesses(guess.letters);
  };

  // submit guess
  const submitGuess = () => {
    const guessString = guess.letters.join("");
    const correctWordString = correctWord.join("");

    // return if guess length is not equal to correct one
    if (guessString.length !== correctWordString.length) return;

    addToGuessEntry();

    if (guessString === correctWordString) {
      handleGameOver(true, "win");
    } else {
      removeHeart();
    }
    setGuess({ letters: Array(correctWord.length).fill(""), letterPos: 0 });
  };

  // remove heart
  const removeHeart = () => {
    // game over if lives are empty
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

  // new set of lives
  const setNewLives = () => {
    setLives({ status: [1, 1, 1, 1, 1], activePos: 4 });
  };

  // new set of riddle data
  const setNewRiddleData = (data) => {
    setRiddleData(data);
  };

  // new set of correct word
  const setNewCorrectWord = (word) => {
    setCorrectWord(word);
  };

  // new set of guess
  const setNewGuess = (letters, letterPos) => {
    setGuess({ letters, letterPos });
  };

  // reset entry guess
  const resetEntryGuesses = () => {
    setEntryGuesses([]);
  };

  // reset timer
  const resetTimer = () => {
    setTimer(0);
  };

  React.useEffect(() => {
    if (riddleData.riddle && !gameOver.over) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [gameOver.over, setTimer, riddleData.riddle]);

  return {
    riddleData,
    correctWord,
    guess,
    canSeeTutorial,
    isPlaying,
    gameOver,
    lives,
    entryGuesses,
    timer,
    handleCanSeeTutorial,
    handleIsPlaying,
    removeHeart,
    handleGameOverStatus,
    handleInput,
    deleteCharacter,
    resetEntryGuesses,
    resetTimer,
    submitGuess,
    setNewLives,
    setNewRiddleData,
    setNewCorrectWord,
    setNewGuess,
  };
};
