import { Question } from '../model/question-model.js'

const index = function (req, res) {
    Question.get(function (err, questions) {
        if (err) {
            res.status(500).json({
                status: "error",
                message: err,
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Question retrieved successfully",
                data: questions
            });
        }
    });
};

const randomQuestion = function (req, res) {
    if (!req.query.difficulty || !req.query.difficulty.match(/^(Easy|Medium|Hard)$/)) {
        res.status(500).json({
            status: "Invalid difficulty value provided",
            message: "Invalid difficulty value provided",
        })
    } else {
        const randQuestion = Question.aggregate([
            {
                $match : { 
                    difficulty: req.query.difficulty
                }
            },
            {
                $sample: {
                    size:1 
                }
            }
        ]).exec((err, question) => {
            if (err) {
                res.status(500).json({
                    status: "error",
                    message: err,
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Random Question retrieved successfully",
                    data: question
                })
            }
        })
    }
}

const questionController = {
    index: index,
    randomQuestion: randomQuestion
}

export default questionController