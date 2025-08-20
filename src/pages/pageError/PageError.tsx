import styles from "./pageError.module.css";
import { Link } from "react-router-dom";
import cat from "../../../public/cat.png";

const PageError = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__head}>
        <div className={styles.wrapper__text}>
          <h1>Упс! Такой страницы не существует</h1>
          <p>Давайте перейдём к началу.</p>
        </div>

        <div className={styles.wrapper__btnBox}>
          <Link to="/" className={styles.wrapper__btn}>
            На главную
          </Link>
        </div>
      </div>

      <img src={cat} alt="foto_cat" />
    </div>
  );
};

export default PageError;
