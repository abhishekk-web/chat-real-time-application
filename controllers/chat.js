const chat = require('../models/chat');
const user = require('../models/user');
const {Op} = require('sequelize');

exports.allContacts = async(req, res) => {

    try {
        console.log("hello world");
        const users = await user.findAll({where:{id:{[Op.ne]: +req.user.id}}, attributes:['id','name']})
        res.status(200).json({success: true, user: users});
    }
    catch(err){
        console.log(err);
    }

}

exports.sendMessage = async(req, res) => {

    try {
        
        const {Chat, toUser} = req.body;
        console.log(Chat);
        if(!Chat){
            return res.status(400).json({message:'please enter the message'})
        }
        const chats = await chat.create({messages:Chat,toUser:toUser, userId: req.user.id});
        console.log(chats);
        res.status(200).json({message: "successfully sent the message", success: true, chats: chats})

    }
    catch(err){
        console.log(err);
    }

}

exports.messages = async(req, res) => {

    try {
        const id = req.params.id;
        console.log(id);
        if(id ==0){
            return res.status(200).json({message:'successful'})
        }
        const chats = await chat.findAll({
            limit: 10,
            order: [["updatedAt", "DESC"]],
            where: {
                [Op.or]:[
                    {toUser:id,userId:+req.user.id},
                    {toUser:+req.user.id,userId:id}
                ]
            },
            attributes: ['messages'],
            include: {
                model:user,
                where: {
                    [Op.or]:[{id:+req.user.id},{id:id}]
                },
                attributes:['name']
            }
        })
        console.log(chats);
        res.status(200).json({chats:chats.reverse(),success:true})
    }
    catch(err){
        console.log(err);
    }   
}