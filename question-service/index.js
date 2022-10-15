// FileName: index.js// Import express
import express from 'express'// Initialize the app
let app = express();// Setup server port


// Import routes
// Use Api routes in the App
import router from "./api-routes.js"

// Import Body parser
import bodyParser from 'body-parser'
// Import Mongoose
import mongoose from 'mongoose'

app.use(bodyParser.json());
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));

async function mongooseConnect() {
    await mongoose.connect('mongodb://localhost:5100', { useNewUrlParser: true});
}

try {
    mongooseConnect()

  } catch (error) {
    console.log('Error while trying to connect to mongoDB.')
    console.log(error)
  }
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")
    
app.use('/api', router)
var port = process.env.PORT || 5200;// Send message for default URL
app.get('/', (req, res) => res.send('Hello World from Question Service'));// Launch app to listen to specified port

app.get('*', function(req, res){
    res.status(404).send('Not Found Error')
})

app.listen(port, function () {
        console.log("Running Question Service on port " + port);
});