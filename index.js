(async () => {
	const User = require("./models/user.js");
  
	const newUser = await User.create({
		name: "karla",
		email: "karla@gmail.com",
		password: "123",
		planId: 1
	});
	console.log(newUser);
  })();

