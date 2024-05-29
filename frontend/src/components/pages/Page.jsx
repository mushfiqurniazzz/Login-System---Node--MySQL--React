//this is a simple 404 page with some custom styling
import styles from "../styles/Page.module.css";

function Page() {
  return (
    <>
      <div className={styles.container}>
        <div id={styles.div}>
          <h1 id={styles.h1}>404</h1>
          <hr />
          <p id={styles.p}>
            This page doesn&apos;t exist returning to &apos;HOME PAGE&apos;
          </p>
        </div>
      </div>
    </>
  );
}

export default Page;
