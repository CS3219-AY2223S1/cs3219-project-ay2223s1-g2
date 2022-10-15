
import mongoose, {Schema} from 'mongoose'

const QuestionSchema = new Schema ({
	_id: Schema.Types.ObjectId,
	title: String,
	questionDesc: String,
	difficulty: "Easy" | "Medium" | "Hard",
	topic: [String]
})

const questionModel = mongoose.model('Question', QuestionSchema)
questionModel.get = function (callback, limit) {
    Question.find(callback).limit(limit);
}

export const Question = questionModel;