const Express = require("express");
const router = Express.Router();
const {courseModel,UserModel} = require('../models');//Import the Coursel Model
let validateJWT = require("../middleware/validate-jwt");




router.get('/practice',validateJWT, (req, res) => {
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

router.post('/create', validateJWT, async (req, res) =>{
    const {title, category,content,instructor,created} = req.body.course;
    const {id} = req.user;
    const courseEntry = {
        title,
        category,
        content,
        instructor,
        created,
        userId: id
    }
    try{
        const newCourse = await CourseModel.create(courseEntry);
        res.status(200).json(newCourse);
    } catch (err) {
        res.status(500).json({ 
            message: "Unable to create a new course",
            error :err })
    }
});

/*
=================================
Get All courses from all teachers
================================
*/
router.get("/allcourses", async(req, res) => {
    try {
        const courses = await courseModel.findAll();
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
router.get("/mycourses",validateJWT, async(req, res) => {
    let {id} = req.user;
    try {
        const userCourses = await courseModel.findAll({
            where:{
                id:id
            }
        });
        res.status(200).json(userCourses);
    }catch(err){
        res.status(500).json({error:err});
    }
});
/*
=====================
Get log by title
=====================
*/
router.get("/:id", async(req, res) => {
    let {id} = req.params;
    try {
        const userLogs = await logModel.findAll({
            where:{
                id:id
            }
        });
        res.status(200).json(userLogs);
    }catch(err){
        res.status(500).json({error:err});
    }
});

/*
=====================
Update a log
=====================
router.put("/update/:id", validateJWT, async(req, res) =>{
})
*/

module.exports = router;