const { User, diarie, like, question, comment } = require("../models");

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
  },
  // User 와 연결된 테이블,
  // diarie 와 연결된 테이블 include
  // question 와 연결된 테이블 include
  // like 와 연결된 테이블 include
  // comment 와 연결된 테이블 include
  
	getuserinfo: async (req, res) => {
    
		const userinfo = await User.findAll({
      // where : {id : req.session.userid},
      include : [{
        model : diarie,
        attributes : ["id","title","createdAt"],
    },
  {
    model : question,
    attributes : ["id","title","createdAt"],
      
  }]

    }).catch(err => {console.log(err)})
    if(!userinfo){
      res.status(404).send("not found")
    } else if(userinfo){
      res.status(200).json(userinfo)
    }
	}
};
