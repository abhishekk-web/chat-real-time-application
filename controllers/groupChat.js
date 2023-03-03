const chat = require('../models/groupChat');
const groupChat = require('../models/groupChat');
const Group = require('../models/makeGroup');

exports.allUserGroups=async(req,res)=>{
    try{
        console.log("the req.user is "+req.user.id);
    const user =await req.user.getGroups({attributes:['id','name']})
        console.log(user);
    console.log("the users are "+user)
    res.status(200).json({user,success:true})
}catch(err){
    console.log(err);
    res.status(500).json({message:err,success:false})
}
}

exports.sendMessage = async(req, res) => {

    const {groupId, groupMessage} = req.body;
    console.log(groupId);
    const userName = req.user.name;
    if(!groupMessage || !groupId){
        return res.status(400).json({message:'bad parameters'})
    }
    const response=await groupChat.create({groupMessage:groupMessage,groupId:+groupId,userName:userName, userId: req.user.id});
    console.log(response);
    res.status(200).json({success:true, message:"Successfully sent the message", groupchat: response});

}

exports.messages = async(req, res) => {

    try {

        const groupId = req.params.id;
        console.log(groupId);
        const groupMessages=await groupChat.findAll({
            limit:15,
            order:[["updatedAt","DESC"]],
            where:{groupId},
            attributes:["groupMessage","userName"]
        })
        console.log(groupMessages)
        res.status(200).json({groupMessages:groupMessages.reverse(),message:'successful'})

    }
    catch(err){
        console.log(err);
    }

}