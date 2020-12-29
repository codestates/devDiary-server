const { diary } = require('../models')
const { comment } = require('../models')
const sequelize = require("sequelize");
const Op = sequelize.Op;
module.exports = {
  getPostlist: async (req, res) => {
    const body=req.body;
    if(!req.query.tag){
      let result = await diary.findAll({
        attributes:[
          "title","writer","content","tags","createdAt"
        ],
        include:{
          model:comment,
          attributes:["content"],
        }
      })
      .catch(err=>console.log(err))
      if(!result){
        res.status(400).send({message: "failed to get post list"});
      }else{
        res.status(200).send({list:result});
      }
    }else{ 
      let result = await diary.findAll({
        attributes:[
          "title","writer","content","tags","createdAt"
        ],
        where:{
          tags:{
            [Op.like]: `%${req.query.tag}%`
          }
        },
        include:{
          model:comment,
          attributes:["content"],
        },
      })
      .catch(err=>console.log(err))
      if(!result){
        res.status(400).send({message: "failed to get post list"});
      }else{
        res.status(200).send({tag:req.query.tag,list:result});
      }
    }
  }
}	