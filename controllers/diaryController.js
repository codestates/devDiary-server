const { diary, sequelize } = require('../models')
const { comment } = require('../models')
module.exports = {
  getPostlist: async (req, res) => {
    console.log(req.body);
    const body=req.body;
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
      res.status(400).send("failed");
    }else{
      res.status(200).send({list:result});
    }
  },
}	