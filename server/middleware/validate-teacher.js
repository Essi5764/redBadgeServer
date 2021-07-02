const jwt = require("jsonwebtoken");
const {UserModel} = require("../models");

const validateTeacher = async (req, res, next) => {
    if (req.method == "OPTIONS"){
        next();
    }else if(req.headers.authorization)
    {
        const {authorization} = req.headers;
        console.log("authorization -->", authorization);
        const payload = authorization
        ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined
        console.log("payload -->", payload);
        if(payload){
            let foundUser = await UserModel.findOne({where: {id:payload.id,role:"teacher"}});
            console.log("foundUser -->", foundUser);
            if (foundUser){
                console.log("request -->", req);
                req.user = foundUser;
                next();
            }else{
                res.status(400).send({message: "Not Authorized"});
            }
        }else{
            res.status(401).send({message: "Invalid token"});
            }
        } else{
            res.status(403).send({message: "Forbidden"});
        }
    
};

module.exports = validateTeacher;

// const UserModel = require ("../models/user");
// require ("dotenv").config();
// const jwt = require("jsonwebtoken");
// const chalk = require('chalk');

// const validateTeacher = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (req.method === "OPTIONS") {
//       return next();
//     } else if (!token) {
//       return res.status(403).send({ auth: false, message: "No token provided" });
//     } else {
//       jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
//           console.log(chalk.blueBright("TOKEN: ", token))
//           console.log(chalk.redBright("DECODED TOKEN: ", decodeToken))
//         if (!err && decodeToken) {
//           UserModel.findOne({
//             where: {
//               id: decodeToken.id,
//             },
//           })
//             .then((user) => {
//               if (!user) throw err;
//               req.user = user;
//               return next();
//             })
//             .catch((err) => next(err));
//         } else {
//           req.errors = err;
//           return res.status(500).send("Not Authorized");
//         }
//       });
//     }
//   };
//   module.exports = validateTeacher;