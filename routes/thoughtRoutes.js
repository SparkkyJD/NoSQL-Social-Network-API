const express = require('express');
const router = express.Router();
// import thought controller functions
const {
  getThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
} = require('../controllers/thoughtController');
// import reaction controller functions
const {
  createReaction,
  deleteReaction,
} = require('../controllers/reactionController');

// routes for thoughts
router.route('/api/thoughts')
  .get(getThoughts)
  .post(createThought);

router.route('/api/thoughts/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// routes for reactions
router.route('/api/thoughts/:thoughtId/reactions')
  .post(createReaction)
  
router.route('/api/thoughts/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);
  

module.exports = router;
