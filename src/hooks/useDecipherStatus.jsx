import React from "react";

export const useDecipherStatus = () => {
  const [wordData, setWordData] = React.useState({});
  const [correctWord, setCorrectWord] = React.useState([]);
  const [canSeeTutorial, setCanSeeTutorial] = React.useState(false);

  const [cipheredWord, setCipheredWord] = React.useState([]);
  const [guess, setGuess] = React.useState([]);
  const [lives, setLives] = React.useState({ status: [1, 1, 1], activePos: 2 });

  const [gameOver, setGameOver] = React.useState({ over: false, status: "" });
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timer, setTimer] = React.useState(0);

  // reset stats
  const resetGameStats = () => {
    setCipheredWord([]);
    setGuess([]);
    setWordData({});
    setCorrectWord([]);
    setGameOver({ over: false, status: "" });
    setLives({ status: [1, 1, 1], activePos: 2 });
    setTimer(0);
  };

  // toggle can see tutorial
  const handleCanSeeTutorial = () => {
    setCanSeeTutorial((prev) => !prev);
  };

  // reset to starting position the letters
  const resetGuesses = () => {
    setGuess(cipheredWord);
  };

  const handleGameOverStatus = (over, status) => {
    setGameOver({ over, status });
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

  // increment letter position
  const incrementLetter = (index) => {
    const currChar = guess[index].letter;
    let newChar = String.fromCharCode(currChar.charCodeAt(0) + 1);

    if (!newChar.match(/[a-z]/i)) {
      newChar = "A";
    }

    let newGuess = [...guess];
    newGuess[index] = { letter: newChar, skips: guess[index].skips };

    setGuess(newGuess);
  };

  // decrement letter position
  const decrementLetter = (index) => {
    const currChar = guess[index].letter;
    let newChar = String.fromCharCode(currChar.charCodeAt(0) - 1);

    if (!newChar.match(/[a-z]/i)) {
      newChar = "Z";
    }

    let newGuess = [...guess];
    newGuess[index] = { letter: newChar, skips: guess[index].skips };

    setGuess(newGuess);
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
    let guessString = "";
    const correctWordString = correctWord.join("");

    guess.forEach((e) => {
      guessString += e.letter;
    });

    if (guessString === correctWordString) {
      setGameOver({ over: true, status: "win" });
    } else {
      removeHeart();
    }
  };

  // shuffle text positions
  const cipher = (text) => {
    // new text array
    const cipheredText = [];

    for (let i = 0; i < text.length; i++) {
      // curr char
      const char = text[i];

      // up or down skips
      const shiftDirection = Math.random() < 0.5 ? -1 : 1;

      // number of skips
      const shiftAmount = Math.floor(Math.random() * 5) + 1;

      // new char and skips
      let newChar = char;
      let skips = 0;

      // traverse current letter until shift amount is reached
      for (let j = 0; j < shiftAmount; j++) {
        // move letter value up or down depending on shift direction
        if (shiftDirection === 1) {
          newChar = String.fromCharCode(newChar.charCodeAt(0) + 1);
        } else {
          newChar = String.fromCharCode(newChar.charCodeAt(0) - 1);
        }

        // increment skips per loop
        skips++;

        // if alphabet is not in A to Z, manually change to A or Z depending on shift direction
        if (!newChar.match(/[a-z]/i)) {
          if (shiftDirection === 1) {
            newChar = "A";
          } else {
            newChar = "Z";
          }
        }
      }

      // add the ciphered character set to the ciphered text array
      cipheredText.push({
        letter: newChar,
        skips: skips,
      });
    }

    return cipheredText;
  };

  const setNewCipheredWord = (cipheredWord) => {
    setCipheredWord(cipheredWord);
  };

  const setNewGuess = (cipheredWord) => {
    setGuess(cipheredWord);
  };

  const setNewWordData = (word) => {
    setWordData(word);
  };

  const setNewCorrectWord = (word) => {
    setCorrectWord(word);
  };

  const setNewLives = (status) => {
    setLives({ status, activePos: status?.length - 1 });
  };

  const resetTimer = () => {
    setTimer(0);
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
    correctWord,
    canSeeTutorial,
    cipheredWord,
    guess,
    lives,
    gameOver,
    isPlaying,
    timer,
    cipher,
    decrementLetter,
    handleCanSeeTutorial,
    handleGameOverStatus,
    handleIsPlaying,
    incrementLetter,
    resetGuesses,
    resetTimer,
    submitGuess,
    setNewCipheredWord,
    setNewGuess,
    setNewWordData,
    setNewCorrectWord,
    setNewLives,
  };
};
