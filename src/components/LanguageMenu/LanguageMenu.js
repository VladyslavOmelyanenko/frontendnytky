import { NavLink, useLocation } from 'react-router-dom';

import styles from './LanguageMenu.module.scss'

const LanguageMenu = () => {

  const { pathname } = useLocation();


  const getMatchingRoute = (language) => {
    const numberOfDashes = pathname.split("/").length - 1;
    let pathWithoutLanguage;
    if (numberOfDashes >= 2) {
      pathWithoutLanguage = pathname.slice(pathname.indexOf("/", 1));
    } else {
      pathWithoutLanguage = "";
    }
    return "/" + language + pathWithoutLanguage;
  };

  return (
    <ul className={styles.languages}>
      <li className={styles.active}>
        <NavLink
          to={getMatchingRoute("eng")}
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          eng
        </NavLink>
      </li>{" "}
      /
      <li>
        <NavLink
          to={getMatchingRoute("ukr")}
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          укр
        </NavLink>
      </li>
    </ul>
  );
}

export default LanguageMenu;