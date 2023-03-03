const Groups = require('../models/makeGroup');

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

        const makeGroup = req.user.createGroup({name: groupName});
        res.status(200).json({group: makeGroup, success: true, message: "Successfully created the group"});

    }
    catch(err){
        console.log(err);
    }

}