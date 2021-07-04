const Express = require("express");
const router = Express.Router();
const {EnrollModel} = require('../models');//Import the Coursel Model

let validateEnroll = require("../middleware/validate-admin");

const chalk = require('chalk');



router.get('/practice',validateEnroll, (req, res) => {
    res.send('Hey!! This is a practice route!')
});
router.get("/about", (req, res) => {
    res.send('This is about route!')
});




router.post('/new/',validateEnroll,async (req, res) =>{
    

    const {firstname,lastname,course,category,status} = req.body.enrollment;
    const {id} = req.user;
    const courseEnroll = {
        firstname,
        lastname,
        course,
        category,
        status,
        UserId:id
    }
    try{
        const newEnroll = await EnrollModel.create(courseEnroll);
        res.status(200).json(newEnroll);
    } catch (err) {
        res.status(500).json({ 
            message: "Unable to enroll",
            error :err })
    }
    
});

router.put("/update/:id", validateEnroll , async (req, res) => {
    const {firstname,lastname,course,category,status} = req.body.enrollment;
    const enrollmentId = req.params.id;
    // const userId = req.user.id;

    const query = {where: {id: enrollmentId}};
        
            
            // userId: userId
        
    

    const updatedEnrollment = {firstname,lastname,course,category,status};

    try {
        const update = await EnrollModel.update(updatedEnrollment, query);
        res.status(200).json({
            message: "Course updated",updatedEnrollment
        })
        
    } catch (err) {
        res.status(500).json({
            message: `Failed to update course.: ${err}`
        });
    }
});

module.exports = router;