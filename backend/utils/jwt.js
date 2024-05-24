//importing json web token to create a token function to be used during login attempt
const jwt = require("jsonwebtoken");

//main token function that will be sending the token with some information init
const token = (foundUser, response) => {
    //creating a jwt with the user's id, username, email and environmental variables
  const jwtToken = jwt.sign(
    {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d"
    }
  );

  // set the token as a cookie in the response headers
  response.cookie("token", jwtToken, {
    httpOnly: true, // this prevents client-side JavaScript from accessing the cookie
    maxAge: 30 * 24 * 60 * 60 * 1000, // ensures the cookie expires in 30 days
  });

  //sending the generated cookiee back to the client
  return response.status(200).json({ msg: "token received" });
};

//exporting the created token
module.exports = token;
