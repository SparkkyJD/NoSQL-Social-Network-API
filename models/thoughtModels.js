const mongoose = require('mongoose');

// thought model
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    reactions: [
      {
        reactionBody: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
