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
  },
  deleteUser = async (req,res) =>{
    const body = req.body
    const deleteUserInfo = await User.findOneAndDelete({
      where : {
        email : body.email,
        username : body.username,
        password : body.password
      }
    }).catch(err => {console.log(err)})
    if(!deleteUserInfo){
      res.status(404).send({message : "돌아가"})
    } else if(deleteUserInfo){
      res.status(200).json(deleteUserInfo)
    }
  }
};
