import React, { useEffect, useRef, useState } from 'react';
import { PortableText } from "@portabletext/react";


import Language from "../../hooks/Language";
import useFetchData from "../../hooks/useFetchData";
import NavigationMenu from "../../components/NavigationMenu/NavigationMenu";
import MobileNavigation from '../../components/MobileNavigation/MobileNavigation';
import LanguageMenu from '../../components/LanguageMenu/LanguageMenu';

import styles from './AboutPage.module.scss';

const AboutPage = () => {
  const containerToScroll = useRef(null)
  const language = Language();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);


  const GROQ_QUERY = language && `*[_type == "about" && language == '${language}']{
    _id,aboutText
  }`;

  const data = useFetchData(GROQ_QUERY);
  data && console.log(data);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  })
  return (
    <>
      <main ref={containerToScroll} className={styles.main}>
        <section className={styles.navigationSection}>
          {isMobile ? <MobileNavigation /> : <NavigationMenu fz={'40px'} />}
        </section>
        <section className={styles.mainSectionWrapper}>
          <div className={styles.mainSection}>
            {data && (
              <div>
                <PortableText value={[...data.aboutText]} />
              </div>
            )}
          </div>
        </section>

        {!isMobile && <div className={styles.languageMenu}>
          <LanguageMenu />
        </div>}
      </main>
    </>
  );
}

export default AboutPage;