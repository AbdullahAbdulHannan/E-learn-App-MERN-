const express =require( "express");
const {
  getAllCourses,
  getSingleCourse,
  fetchLectures,
  fetchLecture,
  getMyCourses,
  getEnroll
} =require( "../controllers/courses.js");
const {isAuth}  =require( "../middlewares/isAuth.js");

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);
router.post("/course/enroll/:id", isAuth, getEnroll);
// router.post("/verification/:id", isAuth, paymentVerification);

module.exports= router;