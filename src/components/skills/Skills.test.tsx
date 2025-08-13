import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import Skills from "./Skills";
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

describe("Skills", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      card: {
        tags: ["React", "TypeScript"],
      },
    });
    store.dispatch = vi.fn();
  });

  it("рендерит заголовок и поле для ввода", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <Skills />
        </Provider>
      </MantineProvider>
    );
    expect(screen.getByText("Ключевые навыки")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Навык")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("рендерит добавленные навыки", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <Skills />
        </Provider>
      </MantineProvider>
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("вызывает dispatch при добавлении навыка через Enter", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <Skills />
        </Provider>
      </MantineProvider>
    );
    const input = screen.getByPlaceholderText("Навык");
    fireEvent.change(input, { target: { value: "Redux" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("вызывает dispatch при добавлении навыка через кнопку", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <Skills />
        </Provider>
      </MantineProvider>
    );
    const input = screen.getByPlaceholderText("Навык");
    fireEvent.change(input, { target: { value: "Jest" } });
    fireEvent.click(screen.getByText("+"));
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("вызывает dispatch при удалении навыка", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <Skills />
        </Provider>
      </MantineProvider>
    );
    const pill = screen.getByText("React");
    const removeBtn = pill.parentElement?.querySelector("button");
    fireEvent.click(removeBtn!);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
