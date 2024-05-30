//importing functions and libraries to create this home page which will push to login to get the token
import { useEffect, useRef } from "react"; //react functions
import styles from "../styles/Special.module.css"; //module css import
import { useHistory } from "react-router-dom"; //dinamically push to different path without reloading the page
import { toast } from "sonner"; //import toast notification

//creating the functional component
function SpecialPage() {
  const history = useHistory(); //declaring for easy use and readability
  const toastWarningMessage = useRef(false); //for toast notification rendering once

  useEffect(() => {
    document.title = "Login System - Special Page"; //dinamically changes the tittle
    //this function will be called after the component is rendered
    const checkIfToken = localStorage.getItem("token"); //check for token
    if (!checkIfToken || checkIfToken === null) {
      //if token doesn't exist
      if (toastWarningMessage.current === false) {
        //if toast is not called
        toast.warning("No 'Token' Found | Please LogIn first");
        toastWarningMessage.current = true;
      }
      setTimeout(() => {
        //after 2sec push to /login
        history.push("/login");
      }, 2000);
    }
  });

  //jsx code here
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
//exporting the function component
export default SpecialPage;
