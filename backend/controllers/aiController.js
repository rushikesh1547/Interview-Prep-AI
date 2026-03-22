const { GoogleGenerativeAI } = require("@google/generative-ai");
const {conceptExplainPrompt, questionAnswerPrompt}= require("../utils/prompts")

const genAI = new GoogleGenerativeAI({apiKey: process.env.GEMINI_API_KEY});
//  @desc    Generate Interview questions and answer using gemini
//  @route   POST /api/ai/generate-questions
//  @access  Private

const generateInterviewQuestions = async (req, res) => {
    try {
        const {role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if(!role || !experience || !topicsToFocus ||!numberOfQuestions) {
            return res.status(400).json({message: "Missing required fields" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus , numberOfQuestions);

        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        //Clean it: Remove ```json and ``` from beginning and end 

        const cleanedText = rawText
        .replace(/^```json\s*/, "")//remove starting ``` json
        .replace(/```$/, "") //remove ending ```
        .trim(); // remove extra spaces 

        //Now safe to parse
        const data = JSON.parse(cleanedText); 

        res.status(200).json(data);

    } catch (error) {
        res
        .status(500)
        .json({
            message: "Failed to generate interview questions", 
            error: error.message
        });
    }
};

//@desc      Generate explains a interview question
//@route     POST /api/ai/generate-explanation
//@access    Private

const generateConceptExplanation = async (req, res) => {
};

module.exports = {
    generateInterviewQuestions,
    generateConceptExplanation
}