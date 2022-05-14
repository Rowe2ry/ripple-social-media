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

const updateUser = async (req,res) => {
    try {
        const editedUser = await User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
        );
        res.status(200).json(editedUser);
    } catch(err) {
        res.status(400).json(err);
    };
};

const removeUser = async (req,res) => {
    try {
        const oneUser = await User.findOne( { _id: req.params.userId } );
        const byeUser = await User.findOneAndDelete(
            { _id: req.params.userId }
        );
        const thatUsername = oneUser.username;
        const remThoughts = await Thought.deleteMany(
            { username: thatUsername },
        );
        const remComments = await Comment.deleteMany(
            { username: thatUsername }
        );
        await User.updateMany(
            { friends: req.params.userId },
            { $pull: { friends: req.params.userId } }
        );
        res.status(200).json(`${byeUser} has been deleted along with ${remThoughts.deletedCount} thoughts and ${remComments.deletedCount} comments`);
    } catch(err) {
        res.status(400).json(err);
    };
};

const addFriends = async (req,res) => {
    try {
        // adding to each other's friends list because friendship is a two way street
        await User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        await User.findOneAndUpdate(
            { _id: req.params.friendId},
            { $addToSet: { friends: req.params.userId } },
            { runValidators: true, new: true }
        );
        res.status(200).json(`Friendship established between users ${req.params.userId} and ${req.params.friendId}`);
    } catch(err) {
        res.status(400).json(err);
    };
};

const removeFriend = async (req,res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } }
        );
        await User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $pull: { friends: req.params.userId } }
        );
        res.statsu(200).json(`Users ${req.params.userId} and ${req.params.friendId} are no longer friends`);
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
    addFriends,
    removeFriend
};