//importing neccessary functions and libraries to be using in the controller functions
const bcrypt = require("bcryptjs"); //for hashing user's password
const token = require("../utils/jwt");

//async await signup function which checks if all the input fields are filled then hashes the password to save it in the database using a query
const SignUpController = async (req, res) => {
  //declaration of variables from req.body
  const { username, email, password } = req.body;

  //checking if we get valid input
  if (
    !username ||
    username === "" ||
    !email ||
    email === "" ||
    !password ||
    password === ""
  ) {
    //returning an error message in case of invalid input
    return res.status(400).send("All Fields are Required");
  }
  //using try catch block from here for using await keyword
  try {
    //checking if user with same username exists
    const [
      checkUsername
    ] = await req.pool.query(
      `SELECT COUNT(*) AS count FROM ${process.env
        .DB_TABLENAME} WHERE username = ?`,
      [username]
    );
    if (checkUsername[0].count > 0) {
      return res.status(400).send("User with same username already exists");
    }

    //checking if user with same email exists
    const [
      checkEmail
    ] = await req.pool.query(
      `SELECT COUNT(*) AS count FROM ${process.env
        .DB_TABLENAME} WHERE email = ?`,
      [email]
    );
    if (checkEmail[0].count > 0) {
      return res.status(400).send("User with same email already exists");
    }

    //if we dont get any error, now we continue with hashing password and then saving users

    //hashing the password
    const salt = await bcrypt.genSalt(10); // define the salt rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    //inserting the user
    const [insertUser] = await req.pool.query(
      `INSERT INTO \`${process.env
        .DB_TABLENAME}\` (username, email, password) VALUES (?, ?, ?)`,
      [username, email, hashedPassword]
    );

    //sending a success response
    // res.send("User Created");
    res.status(201).json({ id: insertUser.insertId, username, email });
  } catch (error) {
    // basic error handling
    console.error("Error during signup:", error); // log the error
    res.status(500).send("Internal Server Error"); // return a 500 response in case of error
  }
};

//async await login function which checks if all the input fields are filled then compares the hashed password saved in the database and sends a json web token if is successful
const LoginController = async (req, res) => {
  //declaration of variables from req.body
  const { username, password } = req.body;

  //checking if we get valid input
  if (!username || username === "" || !password || password === "") {
    //returning an error message in case of invalid input
    return res.status(400).send("All Fields are Required");
  }
  //using try catch block from here for using await keyword
  try {
    //checking if user with same username exists
    const [
      checkUsername
    ] = await req.pool.query(
      `SELECT COUNT(*) AS count FROM ${process.env
        .DB_TABLENAME} WHERE username = ?`,
      [username]
    );
    if (checkUsername[0].count === 0) {
      return res.status(400).send("User with this username doesn't exist");
    }

    //selecting the user with the same username
    const [checkUserpassword] = await req.pool.query(
      `SELECT * FROM ${process.env.DB_TABLENAME} WHERE username = ?`,
      [username]
    );
    //the first user is the only user with the same username
    const foundUser = checkUserpassword[0];

    //comparing the password with the hashed password in the database
    const matchPassword = await bcrypt.compare(password, foundUser.password);

    //if we dont get any error or the matchPassword doen't return false, now we continue with sending a json web token to the user

    //if the matchpassword returns false
    if (!matchPassword) {
      return res.status(401).send("Incorrect Password");
    } else {
      res.status(200)
      //more information about the token function in utils/jwt
      token(foundUser, res);
    }
  } catch (error) {
    // basic error handling
    console.error("Error during login:", error); // log the error
    res.status(500).send("Internal Server Error"); // return a 500 response in case of error
  }
};

//exporting the controller function
module.exports = { SignUpController, LoginController };
