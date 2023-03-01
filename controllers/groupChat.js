const chat = require('../models/groupChat');

exports.sendMessage = async(req, res) => {

    const {groupChat} = req.body;
    console.log(groupChat);

}