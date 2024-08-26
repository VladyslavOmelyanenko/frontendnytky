import styles from './EventsSection.module.scss'

const EventsSection = () => {
  return (
    <>
      <h3 className={styles.eventsHeading}>Upcoming events</h3>
      <ul className={styles.futureEvents}>
        <li>
          <span>Saturday 4 May</span>
          <span className={styles.location}>Alleman wijkcentrum, Amstelveen</span>
        </li>
        <li>
          <span>Saturday 11 May</span>
          <span className={styles.location}>Alleman wijkcentrum, Amstelveen</span>
        </li>
        <li>
          <span>Saturday 18 May</span>
          <span className={styles.location}>Alleman wijkcentrum, Amstelveen</span>
        </li>
      </ul>
      <div className={styles.signUpLink}>
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSfT6HdkpvC2pGq82UFU--TBD8qPMrJyn7YXsVGD3Wec_h81PA/viewform' target="_blank" rel='noreferrer'>
          Sign up
        </a>
      </div>

      <h3 className={styles.eventsHeading}>Past events</h3>
      <ul className={styles.pastEvents}>
        <li>
          <span>27–12–2023</span>
          <span className={styles.location}>De Riekerhof, Amsterdam</span>
        </li>
        <li>
          <span>27–12–2023</span>
          <span className={styles.location}>De Riekerhof, Amsterdam</span>
        </li>
        <li>
          <span>27–12–2023</span>
          <span className={styles.location}>De Riekerhof, Amsterdam</span>
        </li>
      </ul>
    </>
  );
}

export default EventsSection;