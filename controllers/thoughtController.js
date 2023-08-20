const Thought = require('../models/thoughtModels');

// Controller functions for getting thoughts
exports.getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Controller functions for creating thoughts
exports.createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.status(201).json(newThought);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Controller functions for getting thoughts bu ID
exports.getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Controller functions for updating thoughts
exports.updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Controller functions for deleting thoughts
exports.deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(deletedThought);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

