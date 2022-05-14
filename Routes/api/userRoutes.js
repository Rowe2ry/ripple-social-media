const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    addUser,
    updateUser,
    removeUser,
    addFriends,
    removeFriend
} = require('../../Controllers/userController');

router.route('/')
    .get(getUsers)
    .post(addUser);

router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(removeUser);
    // deleting a user also removes their thoughts and friendship connections

router.route('/:userId/friends/:friendId')
    .post(addFriends)
    .delete(removeFriend);
    // post adds each user to the other user's friends array. Removal does the same but with removing each from each

module.exports = router;