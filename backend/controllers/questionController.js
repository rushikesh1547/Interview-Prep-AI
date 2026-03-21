const Question = require("../models/Question");
const Session = require("../models/Session");

//@desc    Add additional questions to existing session 
//@route   POST /api/questions/add
//@access  Private
exports.addQuestionsToSessions = async (req, res) => {
    try {
        const {sessionId, questions} = req.body;

        if(!sessionId || !questions || !Array.isArray(questions)){
            return res.status(400).json({success: false, message: "Invalid data"});
        }

        const session = await Session.findById(sessionId);
        if(!session){
            return res.status(404).json({success: false, message: "Session not found"});
        }

        //Create new questions
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: session._id,
                question: q.question,
                answer: q.answer,
            }))
        )
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};

//@desc    Pin or unpin a question 
//@route   POST api/questions/:id/pin
//@access  Private
exports.togglePinQuestion = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};

//@desc    Update a question note
//@route   POST api/questions/:id/note
//@access  Private
exports.updateQuestionNote = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};