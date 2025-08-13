import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import City from "./City";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { vi } from "vitest";

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

describe("City", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      card: {
        cityList: ["Москва", "Санкт-Петербург", "Казань"],
      },
    });
    store.dispatch = vi.fn();
  });

  it("рендерит кнопку 'Все города' и иконку", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <City />
        </Provider>
      </MantineProvider>
    );
    expect(screen.getByText("Все города")).toBeInTheDocument();
    expect(screen.getByAltText("cityIcons")).toBeInTheDocument();
  });

  it("открывает список городов по клику и отображает кнопки городов", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <City />
        </Provider>
      </MantineProvider>
    );
    fireEvent.click(screen.getByText("Все города"));
    expect(screen.getByText("Москва")).toBeInTheDocument();
    expect(screen.getByText("Санкт-Петербург")).toBeInTheDocument();
    expect(screen.getByText("Казань")).toBeInTheDocument();
  });

  it("вызывает dispatch при выборе города", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <City />
        </Provider>
      </MantineProvider>
    );
    fireEvent.click(screen.getByText("Все города"));
    fireEvent.click(screen.getByText("Казань"));
    expect(store.dispatch).toHaveBeenCalled();
  });
});
