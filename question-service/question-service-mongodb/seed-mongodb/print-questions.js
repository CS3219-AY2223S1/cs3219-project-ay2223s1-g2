import mongoose from 'mongoose'
import { Question } from './question-model.js'

mongoose.connect('mongodb://localhost:5100', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB instance.')
}).catch((err) => {
  console.log(err)
})

// Note no `await` here
const cursor = Question.find().cursor();

await cursor.forEach((question) => {
  console.log(question)
})

//TODO: Fix having to Ctrl+C to terminate this program
