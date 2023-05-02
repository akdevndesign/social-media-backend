const { User, Thought } = require("../models");

// Define routes
module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("thoughts").populate("friends");
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // GET a single user by its _id and populated thought and friend data
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate("thoughts")
        .populate("friends");
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
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
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
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
        return res.status(404).json({ message: "No user found with this id!" });
      }
      // Remove user's associated thoughts when deleted
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      res.json(deletedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async addNewFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found by that ID" });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
