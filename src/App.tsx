import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import VacancyPage from "./pages/vacancyPage/VacancyPage";
import Header from "./module/header/Header";
import PageError from "./pages/pageError/PageError";

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
    errorElement: (
      <>
        <Header />
        <PageError />
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
    errorElement: (
      <>
        <Header />
        <PageError />
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
