import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import VacancyPage from "./pages/vacancyPage/VacancyPage";
import Header from "./module/header/Header";

// 123
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vacancies/:id" element={<VacancyPage />} />
      </Routes>
    </>
  );
}

export default App;
