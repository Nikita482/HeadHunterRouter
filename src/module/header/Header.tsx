import styles from "./Header.module.css";
import logo from "../../../public/logo.png";
import user from "../../../public/user-circle.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <img src={logo} alt="Logo" />
        <h1 className={styles.title}>.FrontEnd</h1>
      </div>

      <div className={styles.header__links}>
        <a className={styles.header__link} href="#">
          Вакансии FE
        </a>

        <div className={styles.header__dot}></div>

        <button className={styles.header__btn}>
          <img src={user} alt="user-circle" />
          Обо мне
        </button>
      </div>
    </header>
  );
};

export default Header;
