
const router = require('express').Router();

const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController.js')

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId')
.get(getSingleThought)
.delete(deleteThought)
.put(updateThought);

router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;
