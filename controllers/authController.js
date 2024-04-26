import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password, lastName } = req.body;

  // vallidate
  if (!name) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "please provide name",
    //   });
    next("Name is required");
  }

  if (!email) {
    //   return res.staus(400).send({
    //     success: false,
    //     message: "please provide email",
    //   });
    next("Email is required");
  }

  if (!password) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "please provide password",
    //   });
    next("Password is required");
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(200).send({
      success: false,
      message: "email already exists, please login",
    });
  }
  const user = await userModel.create({ name, email, password, lastName });

  //token
  const token = user.createJWT();
  console.log("token", token);
  res.status(201).send({
    success: true,
    message: "user created successfully",
    user: {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please Provide All Fields");
  }
  //find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Useraname or password");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid password",
    })
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login SUccessfully",
    user,
    token,
  });
};
