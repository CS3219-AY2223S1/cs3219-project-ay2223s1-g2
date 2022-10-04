import mongoose from 'mongoose'
import { Question } from './question-model.js'

const MockQuestionData = [
	{
		title: "Question 1 Easy",
		questionDesc: "This is easy question 1.",
		difficulty: "Easy",
		topic: []
	},
	{
		title: "Question 2 Easy",
		questionDesc: "This is easy question 2.",
		difficulty: "Easy",
		topic: []
	},
	{
		title: "Question 3 Easy",
		questionDesc: "This is easy question 3.",
		difficulty: "Easy",
		topic: []
	},
	{
		title: "Question 1 Medium",
		questionDesc: "This is medium question 1.",
		difficulty: "Medium",
		topic: []
	},
	{
		title: "Question 2 Medium",
		questionDesc: "This is medium question 2.",
		difficulty: "Medium",
		topic: []
	},
	{
		title: "Question 3 Medium",
		questionDesc: "This is medium question 3.",
		difficulty: "Medium",
		topic: []
	},
	{
		title: "Question 1 Hard",
		questionDesc: "This is hard question 1.",
		difficulty: "Hard",
		topic: []
	},
	{
		title: "Question 2 Hard",
		questionDesc: "This is hard question 2.",
		difficulty: "Hard",
		topic: []
	},
	{
		title: "Question 3 Hard",
		questionDesc: "This is hard question 3.",
		difficulty: "Hard",
		topic: []
	},
]

mongoose.connect('mongodb://localhost:5100', {
	useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
	console.log('Connected to MongoDB instance.')
}).catch((err) => {
	console.log(err)
})

const seedDB = async () => {
	await Question.insertMany(MockQuestionData)
}

seedDB().then(() => {
	console.log('Closing connection.')
}).then(() => {
	mongoose.connection.close()
})