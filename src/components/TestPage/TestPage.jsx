import React, { useState } from "react";
import questions from "../../data/testQuestions.json";
import "./TestPage.css"; // Импорт стилей

const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Массив выбранных ответов
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [skippedQuestions, setSkippedQuestions] = useState([]); // Массив пропущенных вопросов

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    if (selectedAnswers.includes(answer)) {
      // Если ответ уже выбран, удаляем его
      setSelectedAnswers(selectedAnswers.filter((a) => a !== answer));
    } else {
      // Иначе добавляем его
      setSelectedAnswers([...selectedAnswers, answer]);
    }
  };

  const handleCheckAnswer = () => {
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    // Проверка правильности ответов для вопросов с множественным выбором
    if (currentQuestion.type === "multiple") {
      const isCorrect =
        selectedAnswers.length === currentQuestion.correctAnswers.length &&
        selectedAnswers.every((answer) => answer.isCorrect);
      if (isCorrect) {
        setScore(score + 1);
      }
    } else {
      // Для одиночного выбора
      if (selectedAnswers[0]?.isCorrect) {
        setScore(score + 1);
      }
    }

    setSelectedAnswers([]); // Сброс выбранных ответов
    setShowResult(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Тест завершен! Ваш результат: ${score} из ${questions.length}`);
      if (skippedQuestions.length > 0) {
        alert(`Вы пропустили ${skippedQuestions.length} вопросов.`);
      }
    }
  };

  const handleSkipQuestion = () => {
    // Добавляем текущий вопрос в массив пропущенных
    setSkippedQuestions([...skippedQuestions, currentQuestionIndex]);
    setSelectedAnswers([]); // Сброс выбранных ответов
    setShowResult(false);

    // Переход к следующему вопросу
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Тест завершен! Ваш результат: ${score} из ${questions.length}`);
      if (skippedQuestions.length > 0) {
        alert(`Вы пропустили ${skippedQuestions.length} вопросов.`);
      }
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
                type={
                  currentQuestion.type === "multiple" ? "checkbox" : "radio"
                } // Используем checkbox для множественного выбора
                name="answer"
                checked={selectedAnswers.includes(answer)} // Проверяем, выбран ли ответ
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
        disabled={selectedAnswers.length === 0} // Кнопка активна, если выбран хотя бы один ответ
      >
        Проверить ответ
      </button>

      {/* Кнопка "Пропустить вопрос" */}
      <button className="skip-button" onClick={handleSkipQuestion}>
        Пропустить вопрос
      </button>

      {/* Результат и объяснение */}
      {showResult && (
        <div className="result-explanation">
          <p
            className={
              currentQuestion.type === "multiple"
                ? selectedAnswers.every((answer) => answer.isCorrect) &&
                  selectedAnswers.length ===
                    currentQuestion.correctAnswers.length
                  ? "correct"
                  : "incorrect"
                : selectedAnswers[0]?.isCorrect
                ? "correct"
                : "incorrect"
            }
          >
            {currentQuestion.type === "multiple"
              ? selectedAnswers.every((answer) => answer.isCorrect) &&
                selectedAnswers.length === currentQuestion.correctAnswers.length
                ? "Правильно!"
                : `Неправильно. Правильные ответы: ${currentQuestion.correctAnswers.join(
                    ", "
                  )}`
              : selectedAnswers[0]?.isCorrect
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
