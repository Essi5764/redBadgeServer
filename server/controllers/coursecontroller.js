const Express = require("express");
const router = Express.Router();
const {CourseModel,UserModel} = require('../models');//Import the Coursel Model
let validateJWT = require("../middleware/validate-jwt");
let validateAdmin = require("../middleware/validate-admin");
let validateTeacher = require("../middleware/validate-teacher");
const chalk = require('chalk');



router.get('/practice',validateTeacher, (req, res) => {
    res.send('Hey!! This is a practice route!')
});
router.get("/about", (req, res) => {
    res.send('This is about route!')
});




/*
===============================
User (teacher) creates a course
==============================
*/

router.post('/create/',validateTeacher, async (req, res) =>{
    // console.log(chalk.blueBright(req));

    const {title, category,content} = req.body.course;
    const {id} = req.user;
    const courseEntry = {
        title,
        category,
        content,
        UserId:id
    }
    try{
        const newCourse = await CourseModel.create(courseEntry);
        res.status(200).json(newCourse);
    } catch (err) {
        res.status(500).json({ 
            message: "Unable to create a new course",
            error :err })
    }
    // CourseModel.create(courseEntry)
});

/*
=================================
Get All courses from all teachers
================================
*/
router.get("/", async(req, res) => {
    try {
        const courses = await CourseModel.findAll();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ 
            message: "There are no course in our database",
            error :err })
    }
});
/*
=====================
Get courses by user
=====================
*/
router.get("/mycourses",validateTeacher, async(req, res) => {
    let {id} = req.user;
    try {
        const userCourses = await CourseModel.findAll({
            where:{
                UserId: id
            }
        });
        res.status(200).json(userCourses);
    }catch(err){
        res.status(500).json({error:err});
    }
});
/*
=====================
Get course by title
=====================
*/
router.get("/:title", async(req, res) => {
    const {title} = req.params;
    try {
        const titleCourses = await CourseModel.findAll({
            where:{
                title:title
            }
        });
        res.status(200).json(titleCourses);
    }catch(err){
        res.status(500).json({error:err});
    }
});

/*
================================
Update a course by course_id
================================
*/

router.put("/update/:id", validateTeacher , async (req, res) => {
    const {title, category,content} = req.body.course;
    const courseId = req.params.id;
    // const userId = req.user.id;

    const query = {
        where: {
            id: courseId
            // userId: userId
        }
    };

    const updatedCourse = {
        title, category,content
    };

    try {
        const update = await CourseModel.update(updatedCourse, query);
        res.status(200).json({
            message: "Course updated",updatedCourse
        })
        
    } catch (err) {
        res.status(500).json({
            message: `Failed to update course.: ${err}`
        });
    }
});
/*
=====================
Delete a course by id
=====================
*/
router.delete("/delete/:id", validateTeacher, async(req, res) =>{
    const courseId = req.params.id;
    

    try {
        const courseDeleted = await CourseModel.destroy({
            where: {id: courseId}
        })
        res.status(200).json({
            message: "Course deleted",
            courseDeleted
        })

    }catch (err) {
        res.status(500).json({
            message: `Failed to delete course.: ${err}`
        })
    }
})

/*
=====================
Delete all courses
=====================
*/
router.delete("admin/delete/allcourses", validateAdmin, async(req, res) =>{
    try {
    const courseDeleted = await CourseModel.destroyAll({})
    res.status(200).json({message: "All courses were deleted",courseDeleted})
    }catch (err) {
        res.status(500).json({message: `Failed to delete all courses: ${err}`})
    }
})

module.exports = router;