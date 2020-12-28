const { diary } = require('../models')
const { comment } = require('../models')

module.exports = {
  getPost: async (req,res) => {
    let result = await diary.findOne({
      include:{
        model: comment,
        attributes:["id","writer","content","createdAt"]
      },
      where:{
        id:req.params.id
      },
      attributes:["id","title","writer","content","createdAt"]
    })
    .catch(err=>console.log(err));

    if(!result){
      res.status(400).json("Post Not Found");
    }else{
      res.status(200).json({data:result});
    }
  },
  
  newPost: async (req, res) => {
    console.log(req.body);
    const body=req.body;
    let result = await diary.create({
      title:body.title,
      content:body.content,
      writer:body.writer,
      tag:body.tag
    })
    .catch(err=>console.log(err))
    if(!result){
      res.status(400).send("failed");
    }else{
      res.status(200).send(result);
    }
  },
  
  updatePost: async (req, res) => {
    const body=req.body;
    let result = await diary.update({
      title:body.title,
      content:body.content,
      tag:body.tag
    },
    {
      where:{
        id:body.id
      }
    })
    if(!result){
      res.status(400).send("update failed");
    }else{
      res.status(200).send(result);
    }
  }
}	