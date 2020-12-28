const { diary } = require('../models')
module.exports = {
  getPostlist: async (req, res) => {
    console.log(req.body);
    const body=req.body;
    let result = await diary.findAll()
    .catch(err=>console.log(err))
    if(!result){
      res.status(400).send("failed");
    }else{
      res.status(200).send({list:result});
    }
  },
}	