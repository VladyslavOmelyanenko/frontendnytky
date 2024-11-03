import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Language from '../../hooks/Language';
import { useTranslation } from 'react-i18next';

import LanguageMenu from '../LanguageMenu/LanguageMenu';

import styles from './MobileNavigation.module.scss'

const MobileNavigation = () => {

  const [isMenuActive, setIsMenuActive] = useState(false);


  const { t } = useTranslation();
  const currentLanguage = Language();
  const menu = useRef();
  
  const clickTheMenu = () => {
    const menuList = menu.current;
    if (isMenuActive === false) {
      menuList.style.display = "flex";
      setIsMenuActive(true);
    } else {
      menuList.style.display = "none";
      setIsMenuActive(false);
    }
  };

  return (
    <nav className={styles.mobileNavbar}>
      <div className={styles.navButton}>
        <button onClick={clickTheMenu}>Menu</button>
        <LanguageMenu />
      </div>
      <ul className={styles.menu} ref={menu}>
        <li>
          <NavLink
            to={`/${currentLanguage}`}
            end
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.nytky}` : styles.nytky
            }
          >
            {t("Main Page")}
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
            to={`/${currentLanguage}/new-designs`}
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles.collaboration}`
                : styles.collaboration
            }
          >
            {t("New Designs")}
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
  );
}

export default MobileNavigation;