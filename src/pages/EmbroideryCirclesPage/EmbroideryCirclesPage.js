import { PortableText } from "@portabletext/react";
import { useState, useEffect } from "react";

import NavigationMenu from "../../components/NavigationMenu/NavigationMenu";
import MobileNavigation from "../../components/MobileNavigation/MobileNavigation";
import LanguageMenu from "../../components/LanguageMenu/LanguageMenu";

import Language from "../../hooks/Language";
import useFetchData from "../../hooks/useFetchData";

import styles from "./EmbroideryCirclesPage.module.scss";

const EmbroideryCirclesPage = () => {
  const language = Language();

  const GROQ_QUERY =
    language &&
    `*[_type == "embroideryCircles" && language == '${language}']{
    _id, info
  }`;

  const data = useFetchData(GROQ_QUERY);
  data && console.log(data);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <main>
      <section className={styles.navigationSection}>
        {isMobile ? <MobileNavigation /> : <NavigationMenu fz={"40px"} />}
      </section>
      <section className={styles.mainInfo}>
        {data && (
          <div>
            <PortableText value={[...data.info]} />
          </div>
        )}
        {/* <>
          <h2>Resources</h2>
          <h3>Nytky Project</h3>
          <ul>
            <li>
              <a>Project page on Instagram</a>
            </li>
            <li>
              <a>Pinterest board for inspiration</a>
            </li>
          </ul>
          <h3>Image Archives</h3>
          <ul>
            <li>
              <a>Collection of the Honchar Museum</a>
            </li>
            <li>
              <a>
                Embroidery expert Olga Kapko has a wealth of regional ornaments
                and embroidery schemes on her Pinterest board
              </a>
            </li>
            <li>
              <a>Rushnyks of Volyn and Podillya</a>
            </li>
            <li>
              <a>Ethnographic collection "KROVETS"</a>
            </li>
            <li>
              <a>Magazine Ukrainian embroidery"</a>
            </li>
          </ul>
          <h3>Online Courses</h3>
          <ul>
            <li>
              <a>Prekrasa Studio"</a>
            </li>
          </ul>
        </> */}
      </section>
      {!isMobile && (
        <div className={styles.languageMenu}>
          <LanguageMenu />
        </div>
      )}
    </main>
  );
};

export default EmbroideryCirclesPage;
