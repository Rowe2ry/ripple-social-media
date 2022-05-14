const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    addUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../Controllers/userController');

router.route('/')
    .get(getUsers)
    .post(addUser);

router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(removeUser);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;