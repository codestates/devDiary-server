const { diary } = require('../models')
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
    if(result[0]<1){
      res.status(400).send("update failed");
    }else{
      res.status(200).send("updated");
    }
  },

  deletePost: async (req, res) => {
    const body = req.body;
    let valid=await diary.findOne({ //작성자와 삭제하려는 사람이 같은 사람인지 유효성검사
      where:{
        id:body.id,
        writer:body.username
      }
    })
    if(!valid){
      return res.status(400).json({message:"invalid writer or id"});
    }else{
      let result= await diary.destroy({
        where:{
          id:body.id
        }
      })
  
      if(!result){
        res.status(400).json({message:"delete failed!"});
      }else{
        res.status(200).json({message:`${result} post deleted`});
      }
    }
  }
}	