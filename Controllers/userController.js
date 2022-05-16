const { User, Thought } = require('./../Models');

const getUsers = async (req,res) => {
    try {
        // returns all users in the database
        const allUsers = await User.find()
        res.status(200).json(allUsers);
    } catch(err) {
        res.status(400).json(err);
    };
};

const getOneUser = async (req,res) => {
    try {
        // find by id on user model
        const oneUser = await User.findOne( { _id: req.params.userId } )
        .populate('thoughts')
        .populate('friends');
        res.status(200).json(oneUser);
    } catch(err) {
        res.status(400).json(err);
    };
};

const addUser = async (req,res) => {
    try {
        // adds a new user to the database
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch(err) {
        res.status(400).json(err);
    };
};

const updateUser = async (req,res) => {
    try {
        // updates attributes for a user in the database
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
        // oneUser is to store the username of the user before we delete them, as thoughts and comments are tied to the users by username and not ID
        const oneUser = await User.findOne( { _id: req.params.userId } );
        const thatUsername = oneUser.username;
        const byeUser = await User.findOneAndDelete(
            { _id: req.params.userId }
        );
        // scrubs through database for any Thoughts tied to this user's username and removes them
        const remThoughts = await Thought.deleteMany(
            { username: thatUsername },
        );
        // scrubs through database for any Comments tied to this user's username and removes them
        const remComments = await Comment.deleteMany(
            { username: thatUsername }
        );
        // scrubs through database for any Users who have this user in their friends list and removes this user from their friends list
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
        // removing from each other's friends list because friendship is a two way street
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