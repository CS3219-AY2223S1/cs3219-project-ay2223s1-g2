import mongoose from 'mongoose'
import { Question } from './question-model.js'
import { questionData } from './questionData.js'
import "dotenv/config";

mongoose.connect('mongodb://' + process.env.QN_MONGO_IP + ':' + process.env.QN_MONGO_PORT, {
	useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
	console.log('Connected to MongoDB instance.')
}).catch((err) => {
	console.log(err)
})

const seedDB = async () => {
    let count = await Question.count()
    // console.log(count)
    if (count > 0) {
	    await Question.deleteMany({})
    }
    // count = await Question.count()
    // console.log(count)
	await Question.insertMany(questionData)
    // count = await Question.count()
    // console.log(count)
}

seedDB().then(() => {
	console.log('Closing connection.')
}).then(() => {
	mongoose.connection.close()
})