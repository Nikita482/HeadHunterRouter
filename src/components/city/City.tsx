import styles from "./City.module.css";
import { useState } from "react";
import { Collapse } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { setCityList } from "../../store/cartSlice";
import cityIcons from "../../../public/cityIcons.png";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

const City = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const mainBtnRef = useRef<HTMLButtonElement>(null);

  const [opened, setOpened] = useState(false);
  const cityList = useSelector((state: RootState) => state.card.cityList);
  const selectedCity = useSelector(
    (state: RootState) => state.card.selectedCity
  );

  const handleCityClick = (city: string) => {
    dispatch(setCityList(city));

    setOpened(false);

    mainBtnRef.current?.focus();

    if (city && city !== "Все города") {
      const params = new URLSearchParams(searchParams);
      params.set("city", city);
      setSearchParams(params);
    } else {
      const params = new URLSearchParams(searchParams);
      params.delete("city");
      setSearchParams(params);
    }
    setOpened(false);
  };

  return (
    <section className={styles.city}>
      <div className={styles.city__box}>
        <img src={cityIcons} alt="cityIcons" />
        <button
          ref={mainBtnRef}
          className={styles.city__mainBtn}
          onClick={() => setOpened((i) => !i)}
        >
          {selectedCity || "Все города"}
        </button>
      </div>

      <Collapse in={opened}>
        {cityList.map((city) => (
          <button
            key={city}
            className={styles.city__btn}
            onClick={() => handleCityClick(city)}
          >
            {city}
          </button>
        ))}
      </Collapse>
    </section>
  );
};

export default City;
