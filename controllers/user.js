const User=require('../modals/user-modal.js')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const sendMail=require("../middlewares/sendMail.js")
const TryCatch=require("../middlewares/TryCatch.js")

// Register logic
const register = TryCatch(async (req, res) => {
  const { email, name, password, role } = req.body; // Include role from the request body

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User Already exists",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  // Include role when creating the user object
  user = {
    name,
    email,
    password: hashPassword,
    role: role || "user", // Default to 'user' if role is not provided
  };

  const otp = Math.floor(Math.random() * 1000000);

  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.Activation_Secret,
    {
      expiresIn: "5m",
    }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "E learning", data);

  res.status(200).json({
    message: "Otp sent to your email",
    activationToken,
  });
});


// Verify User logic
const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.Activation_Secret);

  if (!verify)
    return res.status(400).json({
      message: "Otp Expired",
    });

  if (verify.otp !== otp)
    return res.status(400).json({
      message: "Wrong Otp",
    });

  // Include role when creating the user
  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
    role: verify.user.role, // Add role to the creation logic
  });

  res.json({
    message: "User Registered",
  });
});

 const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user)
      return res.status(400).json({
        message: "No User with this email",
      });
  
    const mathPassword = await bcrypt.compare(password, user.password);
  
    if (!mathPassword)
      return res.status(400).json({
        message: "wrong Password",
      });
  
    const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
      expiresIn: "15d",
    });
  
    res.json({
      message: `Welcome back ${user.name}`,
      token,
      user,
    });
  });

 const myProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    res.json({ user });
  });
  module.exports = { register, verifyUser,loginUser,myProfile};
