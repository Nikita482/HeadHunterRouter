import styles from "./homePage.module.css";
import Search from "../../module/search/search";
import Skills from "../../components/skills/Skills";
import CardsList from "../../module/cardsList/CardsList";

const HomePage = () => {
  return (
    <>
      <Search />

      <main className={styles.main}>
        <div className={styles.main__box}>
          <div className={styles.main__filters}>
            <Skills />
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
