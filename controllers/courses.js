// const { instance } = ("../index.js");
const  TryCatch=require("../middlewares/TryCatch.js")
const Courses =require ("../modals/courses.js");
const Lecture =require("../modals/lecture.js");
const User=require('../modals/user-modal.js')

// import crypto from "crypto";
// import { Payment } from "../models/Payment.js";

 const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({
    courses,
  });
});

 const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  res.json({
    course,
  });
});

 const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You have not enrolled in this course",
    });

  res.json({ lectures });
});

 const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(lecture.course))
    return res.status(400).json({
      message: "You have not enrolled in this course",
    });

  res.json({ lecture });
});

 const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });

  res.json({
    courses,
  });
});

const getEnroll = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const course = await Courses.findById(req.params.id);

  if (user.subscription.includes(course._id)) {
    return res.status(400).json({
      message: "You already have this course",
    });
  }

user.subscription.push(course._id);
  await user.save();

  res.status(201).json({
    message: "Course Added to Subscription Successfully",
    course,
  });
});
module.exports={ getAllCourses,
    getSingleCourse,
    fetchLectures,
    fetchLecture,
    getMyCourses,
  getEnroll}


//  const paymentVerification = TryCatch(async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.Razorpay_Secret)
//     .update(body)
//     .digest("hex");

//   const isAuthentic = expectedSignature === razorpay_signature;

//   if (isAuthentic) {
//     await Payment.create({
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     });

//     const user = await User.findById(req.user._id);

//     const course = await Courses.findById(req.params.id);

//     user.subscription.push(course._id);

//     await user.save();

//     res.status(200).json({
//       message: "Course Purchased Successfully",
//     });
//   } else {
//     return res.status(400).json({
//       message: "Payment Failed",
//     });
//   }
// });