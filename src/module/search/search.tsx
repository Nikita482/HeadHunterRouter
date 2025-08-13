import styles from "./search.module.css";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../store/cartSlice";
import { useState } from "react";
import { Button } from "@mantine/core";
import vector from "../../../public/Vector.png";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const [inputText, setInputText] = useState("");

  // При изменении параметра text из URL обновляется inputText
  useEffect(() => {
    const textFromUrl = searchParams.get("text") || "";
    setInputText(textFromUrl);
    dispatch(setSearchText(textFromUrl));
  }, [searchParams, dispatch]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__boxTitle}>
        <h2>Список вакансий</h2>
        <p>по профессии Frontend-разработчик</p>
      </div>

      <div className={styles.wrapper__boxSearch}>
        <img className={styles.wrapper__icon} src={vector} alt="Vector" />

        <input
          type="text"
          placeholder="Должность или название компании"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <Button
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set("text", inputText);
            setSearchParams(params);
          }}
        >
          Найти
        </Button>
      </div>
    </section>
  );
};

export default Search;
