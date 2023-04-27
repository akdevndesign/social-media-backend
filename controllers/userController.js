const { User, Thought } = require('../models');

// Define routes
module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // GET a single user by its _id and populated thought and friend data
async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // POST a new user
  async createNewUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // PUT to update a user by its _id
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // DELETE to remove user by its _id
async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      // Remove user's associated thoughts when deleted
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      res.json(deletedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // POST to add a new friend to a user's friend list
async addNewFriend (req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.id } }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // DELETE to remove a friend from a user's friend list
async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.id } }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
}