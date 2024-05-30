//this is a simple 404 page with some custom styling and routing
import { useEffect } from "react";
import styles from "../styles/Page.module.css";
import { Link } from "react-router-dom";

//404 page component function start
function Page() {
  useEffect(() => {
    document.title = "Login System - 404 Page"; //dinamically changes the tittle
  });
  return (
    <>
      <div className={styles.container}>
        <div id={styles.div}>
          <h1 id={styles.h1}>404</h1>
          <hr />
          <p id={styles.p}>
            This page doesn&apos;t exist return to &apos;
            <Link to="/">HOME PAGE</Link>&apos;
          </p>
        </div>
      </div>
    </>
  );
}

//exporting the created function
export default Page;
