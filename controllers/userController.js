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
};
