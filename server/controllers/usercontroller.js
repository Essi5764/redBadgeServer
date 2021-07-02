const router = require('express').Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
let validateAdmin = require("../middleware/validate-admin");
let validateJWT = require("../middleware/validate-jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require('../models');

router.post("/register", async (req, res) => {

    let {email, password, firstName, lastName, role} = req.body.user;

    try{
        const User = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
            firstName,
            lastName,
            role
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 *24});

        res.status(201).json({
            message:"User successfully registered",
            User:User,
            sessionToken: token,
        });

    }
    catch(err) {
        if( err instanceof UniqueConstraintError ){
            res.status(409).json({
                message:"Email already in use",
            });
        }
        else{
            res.status(500).json({
                message:"Failed to register user",
            });
        }
    }

});

router.post("/login", async (req, res) => {

    let {email, password} = req.body.user;

    try{
        let loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });

        if (loginUser){

            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) { 
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET,{expiresIn: 6*6*24});
                    
                res.status(200).json({
                    user: loginUser,
                    message:"User successfully logged in!",
                    sessionToken: token
                });
            }
            else{
                res.status(401).json({
                    
                    message: "Incorrect email or password"
                })
            }
        }
        else{
            res.status(401).json({
                
                message: 'Incorrect email or password'
            });
        }

    }
    catch(error) {
        
        res.status(500).json({
                message:"Failed to log user in",
            });
        
    }

});

/*Update user role=admin by admin*/
router.put("/admin/update/:id", validateAdmin , async (req, res) => {
    const {role} = req.body.user;
    const updateUser =  { role: role };
    const query = {where: {id: req.params.id}};
    try {
        const foundUser = await models.UserModel.findOne(query);
        if (foundUser) {
            await models.UserModel.update(updateUser,query);
            res.status(201).json({UpdatedUser: updateUser})
        }else{
            res.status(201).json({Error: "Invalid"})
        }
    }
    catch(error){
        res.status(500).json({
            message:"Failed to update user role",
        });
    }
});

/*Delete user by admin*/

router.delete("/admin/delete/:id", validateAdmin, async(req, res) =>{
    const userId = req.user.id;

    try {
        const userDeleted = await UserModel.destroy({
            where: {id:userId }
        })
        res.status(200).json({
            message: "User deleted",
            userDeleted
        })

    }catch (err) {
        res.status(500).json({
            message: `Failed to delete user.: ${err}`
        })
    }
})


router.post('/enroll/', async (req, res) =>{
    

    const {course,enrolled,student,status} = req.body.enrollment;
    const {id} = req.user;
    const courseEnroll = {
        course,
        enrolled,
        student,
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


module.exports = router;

