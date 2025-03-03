import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Импорт CSS

const HomePage = () => {
  return (
    <div className="home-page">
      <h1> MedExam Prep!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/test">Тестовое тестирование</Link>
          </li>
          <li>
            <Link to="/oral-exam">Устный экзамен</Link>
          </li>
          <li>
            <Link to="/materials">Теоретические материалы</Link>
          </li>
          <li>
            <Link to="/progress">Прогресс и статистика</Link>
          </li>
          <li>
            <Link to="/favorites">Избранное</Link>
          </li>
          <li>
            <Link to="/profile">Профиль</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
