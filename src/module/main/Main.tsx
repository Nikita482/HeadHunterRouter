import styles from "./Main.module.css";
import Skills from "../../components/skills/Skills";
import City from "../../components/city/City";
import CardsList from "../../components/cardsList/CardsList";

const Main = () => {
  return (
    <main className={styles.main}>
      <div className={styles.main__box}>
        <div className={styles.main__filters}>
          <Skills />
          <City />
        </div>
      </div>

      <div className={styles.main__cards}>
        <CardsList />
      </div>
    </main>
  );
};

export default Main;
