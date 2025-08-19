import styles from "./CardsList.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchCards, setPage, setCityList } from "../../store/cartSlice";
import { Pagination, Tabs } from "@mantine/core";
import { useSearchParams, Link } from "react-router-dom";
import CardItem from "../../components/cardItem/CardItem";

const CardsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data, page, totalPages, searchText, tags, selectedCity } =
    useSelector((state: RootState) => state.card);

  useEffect(() => {
    const city = searchParams.get("city") || "Москва";
    dispatch(setCityList(city));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(
      fetchCards({
        page,
        searchText,
        tags,
        selectedCity: selectedCity || "Москва",
      })
    );
  }, [dispatch, page, searchText, tags, selectedCity]);

  const handleTabChange = (value: string | null) => {
    if (!value) return;
    dispatch(setCityList(value));

    const params = new URLSearchParams(searchParams);
    params.set("city", value);
    setSearchParams(params);

    dispatch(fetchCards({ page, searchText, tags, selectedCity: value }));
  };

  return (
    <section className={styles.cardsList}>
      <Tabs
        value={selectedCity || "Москва"}
        onChange={handleTabChange}
        style={{ display: "flex", marginBottom: "36px" }}
      >
        <Tabs.Tab value="Москва" style={{ color: "rgba(15, 15, 16)" }}>
          Москва
        </Tabs.Tab>
        <Tabs.Tab value="Санкт-Петербург" style={{ color: "rgba(15, 15, 16)" }}>
          Санкт-Петербург
        </Tabs.Tab>
      </Tabs>

      {data?.items.map((item) => (
        <CardItem key={item.id} item={item}>
          <Link to={`/vacancies/${item.id}`} className={styles.cardsList__view}>
            Смотреть вакансию
          </Link>
          <button className={styles.cardsList__apply}>Откликнуться</button>
        </CardItem>
      ))}

      <div className={styles.cardsList__pagination}>
        <Pagination
          total={totalPages}
          value={page + 1}
          onChange={(page) => dispatch(setPage(page - 1))}
        />
      </div>
    </section>
  );
};

export default CardsList;
