const express = require('express');
const router = express.Router({ mergeParams: true });

// Import reaction controller
const { createReaction, deleteReaction } = require('../controllers/reactionController');

// routes creating and deleting thoughts and associated reactions
router.route('/api/thoughts/:thoughtId/reactions')
  .post(createReaction);

router.route('/api/thoughts/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

// Export the router
module.exports = router;
