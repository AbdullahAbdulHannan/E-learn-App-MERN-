const TryCatch=require( "../middlewares/TryCatch.js");
const Courses=require( "../modals/courses.js");
const Lecture =require( "../modals/lecture.js");
const { rm }=require( "fs");
const { promisify }=require( "util");
const fs=require( "fs");
const User=require( "../modals/user-modal.js");

  const createCourse = TryCatch(async (req, res) => {
  const { title, description, category, createdBy, duration} = req.body;

  const image = req.file;

  await Courses.create({
    title,
    description,
    category,
    createdBy,
    image: image?.path,
    duration,
  });

  res.status(201).json({
    message: "Course Created Successfully",
  });
});

  const addLectures = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course)
    return res.status(404).json({
      message: "No Course with this id",
    });

  const { title, description } = req.body;

  const file = req.file;

  const lecture = await Lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
  });

  res.status(201).json({
    message: "Lecture Added",
    lecture,
  });
});

  const deleteLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  rm(lecture.video, () => {
    console.log("Video deleted");
  });

  await lecture.deleteOne();

  res.json({ message: "Lecture Deleted" });
});

const unlinkAsync = promisify(fs.unlink);

  const deleteCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  const lectures = await Lecture.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      await unlinkAsync(lecture.video);
      console.log("video deleted");
    })
  );

  rm(course.image, () => {
    console.log("image deleted");
  });

  await Lecture.find({ course: req.params.id }).deleteMany();

  await course.deleteOne();

  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({
    message: "Course Deleted",
  });
});

  const getAllStats = TryCatch(async (req, res) => {
  const totalCourse = (await Courses.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;

  const stats = {
    totalCourse,
    totalLectures,
    totalUsers,
  };

  res.json({
    stats,
  });
});

  const getAllUser = TryCatch(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select(
    "-password"
  );

  res.json({ users });
});

//   const updateRole = TryCatch(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user.role === "user") {
//     user.role = "admin";
//     await user.save();

//     return res.status(200).json({
//       message: "Role updated to admin",
//     });
//   }

//   if (user.role === "admin") {
//     user.role = "user";
//     await user.save();

//     return res.status(200).json({
//       message: "Role updated",
//     });
//   }
// });
module.exports={
  addLectures,
    createCourse,
    deleteCourse,
    deleteLecture,
    getAllStats,
    getAllUser,
    // updateRole,
    }