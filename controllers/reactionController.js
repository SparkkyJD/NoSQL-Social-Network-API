const Thought = require('../models/thoughtModels');
// Controller functions for creating a reaction from a thought
exports.createReaction = async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const { reactionBody, username } = req.body;

    if (!reactionBody || !username) {
      return res.status(400).json({ error: 'Both reactionBody and username are required' });
    }

    const newReaction = {
      reactionBody,
      username,
    };

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    thought.reactions.push(newReaction);
    thought.reactionCount = thought.reactions.length;
    const savedThought = await thought.save();

    res.status(201).json(savedThought);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Controller functions for deleting a reaction from a thought
exports.deleteReaction = async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Find the index of the reaction with the specified reactionId in the thought's reactions array
    const reactionIndex = thought.reactions.findIndex(
      (reaction) => reaction._id.toString() === reactionId
    );

    if (reactionIndex === -1) {
      return res.status(404).json({ error: 'Reaction not found' });
    }

    // Remove the reaction from the reactions array
    thought.reactions.splice(reactionIndex, 1);

    // Update the reactionCount
    thought.reactionCount = thought.reactions.length;

    // Save the updated thought
    const savedThought = await thought.save();

    res.json(savedThought);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};