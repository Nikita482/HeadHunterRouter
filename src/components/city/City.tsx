import styles from "./City.module.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { setCityList } from "../../store/cartSlice";
import cityIcons from "../../../public/cityIcons.png";
import { useSearchParams } from "react-router-dom";
import { Select } from "@mantine/core";

const City = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const cityList = useSelector((state: RootState) => state.card.cityList);
  const selectedCity = useSelector(
    (state: RootState) => state.card.selectedCity
  );

  const handleCityClick = (city: string) => {
    dispatch(setCityList(city));

    if (city && city !== "Все города") {
      const params = new URLSearchParams(searchParams);
      params.set("city", city);
      setSearchParams(params);
    } else {
      const params = new URLSearchParams(searchParams);
      params.delete("city");
      setSearchParams(params);
    }
  };

  return (
    <section className={styles.city}>
      <Select
        placeholder="Все города"
        value={selectedCity || null}
        data={cityList}
        onChange={(value) => {
          if (value) {
            handleCityClick(value);
          }
        }}
        leftSection={<img src={cityIcons} alt="cityIcons" />}
        rightSectionPointerEvents="none"
      />
    </section>
  );
};

export default City;
