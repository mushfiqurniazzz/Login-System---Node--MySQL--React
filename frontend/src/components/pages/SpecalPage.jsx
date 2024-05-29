import styles from "../styles/Special.module.css";
import { useHistory } from "react-router-dom";
function SpecialPage() {
  const history = useHistory();

  const checkIfToken = localStorage.getItem("token");
  if (!checkIfToken || checkIfToken === null) {
    history.push("/login");
  }
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
