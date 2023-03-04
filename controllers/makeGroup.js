const Groups = require('../models/makeGroup');
const User = require('../models/user');
const Usergroup = require('../models/userGroup');

exports.showGroups = async(req, res) => {

    try{

        const showGroups = await req.user.getGroups({ attributes:['id','name'],through:{admin:true}});
        res.status(200).json({group: showGroups, success:true})

    }
    catch(err){
        console.log(err);
    }

}

exports.makeGroup = async(req, res) => {

    try {
        const {groupName} = req.body;
        console.log(groupName);

        const makeGroup = await req.user.createGroup({name: groupName},{through:{admin:true}});
        // const response = await Groups.create({ name: groupName });
    

        // const makeGroup = await Usergroup.create({ admin: true, userId: req.user.id, groupId: response.id });
        console.log(makeGroup);

        // const makeGroup = await Groups.create({name: groupName}, {through:{admin:true}})
        res.status(200).json({group: makeGroup, success: true, message: "Successfully created the group"});

    }
    catch(err){
        console.log(err);
    }

}

// exports.addUser = async(req, res) => {

//     try {

//         const {groupName,email} = req.body;
//         console.log(groupName);
//         const admin=req.body.isAdmin;
//         const user = await User.findOne({where:{email}});
//         console.log(user);
//         const group = await Groups.findOne({where:{name:groupName}});
//         console.log(group);
//         if(!user){
//             return res.status(400).json({message:'user or group not found'})
//         }
//         const userInUserGroup =await Usergroup.findOne({where:{userId:user.dataValues.id,groupId:group.dataValues.id}});
//         console.log(userInUserGroup);
//         if(userInUserGroup == null){
//             console.log(user.dataValues.id);
//             const users = await Usergroup.create({admin,userId:user.dataValues.id,groupId:group.dataValues.id})
//             console.log(users);
//         }
//     }

//     catch(err){
//         console.log(err);
//     }

// }