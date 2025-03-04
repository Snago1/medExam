import React, { useState } from "react";
import { Link } from "react-router-dom";
import oralExamQuestions from "../../data/oralExamQuestions.json";
import "./OralExamPage.css";

const OralExamPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedTestAnswers, setSelectedTestAnswers] = useState({});
  const [showTestResults, setShowTestResults] = useState(false);

  const currentQuestion = oralExamQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < oralExamQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedTestAnswers({});
      setShowTestResults(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedTestAnswers({});
      setShowTestResults(false);
    }
  };

  const handleTestAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedTestAnswers({
      ...selectedTestAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleCheckTestAnswers = () => {
    setShowTestResults(true);
  };

  return (
    <div className="oral-exam-page">
      {/* Кнопка для возврата на главную страницу */}
      <nav className="navigation">
        <Link to="/" className="home-link">
          На главную
        </Link>
      </nav>

      <h2>
        Вопрос {currentQuestionIndex + 1} из {oralExamQuestions.length}
      </h2>
      <h3>{currentQuestion.question}</h3>

      {/* Развернутый ответ для устного экзамена */}
      <div className="section">
        <h4>Развернутый ответ:</h4>
        <div className="answer-section">
          <p>
            <strong>Классификация:</strong> {currentQuestion.classification}
          </p>
          <p>
            <strong>Этиология:</strong> {currentQuestion.etiology}
          </p>
          <p>
            <strong>Клиническая картина:</strong>{" "}
            {currentQuestion.clinicalPicture}
          </p>
          <p>
            <strong>Диагностика:</strong> {currentQuestion.diagnosis}
          </p>
          <p>
            <strong>Лечение:</strong> {currentQuestion.treatment}
          </p>
          {currentQuestion.surgery && (
            <p>
              <strong>Ход операции:</strong> {currentQuestion.surgery}
            </p>
          )}
          <p>
            <strong>История вопроса:</strong> {currentQuestion.history}
          </p>
          <p>
            <strong>Методы и разрезы:</strong> {currentQuestion.methods}
          </p>
          <p>
            <strong>Названия по автору:</strong> {currentQuestion.authorNames}
          </p>
        </div>
      </div>

      {/* Учебные материалы */}
      <div className="materials-section">
        <h4>Материалы:</h4>
        <ul>
          {currentQuestion.materials.map((material, index) => (
            <li key={index}>
              {material.type === "text" ? (
                <span>{material.content}</span>
              ) : (
                <a
                  href={material.content}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {material.content}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Справочные материалы */}
      {currentQuestion.references && (
        <div className="references-section">
          <h4>Справочные материалы:</h4>
          {currentQuestion.references.map((reference, index) => (
            <div key={index} className="reference">
              <h5>{reference.title}</h5>
              <p>
                {reference.content.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Видео */}
      <div className="videos-section">
        <h4>Видео:</h4>
        <ul>
          {currentQuestion.videos.map((video, index) => (
            <li key={index}>
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Тестовые вопросы для самоконтроля */}
      <div className="test-questions-section">
        <h4>Тестовые вопросы для самоконтроля:</h4>
        {currentQuestion.testQuestions.map((testQuestion, index) => (
          <div key={index} className="test-question">
            <p>{testQuestion.question}</p>
            <ul>
              {testQuestion.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`test-question-${index}`}
                      checked={selectedTestAnswers[index] === optionIndex}
                      onChange={() =>
                        handleTestAnswerSelect(index, optionIndex)
                      }
                      disabled={showTestResults}
                    />
                    {option.text}
                    {showTestResults && (
                      <span
                        className={option.isCorrect ? "correct" : "incorrect"}
                      >
                        {option.isCorrect ? " ✔" : " ✖"}
                      </span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={handleCheckTestAnswers} disabled={showTestResults}>
          Проверить ответы
        </button>
      </div>

      {/* Навигация между вопросами */}
      <div className="navigation-buttons">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Предыдущий вопрос
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === oralExamQuestions.length - 1}
        >
          Следующий вопрос
        </button>
      </div>
    </div>
  );
};

export default OralExamPage;
