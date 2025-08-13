import styles from "./VacancyPage.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CardItem from "../../components/cardItem/CardItem";

const VacancyPage = () => {
  const { data } = useSelector((state: RootState) => state.card);

  const { id } = useParams();
  const vacancy = data?.items.find((item) => item.id === id);
  console.log(vacancy);

  return (
    <div className={styles.wrapper}>
      <CardItem item={vacancy}>
        <button className={styles.wrapper__apply}>Откликнуться на hh.ru</button>
      </CardItem>

      <div className={styles.wrapper__info}>
        <h3>Компания</h3>
        <p className={styles.wrapper__text}>
          Привет! Мы — {vacancy?.employer?.name}, компания из{" "}
          {vacancy?.area?.name}. Мы создаём современные проекты, используя
          передовые технологии и подходы к разработке. Каждый наш новый проект -
          уникальный, потому что мы занимаемся заказной разработкой (B2G),
          работаем с highload системами, сервис-ориентированной архитектурой и
          используем современные фреймворки и технологии.
        </p>
        <h3 style={{ marginTop: "10px" }}>О проекте</h3>
        <p className={styles.wrapper__text}>
          Мы ищем {vacancy?.name} для работы с{" "}
          {vacancy?.snippet?.requirement?.toLowerCase()}. Если у тебя нет опыта,
          но есть желание учиться — мы поможем тебе расти и развиваться.
        </p>
      </div>
    </div>
  );
};

export default VacancyPage;
