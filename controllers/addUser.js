const {Op} =require('sequelize');
const Group = require('../models/makeGroup');
const User = require('../models/user');
const Usergroup = require('../models/userGroup');


exports.addUser = async(req, res) => {

    try {

        const {name,email} = req.body;
        // console.log(name);
        const admin=req.body.isAdmin;
        const user = await User.findOne({where:{email}});
        console.log("the user id is "+user.id);
        const group = await Group.findOne({where:{name:name}});
        console.log("the group id is "+group.id);
        // console.log(group);
        if(!user){
            return res.status(400).json({message:'user or group not found'})
        }
        const userInUserGroup =await Usergroup.findOne({where:{userId:+user.id,groupId:+group.id}});
        // console.log(userInUserGroup);
        if(!userInUserGroup){
            const obj = {
                admin:admin,
                userId:user.id,
                groupId: group.id
            }
            const users = await Usergroup.create(obj)
            console.log(users);
            return res.status(201).json({message:'added user to the group', data:users})
        }
        const users = await Usergroup.update({admin},{where:{userId:+user.id,groupId:+group.id}})
        console.log(user);
        return res.status(201).json({message:'update user in the group', data: users})
    }

    catch(err){
        console.log(err);
    }

}