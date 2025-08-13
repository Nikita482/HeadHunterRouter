import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { vi } from "vitest";
import Search from "./search";
import configureStore from "redux-mock-store";
import { MantineProvider } from "@mantine/core";
import "@testing-library/jest-dom";

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      };
    };
});

const mockStore = configureStore([]);

describe("Search", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      card: {
        searchText: "",
      },
    });
    store.dispatch = vi.fn();
  });

  it("рендерит заголовок и описание", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <Search />
        </Provider>
      </MantineProvider>
    );
    expect(screen.getByText("Список вакансий")).toBeInTheDocument();
    expect(
      screen.getByText("по профессии Frontend-разработчик")
    ).toBeInTheDocument();
  });

  it("рендерит инпут и кнопку", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <Search />
        </Provider>
      </MantineProvider>
    );
    expect(
      screen.getByPlaceholderText("Должность или название компании")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /найти/i })).toBeInTheDocument();
  });

  it("отправляет экшен при клике на кнопку", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <Search />
        </Provider>
      </MantineProvider>
    );
    const input = screen.getByPlaceholderText(
      "Должность или название компании"
    );
    fireEvent.change(input, { target: { value: "React" } });
    fireEvent.click(screen.getByRole("button", { name: /найти/i }));
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("отображает иконку поиска", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <Search />
        </Provider>
      </MantineProvider>
    );
    expect(screen.getByAltText("Vector")).toBeInTheDocument();
  });
});
