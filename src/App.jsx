import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import TestPage from "./components/TestPage/TestPage";
import OralExamPage from "./components/OralExamPage/OralExamPage";
import MaterialsPage from "./components/MaterialsPage";
import ProgressPage from "./components/ProgressPage";
import FavoritesPage from "./components/FavoritesPage";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<HomePage />} />

        {/* Модуль тестового тестирования */}
        <Route path="/test" element={<TestPage />} />

        {/* Модуль устного экзамена */}
        <Route path="/oral-exam" element={<OralExamPage />} />

        {/* Модуль теоретических материалов */}
        <Route path="/materials" element={<MaterialsPage />} />

        {/* Модуль прогресса и статистики */}
        <Route path="/progress" element={<ProgressPage />} />

        {/* Модуль избранного */}
        <Route path="/favorites" element={<FavoritesPage />} />

        {/* Модуль пользователя */}
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
