const { User, Thought, Reaction} = require('./../Models');

const getThoughts = async (req,res) => {
    try{
        // view all Thoughts in database
        const allThoughts = await Thought.find();
        const formatted = allThoughts.map((thought) => {
            thought.createdAt = thought.getDate();
            return thought;
        });
        res.status(200).json(formatted);
    } catch(err) {
        res.status(400).json(err);
    };
};

const getOneThought = async (req,res) => {
    try{
        // view on Thought in Database by ID
        const oneThought = await Thought.findOne(
            { _id: req.params.thoughtId }
        );
        const formatted = oneThought;
        formatted.createdAt = formatted.getDate();
        res.status(200).json(formatted);
    } catch(err) {
        res.status(400).json(err);
    };
};


const addThought = async (req,res) => {
    try{
        // req.body incoming data should have the thoughtText and username
        const newThought = await Thought.create(req.body);
        const theUser = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: newThought._id } },
            { new: true }
        );
        res.status(200).json(` new Thought by user "${theUser.username}" added.`)
    } catch(err) {
        res.status(400).json(err);
    };
};

const editThought = async (req,res) => {
    try{
        const editedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        res.status(200).json(editedThought);
    } catch(err) {
        res.status(400).json(err);
    };
};

const removeThought = async (req,res) => {
    try{
        const begoneThought = await Thought.findOneAndDelete(
            { _id: req.params.thoughtId}
        );
        const theUser = await User.findOneAndUpdate(
            { username: begoneThought.username },
            { $pull: { thoughts: req.params.thoughtId } }
        );
        res.status(200).json(`Thought ${begonethought._id} deleted for user ${theUser.username}.`);
    } catch(err) {
        res.status(400).json(err);
    };
};

const createReaction = async (req,res) => {
    try{
        const newReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        res.status(200).json(newReaction);
    } catch(err) {
        res.status(400).json(err);
    };
};

const removeReaction = async (req,res) => {
    try{
        const theThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: { reactions: req.body.reactionId } },
            { runValidators:true, new:true }
        );
        res.status(200).json(theThought);
    } catch(err) {
        res.status(400).json(err);
    };
};
module.exports = {
    getThoughts,
    getOneThought,
    addThought,
    editThought,
    removeThought,
    createReaction,
    removeReaction
};