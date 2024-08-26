import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import NavigationMenu from "../../components/NavigationMenu/NavigationMenu";
import LanguageMenu from "../../components/LanguageMenu/LanguageMenu";



import styles from "./MainPage.module.scss"

const MainPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
  
    const documentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };

    window.addEventListener("resize", documentHeight);
    documentHeight();

    return () => {
      window.removeEventListener("resize", documentHeight);
    };
  }, []);


  return (
    <main className={styles.mainPage}>
      <div className={styles.mainMenu}>
        <NavigationMenu fz={"9vh"} />
      </div>
      <div className={styles.languageMenu}>
        <LanguageMenu />
      </div>
      <div className={styles.footnote}>
        <span>{t("shortProjectDescription")}</span>
        <span className={styles.ornament}>n</span>
      </div>
    </main>
  );
};

export default MainPage;
