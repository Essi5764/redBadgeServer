require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");
app.use(require("./middleware/header"))
app.use(Express.json());

const controllers = require("./controllers");



app.use("/course",controllers.courseController);
app.use("/user",controllers.userController);
app.use("/enroll",controllers.enrollController);


dbConnection.authenticate()
        .then(() => dbConnection.sync())
        .then(() =>{
        app.listen(process.env.PORT, ()=> {
                console.log(`[Server]: App is listening on ${process.env.PORT}`);
                });  
        })
        .catch((err)=>{
                console.log(`[server]: Server crashed. Error = ${err}`);
        });