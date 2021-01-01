
const { updatePost } = require('./diaryController');
const { User, diary, like, question, comment } = require("../models");
const sequelize = require("sequelize");
module.exports = {
  deleteUser : async (req,res) =>{
    const sess = req.session
    const deleteUserInfo = await User.destroy({
      where : {
        username : sess.username
      }
    }).catch(err => {console.log(err)})
    if(!deleteUserInfo){
      res.status(404).send({message : "Cant Delete"})
    } else if(deleteUserInfo){
      res.status(200).send({message : "bye~"})
    }
  },
  
  updateUserinfo: async (req, res) => {
    console.log(req.body);
    const body=req.body;
    //1. 유저네임만 수정
    if(body.username && !body.oldPassword && !body.newPassword){
      let result = await User.update({
        username: body.username
      },{
        where:{
          email:body.email
        }
      })
      .catch(err=>console.log(err))

      let updatedUserInfo = await User.findOne({
        where:{
          email:body.email
        }
      }).catch(err=>{console.log(err)})

      if(result[0]!==1){
        return res.status(400).send({message:"userInfo didn't changed"});
      }else{
        return res.status(200).send({message:"userInfo updated", username:updatedUserInfo.username});   
      }
    }
    //2. 패스워드만 수정
    if(!body.username && body.oldPassword && body.newPassword){
      let result = await User.update({
        password:body.newPassword
      },
      {
        where:{
          email:body.email
        }
      })
      .catch(err=>console.log(err))

      let updatedUserInfo = await User.findOne({
        where:{
          email:body.email
        }
      }).catch(err=>{console.log(err)})

      if(result[0]!==1){
        return res.status(400).send({message:"userInfo didn't changed"});
      }else{
        return res.status(200).send({message:"userInfo updated"});   
      }
    }
    //3. 유저네임, 패스워드 모두 수정
    if(body.username && body.oldPassword && body.newPassword){
      
      let result = await User.update({
        password:body.newPassword,
        username:body.username 
      },
      {
        where:{
          email:body.email
        }
      })
      .catch(err=>console.log(err))
      let updatedUserInfo = await User.findOne({
        where:{
          email:body.email
        }
      }).catch(err=>{console.log(err)})

      if(result[0]!==1){
        return res.status(400).send({message:"userInfo didn't changed"});
      }else{
        return res.status(200).send({message:"userInfo updated", username:updatedUserInfo.username});  
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
				res.status(200).json({email:userinfo.email, username:userinfo.username});
			});
		}
  },
  
  logout: async (req, res) => {
		req.session.destroy();
    res.status(205).send("logout successfully");
  },
  
  getuserinfo: async (req, res) => {
    const userinfo = await User.findAll({
        where : {
          username : req.session.username
        },
      attributes: ["id","email","username"],
      include : [{
        model : diary,
        attributes : ["id","writer","title","createdAt"],
        include : [{
          model : comment,
          attributes : ["id"]
        },{
          model : like,
          attributes : ["id"]
        }]
    },
    {
      model : question,
      attributes : ["id","writer","title","createdAt"],
      include : [{
        model : comment,
        attributes : ["id"]//[[sequelize.fn("COUNT", "question_id"), "count"]]
      },{
        model : like,
        attributes : ["id"]//[[sequelize.fn("COUNT", "question_id"), "count"]]
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
