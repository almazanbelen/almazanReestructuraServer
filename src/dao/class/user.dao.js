const { createHash } = require("../../utils/utils");
const User = require("../models/User");

module.exports = class Users {
  //login
  postLogin = async (email) => {
    try {
      const user = await User.findOne(
        { email },
        {
          first_name: 1,
          last_name: 1,
          age: 1,
          password: 1,
          email: 1,
          carts: 1,
          role: 1,
        }
      );
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  addCart = async (uid, cid) => {
    try {
      let user = await User.findById(uid);
      user.carts.push({ cart: cid });
      let result = await User.updateOne({ _id: uid }, user);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //register
  postRegister = async (first_name, last_name, email, age, password) => {
    try {
      const hashedPassword = createHash(password);
      const user = await User.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
      });
      return user;
    } catch (error) {}
  };

  //restore
  postRestore = async (email, password) => {
    try {
      const userFound = await User.findOne({ email: email });
      const hashedPassword = createHash(password);

      const newPassword = await User.updateOne(
        { email: userFound.email },
        { password: hashedPassword }
      );
      return newPassword;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
};