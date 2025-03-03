import React, { useState } from "react";
import questions from "../data/testQuestions.json";

const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer?.isCorrect) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    setShowResult(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(
        `Тест завершен! Ваш результат: ${
          score + (selectedAnswer?.isCorrect ? 1 : 0)
        } из ${questions.length}`
      );
    }
  };

  const handleCheckAnswer = () => {
    setShowResult(true);
  };

  return (
    <div>
      <h2>
        Вопрос {currentQuestionIndex + 1} из {questions.length}
      </h2>
      <h3>{currentQuestion.question}</h3>
      <ul>
        {currentQuestion.answers.map((answer, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="answer"
                checked={selectedAnswer === answer}
                onChange={() => handleAnswerSelect(answer)}
              />
              {answer.text}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckAnswer} disabled={!selectedAnswer}>
        Проверить ответ
      </button>
      {showResult && (
        <div>
          <p style={{ color: selectedAnswer?.isCorrect ? "green" : "red" }}>
            {selectedAnswer?.isCorrect
              ? "Правильно!"
              : `Неправильно. Правильный ответ: ${currentQuestion.correctAnswer}`}
          </p>
          <button onClick={handleNextQuestion}>
            {currentQuestionIndex < questions.length - 1
              ? "Следующий вопрос"
              : "Завершить тест"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
