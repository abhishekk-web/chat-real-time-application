// we are requiring all the express libraries here

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/database');

// we are initializing express in app

const app = express();

// Routes
const userRoute = require('./routes/user');
const groupChatRoute = require('./routes/groupChat');
const makeGroupRoute = require('./routes/makeGroup');
const chatRoute = require('./routes/chat');
const addUserRoute = require('./routes/addUser');

// Models
const User = require('./models/user');
const Groupchat = require('./models/groupChat');
const Chat = require('./models/chat');
const Group = require('./models/makeGroup');
const Usergroup = require('./models/userGroup');


// Associations
User.hasMany(Chat);
Chat.belongsTo(User);


User.hasMany(Groupchat);
Groupchat.belongsTo(User)

User.belongsToMany(Group,{through:Usergroup});
Group.belongsToMany(User,{through:Usergroup});
// using the express libraries
app.use(bodyParser.json({extended: false}));
app.use(cors(
    {
    origin: "http://127.0.0.1:5500",
    credentials: true
}

));

// we are using routes here
app.use("/user", userRoute);
app.use("/groupchat", groupChatRoute);
app.use("/group", makeGroupRoute);
app.use("/chat", chatRoute);
app.use('/addgroup', addUserRoute);

// we are running our server and database here
sequelize
// .sync({force:true})
.sync()
.then((result)=> {
    // console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})

