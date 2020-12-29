const { User, diarie, like, question, comment } = require("../models");
const sequelize = require("sequelize");

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
				req.session.username = userinfo.username;
				res.status(200).json(userinfo);
			});
		}
	},
  
  getuserinfo: async (req, res) => {
    
    const userinfo = await User.findOne({
      attributes: ["id","email","username"],
      include : [{
        model : diarie,
        attributes : ["id","title","createdAt"],
        include : [{
          model : comment,
          attributes : [[sequelize.fn("COUNT","diary_id"), "commentCount"]]
        },{
          model : like,
          attributes : [[sequelize.fn("COUNT","diary_id"), "diarieLikeCount"]]
        }]
    },
    {
      model : like,
      attributes : [[sequelize.fn('COUNT','user_id'), 'userLikeCount']]
    },
    {
      model : question,
      attributes : ["id","title","createdAt"],
      include : [{
        model : comment,
        attributes : ["question_id"]
      },{
        model : like,
        attributes : [[sequelize.fn("COUNT", "question_id"), "questionLikeCount"]]
      }]
    }
  ]}).catch(err => {console.log(err)})
    if(!userinfo){
      res.status(404).send("not found")
    } else if(userinfo){
      res.status(200).json(userinfo)
    }
	},
  
	signUpController: async (req, res) => {
		const body = req.body;
		if (!body.email || !body.password || !body.username) {
			res.status(422).send("insufficient parameters supplied");
		} else if (body.password.length < 6 || body.password.length > 12) {
			res.status(400).send("resize password length");
		} else {
			const createuserinfo = await User.create({
				email: body.email,
				password: body.password,
				username: body.username,
			});
			if (createuserinfo) {
				res.status(200).json(createuserinfo);
			}
		}
	},
	filteremail: async (req, res) => {
		const body = req.body;
		const email = await User.findOne({
			where: {
				email: body.email,
			},
		});
		if (email) {
			res.send(true);
		} else {
			res.send(false);
		}
	},
	filterusername: async (req, res) => {
		const body = req.body;
		const username = await User.findOne({
			where: {
				username: body.username,
			},
		});
		if (username) {
			res.send(true);
		} else {
			res.send(false);
		}
	},
};
