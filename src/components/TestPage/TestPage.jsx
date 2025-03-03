import React, { useState } from "react";
import questions from "../../data/testQuestions.json";
import "./TestPage.css"; // Импорт стилей

const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    setShowResult(true);
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

  return (
    <div className="test-page">
      <h2>
        Вопрос {currentQuestionIndex + 1} из {questions.length}
      </h2>
      <h3>{currentQuestion.question}</h3>

      {/* Варианты ответов */}
      <ul className="answers-list">
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

      {/* Кнопка "Проверить ответ" */}
      <button
        className="check-button"
        onClick={handleCheckAnswer}
        disabled={!selectedAnswer}
      >
        Проверить ответ
      </button>

      {/* Результат и объяснение */}
      {showResult && (
        <div className="result-explanation">
          <p className={selectedAnswer?.isCorrect ? "correct" : "incorrect"}>
            {selectedAnswer?.isCorrect
              ? "Правильно!"
              : `Неправильно. Правильный ответ: ${currentQuestion.correctAnswer}`}
          </p>

          {/* Кнопка "Следующий вопрос" или "Завершить тест" */}
          <button className="next-button" onClick={handleNextQuestion}>
            {currentQuestionIndex < questions.length - 1
              ? "Следующий вопрос"
              : "Завершить тест"}
          </button>

          {/* Блок с объяснением */}
          {currentQuestion.explanation && (
            <div className="explanation">
              <h4>Объяснение:</h4>
              {currentQuestion.explanation.main && (
                <p>
                  <strong>Основное объяснение:</strong>{" "}
                  {currentQuestion.explanation.main}
                </p>
              )}
              {currentQuestion.explanation.whyCorrect && (
                <p>
                  <strong>Почему правильный ответ верный:</strong>{" "}
                  {Object.values(currentQuestion.explanation.whyCorrect).join(
                    " "
                  )}
                </p>
              )}
              {currentQuestion.explanation.whyOthersIncorrect && (
                <>
                  <p>
                    <strong>Почему другие варианты неверны:</strong>
                  </p>
                  <ul>
                    {Object.entries(
                      currentQuestion.explanation.whyOthersIncorrect
                    ).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {currentQuestion.explanation.conclusion && (
                <p>
                  <strong>Заключение:</strong>{" "}
                  {currentQuestion.explanation.conclusion}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestPage;
