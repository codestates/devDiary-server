const { diary } = require('../models')
const { comment } = require('../models')

module.exports = {
  newPost: async (req, res) => {
    console.log(req.body);
    const body=req.body;
    let result = await diary.create({
      title:body.title,
      content:body.content,
      writer:body.writer,
      tag:body.tag
    })
    .catch(err=>console.log(err));
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
    .catch(err=>console.log(err));
    if(!result){
      res.status(400).send("update failed");
    }else{
      res.status(200).send(result);
    }
  },

  newComment: async (req, res) => {
    const body = req.body;
    const result=await comment.create({
      diary_id:req.params.id,
      writer: req.session.username,
      content: body.content
    })
    .catch(err=>console.log(err))

    if(!result){
      res.status(400).send({message:"failed to posting new comment"});
    }else{
      res.status(200).send({message: "new Comment added"});
    }
  }
}	