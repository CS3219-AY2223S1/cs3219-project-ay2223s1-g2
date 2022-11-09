import mongoose, {Schema} from 'mongoose'

const QuestionSchema = new Schema ({
	_id: Schema.Types.ObjectId,
	title: String,
	questionDesc: String,
	difficulty: "Easy" | "Medium" | "Hard",
	topic: [String]
})

export const Question = mongoose.model('Question', QuestionSchema)
