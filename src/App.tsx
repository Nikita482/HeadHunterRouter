import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import VacancyPage from "./pages/vacancyPage/VacancyPage";
import Header from "./module/header/Header";

import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <HomePage />
      </>
    ),
  },
  {
    path: "/vacancies/:id",
    element: (
      <>
        <Header />
        <VacancyPage />
      </>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
