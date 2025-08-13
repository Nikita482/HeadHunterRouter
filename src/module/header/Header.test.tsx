import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Header", () => {
  it("рендерит логотип и заголовок", () => {
    render(<Header />);
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByText(/\.FrontEnd/i)).toBeInTheDocument();
  });

  it("рендерит ссылку 'Вакансии FE'", () => {
    render(<Header />);
    expect(screen.getByText(/Вакансии FE/i)).toBeInTheDocument();
  });

  it("рендерит кнопку 'Обо мне' с иконкой", () => {
    render(<Header />);
    expect(screen.getByText(/Обо мне/i)).toBeInTheDocument();
    expect(screen.getByAltText(/user-circle/i)).toBeInTheDocument();
  });
});
