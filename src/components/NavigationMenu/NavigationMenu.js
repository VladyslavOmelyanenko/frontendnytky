import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Language from "../../hooks/Language";

import menuBackground from "./newupdatedmenu.png";

import styles from "./NavigationMenu.module.scss";

const NavigationMenu = ({fz}) => {
  
  const { t } = useTranslation();
  const currentLanguage = Language();


  return (
    <>
      <nav className={styles.navigationMenu}>
        <img src={menuBackground} alt="Menu Background"></img>
        <ul className={styles.menuLinks} style={{ fontSize: fz }}>
          <li>
            <NavLink
              to={`/${currentLanguage}`}
              end
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.nytky}` : styles.nytky
              }
            >
              {t("NYTKY")}*
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${currentLanguage}/about`}
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.about}` : styles.about
              }
            >
              {t("About")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${currentLanguage}/collaboration`}
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.collaboration}`
                  : styles.collaboration
              }
            >
              {t("Collaboration")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${currentLanguage}/workshops`}
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.events}` : styles.events
              }
            >
              {t("Workshops")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${currentLanguage}/embroidery-circles`}
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.embroideryCircles}`
                  : styles.embroideryCircles
              }
            >
              <span>{t("Embroidery")}</span>
              <span>{t("Circles")}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationMenu;
