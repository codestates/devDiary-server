const { User } = require('../models')
module.exports = {
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
          username:body.username
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
          username:body.username
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
