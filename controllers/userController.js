const { User } = require("../models");

module.exports = {
  login: async (req, res) => {
		const body = req.body;
		const userinfo = await User.findOne({
			where: {
				email: body.email,
				password: body.password,
			},
		});
		if (!userinfo) {
			res.status(422).send("not find user");
		} else {
			req.session.save(() => {
        req.session.userid = userinfo.id
        req.session.username = userinfo.username
				res.status(200).json({id : userinfo.id, email : body.email,username : userinfo.username});
			});
		}	
  }
};
