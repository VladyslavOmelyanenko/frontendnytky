import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import MobileNavigation from "../../components/MobileNavigation/MobileNavigation";
import LanguageMenu from "../../components/LanguageMenu/LanguageMenu";

import Language from "../../hooks/Language";
import useFetchData from "../../hooks/useFetchData";



import img1 from './1.png'
import img2 from './2.png'
import img3 from './3.png'
import img4 from './4.png'


import styles from './EventsPage.module.scss'

const EventsPage = () => {
  
  const language = Language();
  const { t } = useTranslation();

  const GROQ_QUERY = language && `*[_type=="events" && language== "${language}"]{
    EventsDates[]{
      date,
      times,
      place
    } 
  }`;

  const events = useFetchData(GROQ_QUERY);
  events && console.log(events);

  const pastEvents = [];
  const futureEvents = [];

  events && events.EventsDates.forEach(event => {
    const currentDate = new Date();
    const eventDate = Date.parse(event.date);
    if (currentDate > eventDate) {
      pastEvents.push(event);
    } else {
      futureEvents.push(event);
    }
  })

  const monthsNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];


  
  // const pastEvents = events.filter(event => event.date)
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
    <main className={styles.main}>
      <section className={styles.navigationSection}>
        {isMobile ? <MobileNavigation /> : <NavigationMenu fz={"40px"} />}
      </section>
      <section className={styles.mainInfo}>
        <section className={styles.events}>
          <h2 className={styles.eventsTitle}>{t("Future events")}</h2>
          <ul className={styles.futureEvents}>
            {events &&
              futureEvents.map((event) => (
                <li>
                  {new Date(event.date).getDate() +
                    " " +
                    t(monthsNames[new Date(event.date).getMonth()]) +
                    " " +
                    event.times +
                    "—" +
                    event.place}
                </li>
              ))}
          </ul>
          <a
            className={styles.signUpButton}
            href="https://docs.google.com/forms/d/e/1FAIpQLSfT6HdkpvC2pGq82UFU--TBD8qPMrJyn7YXsVGD3Wec_h81PA/viewform"
            target="_blank"
            rel="noreferrer"
          >
            {t("Sign up")}
          </a>
          <h2 className={styles.eventsTitle}>{t("Past events")}</h2>
          <ul className={styles.pastEvents}>
            {events &&
              pastEvents.map((event) => (
                <li>
                  {new Date(event.date).getDate() +
                    " " +
                    t(monthsNames[new Date(event.date).getMonth()]) +
                    "—" +
                    event.place}
                </li>
              ))}
          </ul>
        </section>
        <section className={styles.archive}>
          <h3>
            January 20 <br></br> Botel, Amsterdam
          </h3>
          <div className={styles.images}>
            <img src={img1} alt=""></img>
            <img src={img2} alt=""></img>
            <img src={img3} alt=""></img>
            <img src={img4} alt=""></img>
          </div>
          <h3>
            January 20 <br></br> Botel, Amsterdam
          </h3>
          <div className={styles.images}>
            <img src={img1} alt=""></img>
            <img src={img2} alt=""></img>
            <img src={img3} alt=""></img>
            <img src={img4} alt=""></img>
          </div>
        </section>
      </section>
      {!isMobile && (
        <div className={styles.languageMenu}>
          <LanguageMenu />
        </div>
      )}
    </main>
  );
}

export default EventsPage; 