import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import CardsList from "./CardsList";
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

const mockData = {
  items: [
    {
      id: "1",
      name: "Frontend Developer",
      salary: { from: 100000, to: 150000, currency: "₽" },
      experience: { name: "1-3 года" },
      employer: { name: "ООО Рога и Копыта" },
      work_format: [
        { id: "ON_SITE", name: "Офис" },
        { id: "REMOTE", name: "Можно удалённо" },
      ],
      address: { city: "Москва" },
    },
  ],
};

describe("CardsList", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      card: {
        data: mockData,
        page: 0,
        totalPages: 3,
        searchText: "",
        tags: [],
        selectedCity: "",
      },
    });
    store.dispatch = vi.fn();
  });

  it("рендерит список карточек и данные вакансии", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <CardsList />
        </Provider>
      </MantineProvider>
    );
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("ООО Рога и Копыта")).toBeInTheDocument();
    expect(screen.getByText("1-3 года")).toBeInTheDocument();
    expect(screen.getByText("100 000 - 150 000 ₽")).toBeInTheDocument();
    expect(screen.getByText("Москва")).toBeInTheDocument();
    expect(screen.getByText("Офис")).toBeInTheDocument();
    expect(screen.getByText("Можно удалённо")).toBeInTheDocument();
  });

  it("рендерит кнопки 'Смотреть вакансию' и 'Откликнуться'", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <CardsList />
        </Provider>
      </MantineProvider>
    );
    expect(screen.getByText("Смотреть вакансию")).toBeInTheDocument();
    expect(screen.getByText("Откликнуться")).toBeInTheDocument();
  });

  it("рендерит пагинацию и вызывает dispatch при смене страницы", () => {
    render(
      <MantineProvider>
        <Provider store={store}>
          <CardsList />
        </Provider>
      </MantineProvider>
    );
    const pageBtn = screen.getByRole("button", { name: "2" });
    expect(pageBtn).toBeInTheDocument();
    fireEvent.click(pageBtn);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
