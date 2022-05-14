const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    addThought,
    editThought,
    removeThought,
    createReaction,
    removeReaction
} = require('../../Controllers/thoughtController');

router.route('/')
    .get(getThoughts)
    .post(addThought);

router.route('/:thoughtId')
    .get(getOneThought)
    .put(editThought)
    .delete(removeThought);

router.route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(removeReaction);

module.exports = router;