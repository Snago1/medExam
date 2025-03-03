import React from "react";
import oralQuestions from "../data/oralQuestions.json";

const OralExamPage = () => {
  return (
    <div>
      <h2>Устный экзамен</h2>
      {oralQuestions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <p>Категория: {question.category}</p>
          <p>Сложность: {question.difficulty}</p>
          <h4>Связанные материалы:</h4>
          <ul>
            {question.relatedInfo.map((info, i) => (
              <li key={i}>
                <strong>{info.title}</strong>: {info.content} (Источник:{" "}
                {info.source})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OralExamPage;
