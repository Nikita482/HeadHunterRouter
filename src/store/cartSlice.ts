import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CardsState } from "./cardsTypes";

const initialState: CardsState = {
  data: null,
  page: 0,
  totalPages: 0,
  searchText: "", // поисковая строка
  tags: ["TypeScript", "React", "Redux"],
  cityList: ["Все города", "Москва", "Санкт-Петербург"],
  selectedCity: "", // города
};

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async ({
    page,
    searchText,
    tags,
    selectedCity,
  }: {
    page: number;
    searchText: string;
    tags: string[];
    selectedCity?: string;
  }) => {
    const skillsParam = tags.length
      ? tags.map((tag) => `skill_set=${encodeURIComponent(tag)}`).join("&")
      : "";

    let areaParam = "";
    if (selectedCity === "Москва") areaParam = "area=1";
    else if (selectedCity === "Санкт-Петербург") areaParam = "area=2";

    const response = await fetch(
      `https://api.hh.ru/vacancies?industry=7&professional_role=96&page=${page}&per_page=10&text=${searchText}&${areaParam}&${skillsParam}`
    );

    return await response.json();
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setTags: (state, action) => {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      }
    },
    removeTag: (state, action) => {
      state.tags = state.tags.filter((t) => t !== action.payload);
    },
    setCityList: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.data = action.payload;
      state.totalPages = action.payload.pages;
    });
  },
});

export const { setPage, setSearchText, setTags, removeTag, setCityList } =
  cardsSlice.actions;
export default cardsSlice.reducer;
