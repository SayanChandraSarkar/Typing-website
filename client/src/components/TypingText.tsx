import React, { useEffect, useState } from "react";
import "../assets/css/TypingTest.css";

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Jackdaws love my big sphinx of quartz.",
  "How vexingly quick witted zebras jump!",
  "Pack my box with five dozen liquor jugs.",
  "The five boxing wizards jump quickly at dawn.",
];

const TypingTest: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [duration, setDuration] = useState(6);
  const [currentSampleText, setCurrentSampleText] = useState(sampleTexts[0]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            calculateWPM();
            playSound();
            setShowModal(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timer]);

  const startTest = () => {
    setIsRunning(true);
    setTimer(duration);
    setInputValue("");
    setWordsPerMinute(0);
    playSound();
    chooseRandomSampleText(); // Choose a random sample text when starting
  };

  const compareInputWithSample = () => {
    const sampleText = currentSampleText;
    const typedText = inputValue;

    let correctCharacters = 0;
    for (let i = 0; i < Math.min(sampleText.length, typedText.length); i++) {
      if (sampleText[i] === typedText[i]) {
        correctCharacters++;
      }
    }

    return correctCharacters;
  };

  const calculateWPM = () => {
    const words = inputValue.trim().split(/\s+/).filter(Boolean);
    const totalWordsTyped = words.length;

    if (totalWordsTyped === 0 || duration <= 0) {
      setWordsPerMinute(0);
      return;
    }

    // const correctCharacters = compareInputWithSample();
    // const correctWordsCount = Math.floor(
    //   (correctCharacters / currentSampleText.length) * totalWordsTyped
    // );

    const wpm = totalWordsTyped / (duration / 60);
    setWordsPerMinute(Math.round(wpm));
  };

  const playSound = () => {
    const audio = new Audio("/path/to/sound.mp3");
    audio.play();
  };

  const chooseRandomSampleText = () => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    setCurrentSampleText(sampleTexts[randomIndex]);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // Effect to check if input matches the sample text
  useEffect(() => {
    if (inputValue === currentSampleText) {
      chooseRandomSampleText(); // Choose a new sample text if the current one is completed
      setInputValue(""); // Clear the input area
    }
  }, [inputValue, currentSampleText]);

  return (
    <div className="typing-test-container">
      <h2>Typing Test</h2>
      <p className="sample-text">{currentSampleText}</p>
      <textarea
        className={`input-area ${isRunning ? "active" : ""}`}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (e.target.value === currentSampleText) {
            console.log(e.target.value);
            console.log(currentSampleText);
            chooseRandomSampleText();
            setInputValue("");
          }
        }}
        disabled={!isRunning}
        placeholder="Start typing here..."
      />
      <div className="controls">
        <select
          className="select-duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          disabled={isRunning}
        >
          <option value={60}>60 seconds</option>
          <option value={80}>80 seconds</option>
          <option value={120}>120 seconds</option>
        </select>
        <button
          className="random-sample-text-button"
          onClick={chooseRandomSampleText}
        >
          Choose Random Sample Text
        </button>
        <button
          className="start-button"
          onClick={startTest}
          disabled={isRunning}
        >
          Start Test
        </button>

        <p className="timer">Time left: {isRunning ? timer : 0} seconds</p>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Test Results</h2>
              <p className="result">Your WPM: {wordsPerMinute}</p>
              <p className="accuracy">
                Accuracy:{" "}
                {(
                  (compareInputWithSample() / currentSampleText.length) *
                  100
                ).toFixed(2)}
                %
              </p>
              <button className="close-modal" onClick={handleModalClose}>
                Close
              </button>
            </div>
          </div>
        )}
        <div
          className="progress-bar"
          style={{ width: isRunning ? `${(timer / duration) * 100}%` : "0%" }}
        />
      </div>
    </div>
  );
};

export default TypingTest;
