import styles from "../styles/Special.module.css";

function SpecialPage() {
  return (
    <>
      <div className={styles.container}>
        <div id={styles.div}>
          <h1 id={styles.h1}>Special Page</h1>
          <hr />
          <p id={styles.p}>
            This is the special page which can only be accessed by a token.
          </p>
        </div>
      </div>
    </>
  );
}

export default SpecialPage;
