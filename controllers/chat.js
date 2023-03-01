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