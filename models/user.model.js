const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		cnpj: { type: String, required: true },
		address: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ collection: 'crm' }
)

const model = mongoose.model('UserData', User)
module.exports = model
