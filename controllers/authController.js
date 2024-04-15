import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // vallidate
    if (!name) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "please provide name",
    //   });
    next("Name is required")
    }

    if (!email) {
    //   return res.staus(400).send({
    //     success: false,
    //     message: "please provide email",
    //   });
    next("Email is required")
    }

    if (!password) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "please provide password",
    //   });
    next("Password is required")
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "email already exists, please login",
      });
    }
    const user = await userModel.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error) {
    // console.log(error);
    // res.status(400).send({
    //   message: "Error in register controller",
    //   success: false,
    //   error,
    // });
    next(error);
  }
};
