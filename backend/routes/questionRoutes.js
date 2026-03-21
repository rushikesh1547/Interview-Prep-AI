const express = require("express");
const {togglePinQuestion, updateQuestionNote, addQuestionsToSessions} = require("../controllers/questionController");
const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/add',protect, addQuestionsToSessions);
router.put('/:id/pin',protect, togglePinQuestion);
router.put('/:id/note',protect, updateQuestionNote);

module.exports = router;