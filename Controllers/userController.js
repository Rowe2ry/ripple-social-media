const { User, Thought, Reaction} = require('./../Models');

const getUsers = async (req,res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers);
    } catch(err) {
        res.status(400).json(err);
    };
};

const getOneUser = async (req,res) => {
    try {
        const oneUser = await User.findOne( { _id: req.params.userId } );
        res.status(200).json(oneUser);
    } catch(err) {
        res.status(400).json(err);
    };
};

const addUser = async (req,res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch(err) {
        res.status(400).json(err);
    };
};

const updateUser = (req,res) => {
    try {

    } catch(err) {
        res.status(400).json(err);
    };
};

const removeUser = (req,res) => {
    try {

    } catch(err) {
        res.status(400).json(err);
    };
};

const addFriend = (req,res) => {
    try {

    } catch(err) {
        res.status(400).json(err);
    };
};

const removeFriend = (req,res) => {
    try {

    } catch(err) {
        res.status(400).json(err);
    };
};

module.exports = {
    getUsers,
    getOneUser,
    addUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
};