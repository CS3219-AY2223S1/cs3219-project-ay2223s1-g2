
1. Create empty `mongo.log` file in `question-service-mongodb/log`


2. Run 
`mongod --config mongod.conf ` for Apple M1
`mongod --config mongod.conf` for Windows

Note: Windows version is untested, referenced this [link](https://www.mongodb.com/community/forums/t/how-to-start-mongod-from-configuration-file-in-windows/52508).


3. In `seed-mongodb` folder, run `npm install`


4. To initialise question service with mock data, run:
`npm run seed`

Complete!

Additional Functions:

1. To see what questions is in the db, run
`node print-questions.js`
Note: need to `Ctrl+C` to get out of this.