import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Language from "../../hooks/Language";

import menuBackground from "./newmenu.png";

import styles from "./NavigationSidebar.module.scss";

const NavigationSidebar = ({fz}) => {
  
  const { t } = useTranslation();
  const currentLanguage = Language();


  return (
    <>
      <nav className={styles.navigationMenu}>
        <img src={menuBackground} alt="Menu Background"></img>
        <ul className={styles.menuLinks} style={{ fontSize: 80 +'px' }}>
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
              to={`/${currentLanguage}/events`}
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.events}` : styles.events
              }
            >
              {t("Events")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${currentLanguage}/embroidery-circles`}
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.embroideryCircles}` : styles.embroideryCircles
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

export default NavigationSidebar;
