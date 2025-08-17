import styles from "./homePage.module.css";
import Search from "../../module/search/search";
import Skills from "../../components/skills/Skills";
import City from "../../components/city/City";
import CardsList from "../../module/cardsList/CardsList";

const HomePage = () => {
  return (
    <>
      <Search />

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
    </>
  );
};

export default HomePage;
