export type VacancyItem = {
  id: string;
  name: string;
  address?: { city?: string };
  area?: { name: string };
  snippet?: { requirement: string };
  salary?: {
    from?: number;
    to?: number;
    currency?: string;
  };
  experience: { name: string };
  employer: { name: string };
  work_format: {
    id: string;
    name: string;
  }[];
};

export type VacanciesResponse = {
  items: VacancyItem[];
  pages: number;
};

export type CardsState = {
  data: VacanciesResponse | null;
  page: number;
  totalPages: number;
  searchText: string;
  tags: string[];
  cityList: string[];
  selectedCity?: string;
};
