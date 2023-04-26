const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  newThought,
  editThought,
  deleteThought,
  postReaction,
  deleteReaction,

} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(newThought);

router.route('/:thoughtId').get(getThoughtById).put(editThought).delete(deleteThought);

router.route('/:thoughtId/reaction/').post(postReaction)

router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction)

module.exports = router;
