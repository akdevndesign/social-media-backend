const router = require('express').Router();
const { User, Thought } = require('../models');

// GET all thoughts

module.exports = {
async getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},
// GET a single thought by _id
async getThoughtById(req, res) {
  try {
    const thought = await Thought.findById(req.params.id).populate('reactions');
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},
// POST a new thought
async newThought(req, res) {
  try {
    const thought = await Thought.create(req.body);
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},
// PUT to update a thought by _id
async editThought(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},
// DELETE a thought by _id
async deleteThought(req, res) {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: thought._id } }
    );
    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},

// POST a reaction to a thought by its _id
async postReaction(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},
// DELETE a reaction by its reactionId
async deleteReaction(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message:'Thought not found' });
      return;
      }
      res.json(thought);
      } catch (err) {
      console.error(err);
      res.status(500).json(err);
      }
      },
}