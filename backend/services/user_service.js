const userModel = require("../models/user_model");

module.exports.createUser = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !email || !password) {
    throw Error("All Fields are required");
  }

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password,
  });

  return user; // this will now have instance methods like .generateAuthToken()
};

