const { User, diarie, like, question, comment } = require("../models");

module.exports = {
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
