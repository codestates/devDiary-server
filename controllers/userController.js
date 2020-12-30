const { User, diarie, like, question, comment } = require("../models");
const sequelize = require("sequelize");
module.exports = {
  deleteUser : async (req,res) =>{
    const body = req.body
    const deleteUserInfo = await User.destroy({
      where : {
        email : body.email,
        username : body.username,
        password : body.password
      }
    }).catch(err => {console.log(err)})
    if(!deleteUserInfo){
      res.status(404).send({message : "Cant Delete"})
    } else if(deleteUserInfo){
      res.status(200).json(deleteUserInfo)
    }
  }
  updateUserinfo: async (req, res) => {
    console.log(req.body);
    const body=req.body;

    //1. 유저네임만 수정
    if(body.username && !body.oldPassword && !body.newPassword){
      let validPassword= await User.findOne({
        where:{
          email:body.email
        }
      })

      if(!validPassword){
        return res.status(400).json({message:"이메일이 틀렸습니다"})
      }else{
        let result = await User.update({
          username: req.session.username
        },{
          where:{
            email:body.email
          }
        })
        .catch(err=>console.log(err))
        if(!result){
          return res.status(400).send("failed");
        }else{
          return res.status(200).send({message: "유저네임 변경 성공"});
        }
      }
    }

    //2. 패스워드만 수정
    if(!body.username && body.oldPassword && body.newPassword){
      let validPassword= await User.findOne({
        where:{
          email:body.email,
          password:body.oldPassword
        }
      })

      if(!validPassword){
        return res.status(400).json({message:"기존 패스워드가 틀렸습니다"})
      }else{
        let result = await User.update({
          password:body.newPassword
        },
        {
          where:{
            email:body.email
          }
        })
        .catch(err=>console.log(err))
        if(!result){
          return res.status(400).send("failed");
        }else{
          return res.status(200).send({message: "패스워드 변경 성공"});
        }
      }
    }
    //3. 유저네임, 패스워드 모두 수정
    if(body.username && body.oldPassword && body.newPassword){
      let validPassword= await User.findOne({
        where:{
          email:body.email,
          password:body.oldPassword
        }
      })

      if(!validPassword){
        return res.status(400).json({message:"기존 패스워드가 틀렸습니다"})
      }else{
        let result = await User.update({
          password:body.newPassword,
          username:req.session.username
        },
        {
          where:{
            email:body.email
          }
        })
        .catch(err=>console.log(err))
        if(!result){
          return res.status(400).send("failed");
        }else{
          return res.status(200).send({message: "유저네임과 패스워드 변경 성공"});
        }
      }
	  }
  },

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
  
  logout: async (req, res) => {
		req.session.destroy();
    res.status(205).send("logout successfully");
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
		if (!username) {
			res.send({message:"valid"});
		} else {
			res.send({message:"invalid"});
		}
	},
  CheckPassWord : async (req,res) => {
    const body = req.body
    const check = await User.findOne({
      where : body.password
    })
    if(!check){
      res.status(422).send({message : "PassWord Not Same"})
    } else {
      res.status(200).send({message : "PassWord Same"})
    }
  }
};
