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

router.route('/:id').get(getThoughtById).put(editThought).delete(deleteThought);

router.route('/:id/reaction/').post(postReaction)

router.route('/:id/reaction/:id').delete(deleteReaction)

module.exports = router;
