const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session)
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(session({
    secret: process.env.DATABASE_SECRET,
    resave: false,
    saveUninitialized: false
}))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
	console.log("Connected to Database")
	const PORT = process.env.PORT
	app.listen(PORT, () => {
		console.log(`Servidor ativo na porta ${PORT}`)
	})
}).catch((err) => console.log(err))

const routes = require("./routes/api");
app.use("/", routes);


