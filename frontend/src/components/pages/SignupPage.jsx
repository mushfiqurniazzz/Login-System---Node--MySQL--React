//importing necessarry libraries for signup function
import { useState, useEffect } from "react"; //use state for state variables
import axios from "axios"; //axios for communication with backend
import { toast } from "sonner"; //sonner for toast notification
import styles from "../styles/Signup.module.css"; //module css import
import { Link, useHistory } from "react-router-dom"; //funcions from library

//creation of the sign up component function
function SignupPage() {
  //state variables declaration using useState
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); //for dinamically changing the path

  useEffect(() => {
    document.title = "Login System - SignUp Page"; //dinamically changes the tittle
  });

  //axios post function which will first check for valid input, send a post request and then use sonner to render a toast notification
  const handleSignup = async (e) => {
    e.preventDefault(); //disables the reload on submission
    try {
      //check if user has filled all required fields
      if (
        !username ||
        username === "" ||
        !email ||
        email === "" ||
        !password ||
        password === ""
      ) {
        //incase all fields are not filled warn the user
        toast.warning("All Fields are Required");
        return; //return if the the case matches
      }

      //if user has filled all necessary fields send axios post request
      const res = await axios.post("http://localhost:3000/auth/signup", {
        username: username,
        email: email,
        password: password
      });

      //on successful account creation
      if (res.status === 201) {
        setUsername(""); //empty the field after successful signup
        setEmail(""); //empty the field after successful signup
        setPassword(""); //empty the field after successful signup
        //notify the client that the user has been created
        toast.success("User Created Sucessfully, Redirecting...");
      }

      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (error) {
      //incase of error
      console.error("Error Creating User: ", error);
      toast.error("Error Creating User");
    }
  };

  //bootstrap components
  return (
    <>
      <div className={"card"} id={styles.card}>
        <div className={"card-body"}>
          <h2 id={styles.h2}>SignUp</h2>
          <hr />
          <form onSubmit={handleSignup}>
            {/* for Username */}
            <div>
              <label>Username : </label>
              <input
                type="text"
                name="username"
                placeholder={"Enter Username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* for Email */}
            <div>
              <label>Email : </label>
              <input
                type="email"
                name="email"
                placeholder={"Enter Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* for Password */}
            <div>
              <label>Password : </label>
              <input
                type="password"
                name="password"
                placeholder={"Enter Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* submit and switch to login buttons */}

            {/* login */}
            <a>
              <Link to="/login">Have an account? LogIn</Link>
            </a>

            {/* signup */}
            <button className={"btn btn-success"} type="submit">
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

//exporting the created signup function to be used as a route in the app.jsx file
export default SignupPage;
