const User = require('../models/userModels');
const Thought = require('../models/thoughtModels');

// Controller functions for getting users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Controller functions for creating users
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Controller functions for getting users bu ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Controller functions for updating users
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Controller functions for deleting users
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find all thoughts associated with the deleted user
    const thoughts = await Thought.find({ username: deletedUser.username });

    // Delete all thoughts associated with the deleted user
    await Thought.deleteMany({ username: deletedUser.username });

    // Update the friends list of other users to remove the deleted user
    await User.updateMany(
      { friends: req.params.userId },
      { $pull: { friends: req.params.userId } }
    );

    res.status(200).json({ message: 'User and associated thoughts deleted successfully', deletedUser, thoughts });
  } catch (error) {
    // Explicitly handle the error case
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};
// Controller functions for adding friend
exports.addFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friend = await User.findById(req.params.friendId);
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    // Check if friend is already in user's friend list
    if (user.friends.includes(req.params.friendId)) {
      return res.status(400).json({ error: 'Friend already added' });
    }

    // Add friend to the user's friend list
    user.friends.push(req.params.friendId);
    await user.save();

    res.status(200).json({ message: 'Friend added successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to remove friend from user's friend list
exports.removeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if friend is in the user's friend list
    if (!user.friends.includes(req.params.friendId)) {
      return res.status(400).json({ error: 'Friend not found in the user\'s friend list' });
    }

    // Remove friend from the user's friend list
    user.friends.pull(req.params.friendId);
    await user.save();

    res.status(200).json({ message: 'Friend removed successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};