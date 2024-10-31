import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";



import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import MobileNavigation from "../../components/MobileNavigation/MobileNavigation";
import LanguageMenu from "../../components/LanguageMenu/LanguageMenu";

import Language from "../../hooks/Language";
import useFetchData from "../../hooks/useFetchData";


import styles from './EventsPage.module.scss'

const EventsPage = () => {
  
  const language = Language();
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const returnButtonRef = useRef(null);



 const GROQ_QUERY = language && `*[_type == "events" && language == "${language}"]{
  EventsDates[]{
    date,
    times,
    place,
    "images": eventImagesRef->eventImages[]{ 'imageUrl': asset->url }
  }
}`;


  const events = useFetchData(GROQ_QUERY);
  console.log(events);

  const pastEvents = [];
  const futureEvents = [];
  const eventsWithPhotos = events && events.EventsDates.filter((event) => {
    return (!!event.images)
  })

  console.log(eventsWithPhotos)

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


  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

   const scrollBack = () => {
     const container = scrollContainerRef.current;
     container.scrollTo({
       left: 0,
       behavior: "smooth",
     });
     returnButtonRef.current.style.display = "none";
   };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleWheel = (event) => {
      if (!isMobile) {
        event.preventDefault();
       if (scrollContainerRef.current) {
         const container = scrollContainerRef.current;
         if (container.scrollLeft > 360) {
           returnButtonRef.current.style.display = "flex";
         } else {
           returnButtonRef.current.style.display = "none";
         }

         event.preventDefault();
         container.scrollLeft += event.deltaY;
       }
      }
    };

    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  });


  return (
    <main className={styles.main} ref={scrollContainerRef}>
      <section className={styles.navigationSection}>
        {isMobile ? <MobileNavigation /> : <NavigationMenu fz={"37px"} />}
      </section>
      <section className={styles.mainInfo}>
        <section className={styles.events}>
          {futureEvents.length > 0 && (
            <>
              <h2 className={styles.eventsTitle}>{t("Future workshops")}</h2>
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
            </>
          )}
          <h2 className={styles.eventsTitle}>{t("Past workshops")}</h2>
          <ul className={styles.pastEvents}>
            {events &&
              pastEvents.reverse().map((event) => (
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
          {eventsWithPhotos &&
            eventsWithPhotos.map((event) => {
              return (
                <>
                  <h3>
                    {new Date(event.date).getDate() +
                      " " +
                      t(monthsNames[new Date(event.date).getMonth()])}
                    <br></br>
                    {event.place}
                  </h3>
                  <div className={styles.images}>
                    {event.images.map((image, i) => (
                      <img
                        src={image.imageUrl}
                        alt={event.date + "image" + i}
                      ></img>
                    ))}
                  </div>
                </>
              );
            })}
        </section>
      </section>
      {!isMobile && (
        <div className={styles.languageMenu}>
          <LanguageMenu />
          <div
            className={styles.returnButton}
            ref={returnButtonRef}
            onClick={() => scrollBack()}
          >
            <svg
              id="b"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 131.91 24.24"
            >
              <g id="c">
                <path d="m25.48,23.13c-.1.22-.24.42-.43.6-.19.18-.41.3-.65.38-.24.08-.49.12-.74.12s-.5-.06-.72-.19L1.1,13.82c-.51-.22-.85-.61-1.01-1.15-.16-.54-.11-1.06.14-1.54.22-.35.51-.61.86-.77L22.94.19c.48-.22.97-.25,1.46-.07.5.18.86.5,1.08.98.22.48.25.97.07,1.46-.18.5-.5.86-.98,1.08L6.48,12.09l18.1,8.5c.32.13.58.34.77.62s.3.6.34.94c.03.34-.03.66-.19.98Z" />
                <path d="m61.28,15.33c-.02.35-.13.67-.32.94-.19.28-.44.5-.73.65-.3.16-.62.23-.97.21l-14.43-.79-14.47-.89c-.51-.03-.95-.25-1.31-.65s-.53-.86-.5-1.38c.02-.35.13-.67.32-.94.19-.28.44-.5.73-.65.3-.16.62-.23.97-.21l14.47.89,14.43.79c.51.03.95.25,1.31.65.36.41.53.86.5,1.37Z" />
                <path d="m97.51,10.5c.08.34.07.67-.03,1-.1.32-.27.6-.51.84-.24.24-.53.4-.87.48l-14.03,3.47-14.1,3.39c-.5.12-.98.04-1.44-.24s-.76-.67-.88-1.17c-.08-.34-.07-.67.03-1,.1-.32.27-.6.51-.84.24-.24.53-.4.87-.48l14.1-3.39,14.03-3.47c.5-.12.98-.04,1.44.24.46.28.76.67.88,1.17Z" />
                <path d="m131.69,22.19c-.17.31-.4.55-.69.72-.29.17-.61.26-.94.28-.34.02-.66-.06-.97-.23l-12.73-6.84-12.72-6.95c-.45-.24-.75-.63-.91-1.15s-.11-1.01.13-1.46c.17-.31.4-.55.69-.72.29-.17.61-.26.94-.28.34-.02.66.06.97.22l12.72,6.95,12.73,6.84c.45.24.75.63.91,1.15.16.52.11,1.01-.13,1.46Z" />
              </g>
            </svg>
            {t("Return")}
          </div>
        </div>
      )}
    </main>
  );
}

export default EventsPage; 