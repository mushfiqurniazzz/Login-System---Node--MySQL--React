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

  //sending the generated token back to the client
  return response.status(200).json({ msg: "token recieved", token: jwtToken });
};

//exporting the created token
module.exports = token;
