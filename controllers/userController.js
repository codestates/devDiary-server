const { User, diarie, like, question, comment } = require("../models");
const sequelize = require("sequelize");

module.exports = {
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
	}
};
