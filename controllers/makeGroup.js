const group = require('../models/makeGroup');

exports.showGroups = async(req, res) => {

    try{

        const showGroups = await group.findAll();
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

        const makeGroup = group.create({name: groupName});
        res.status(200).json({group: makeGroup, success: true, message: "Successfully created the group"});

    }
    catch(err){
        console.log(err);
    }

}