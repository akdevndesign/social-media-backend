const router = require('express').Router();
const {
    getUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createNewUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:id/friends/').post(addNewFriend).delete(deleteFriend);

module.exports = router;
