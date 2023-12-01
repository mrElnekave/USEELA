const mongoose = require('mongoose');
const User = require('../models/User');

//get all users
const all_users = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1});
    res.status(200).json(users);
}

//get a single user
const get_user = async (req, res) => {
	res.status(404).json("Not implemented");
}

//logs in a single user
const login_user = async (req, res) => {
    console.log("In login user function")
    const {email, password} = req.body;
    try {
        const check = await User.findOne({email:email, password:password});
        if (check){
            console.log("User Authenticated");
            return res.status(200).json("exist");
        }
        else {
            console.log("User Not Authenticated");
            return res.status(400).json("notexist");
        }
    }
    catch(error) {
        console.log(error);
        res.status(400).json({error: error.message})
    } 
}

//signs up a user
const sign_up_user = async (req, res) => {
    const {email, password} = req.body;
    try {
        const check = await User.findOne({email:email});
        if (!check){
            new_user = await User.create({email, password});
            res.status(200).json(new_user);
        }
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

//delete a new user
const delete_user = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such User"})
    }
    const user = await User.findOneAndDelete({_id:id})
    if (!user){
        return res.status(404).json({error: "No such User"})   
    }
    res.status(200).json(user);
}

//update a user
const update_user = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such User"})
    }
    const user = await User.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if (!user){
        return res.status(404).json({error: "No such User"})   
    }
    res.status(200).json(user);
}

module.exports = {
    all_users,
    get_user,
    sign_up_user,
    login_user,
    delete_user,
    update_user,
};