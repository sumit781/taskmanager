const express = require('express')
const cors = require("cors");
const jwt = require("jsonwebtoken")
require('dotenv').config()
// const cookieSession = require("cookie-session");
const {login}  = require('./controller/auth.controller');
const app = express()
const db = require('./models');
const userConrollers = require('./controller/user.controller');
const { mongoose } = require('./models');
const taskController=require('./controller/task.controller')
const {jwtTokenVerification}=require('./middlewares')
db.mongoose
  .connect(`mongodb+srv://sumitsingh0103:qwertyuiop@taskmanager.ydotm8p.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial()
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

var corsOptions = {
    origin: "http://localhost:3000"
  };
  
const port = 3001

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/',(req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/auth',login)
app.get('/users',jwtTokenVerification,userConrollers.getUsers)
app.get('/tasks',jwtTokenVerification,taskController.getAllTask)
app.post('/task',jwtTokenVerification,taskController.createTask)
app.patch('/task',jwtTokenVerification,taskController.updatetaskStatus)

// app.use((res,resp,next,err)=>{
//   console.log(err)
// })

function initial(){
    db.USERS.estimatedDocumentCount({role:"Admin"},(err,result)=>{
        if(!err && result==0){
            new db.USERS({
                date:new Date().toISOString(),
                tasks:[],
                emailId:'admin@gmail.com',
                name:"Admin",
                role:'Admin',
            }).save().then(()=>{
                console.log('admin created successfully')
            })
        }

    })
}