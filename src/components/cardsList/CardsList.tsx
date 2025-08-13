import styles from "./CardsList.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchCards, setPage, setCityList } from "../../store/cartSlice";
import { Pagination } from "@mantine/core";
import { useSearchParams, Link } from "react-router-dom";
import CardItem from "../cardItem/CardItem";

const CardsList = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const { data, page, totalPages, searchText, tags, selectedCity } =
    useSelector((state: RootState) => state.card);

  // данные для fetchCards + query — параметры
  useEffect(() => {
    const city = searchParams.get("city") || "";
    const text = searchParams.get("text") || "";
    const skills = searchParams.getAll("skill_set");

    if (city !== null) {
      dispatch(
        fetchCards({ page, searchText: text, tags: skills, selectedCity: city })
      );
      dispatch(setCityList(city));
    }
  }, [dispatch, page, searchText, tags, selectedCity]);

  return (
    <section className={styles.cardsList}>
      {data?.items.map((item) => (
        <CardItem key={item.id} item={item}>
          <Link
            to={`/vacancies/${item.id}?name=nek`}
            className={styles.cardsList__view}
          >
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
