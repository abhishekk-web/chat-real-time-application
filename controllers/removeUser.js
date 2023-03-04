const {Op} =require('sequelize');
const Group = require('../models/makeGroup');
const User = require('../models/user');
const Usergroup = require('../models/userGroup');

exports.removeUser = async(req, res) => {

    try{

        console.log(req.body);
        const {name, email} = req.body;
       const groups =await Group.findOne({where:{name:name}})
        console.log(groups.id);
        const adminPowers = await Usergroup.findOne({where: {admin:true,groupId:groups.id, userId: req.user.id}});
        console.log(adminPowers);
        if(adminPowers){
            const userToBeRemoved=await User.findOne({where:{email}});
            console.log(userToBeRemoved);
            const removeUser=await Usergroup.destroy({where: {userId:userToBeRemoved.id, groupId: groups.id}})
            if(removeUser){
                return res.status(200).json({success: true, message:'successfully removed user'})
            }
            return res.status(400).json({message:'user is not present in the group'})
        }
        return res.status(404).json({message:'Only admins have power to delete the user'});

    }
    catch(err){
        console.log(err);
    }

}