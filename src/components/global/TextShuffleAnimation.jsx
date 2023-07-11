"use client";
import React from "react";

const TextShuffleAnimation = (props) => {
  const [animationText, setAnimationText] = React.useState("");
  const [targetText, setTargetText] = React.useState(props.title);

  React.useEffect(() => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let currentIndex = 0;
    let intervalId;

    const glitchLetters = () => {
      if (currentIndex < targetText.length) {
        setAnimationText((prevText) => {
          const updatedText = prevText + alphabet[Math.floor(Math.random() * alphabet.length)];
          return updatedText.slice(0, currentIndex + 1);
        });
        currentIndex++;
      } else {
        clearInterval(intervalId);
        animateTitle();
      }
    };

    const animateTitle = () => {
      currentIndex = 0;
      intervalId = setInterval(() => {
        if (currentIndex < targetText.length) {
          setAnimationText((prevText) => {
            const updatedText = prevText.split("");
            updatedText[currentIndex] = targetText[currentIndex];
            return updatedText.join("");
          });
          currentIndex++;
        } else {
          setAnimationText("DECIPHER");
          clearInterval(intervalId);
        }
      }, 100);
    };

    intervalId = setInterval(glitchLetters, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, [props.title, targetText]);

  const displayText = animationText.split().map((letters) => {
    return letters.split("").map((l, j) => {
      return (
        <div key={j} className="animate-pulse">
          <p className="text-black font-extrabold text-4xl cstm animate-shake">{l}</p>
        </div>
      );
    });
  });

  return <div className="cstm-flex-row gap-1 animate-slideDown">{displayText}</div>;
};

export default TextShuffleAnimation;
