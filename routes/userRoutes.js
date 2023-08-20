const express = require('express');
const router = express.Router();
// import user controller functions
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../controllers/userController');

// Routes for retrieving and creating user
router.route('/api/users')
  .get(getUsers)
  .post(createUser);
// Routes for get user by ID, Update and delete user
router.route('/api/users/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Routes for adding and deleting friends
router.route('/api/users/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

// Export the router
module.exports = router;