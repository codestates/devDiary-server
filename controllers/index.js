const { createRequire } = require("module");
const { User } = require("../models");

module.exports = {
	signUpController: async (req, res) => {
		const body = req.body;
		if (!body.email || !body.password || !body.username) {
			res.status(422).send("insufficient parameters supplied");
		} else if (body.password.length < 6 || body.password.length > 12) {
			res.status(400).send("resize password length");
		} else {
			const userinfo = await User.findOne({
				where: {
					email: body.email,
					password: body.password,
					username: body.username,
				},
			});
			const createuserinfo = await User.create({
				email: body.email,
				password: body.password,
				username: body.username,
			});
			// const useremail = await User.findOne({
			// 	where: {
			// 		email: body.email,
			// 	},
			// });
			// const usernickname = await User.findOne({
			// 	where: {
			// 		username: body.username,
			// 	},
			// });
			if (userinfo) {
				res.status(409).send("duple");
			} else if (createuserinfo) {
				res.status(200).json(createuserinfo);
			}
		}
	},
};
