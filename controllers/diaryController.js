const { diary, comment, like } = require('../models')
const sequelize = require("sequelize");
const Op = sequelize.Op;
module.exports = {
  getPostlist: async (req, res) => {
    const body=req.body;

    //트렌딩 태그 리스트 응답
    let tags = await diary.findAll({
      attributes:["tags"],
      where:{
        tags: {
          [Op.ne]: null
        }
      }
    }).catch(err=>console.log(err));

    // console.log(tags)
    let tagList=tags.map(ele=>{
      if(ele.tags!==undefined){
        return ele.tags;
      }
    })
    console.log(tagList)
    let splitTaglist=tagList.map(ele=>{
      if(ele!==undefined && ele!==null){
        return ele.split("#");
      }
    });
    
    let countObj={};
    for(let i=0; i<splitTaglist.length; i++){
      for(let j=0 ; j<splitTaglist[i].length; j++){
        if(splitTaglist[i][j]!==null && splitTaglist[i][j]!==""){
          if(countObj[splitTaglist[i][j]]){
            countObj[splitTaglist[i][j]]++;
          }else{
            countObj[splitTaglist[i][j]]=1;
          }
        }
      }
    }

    //많이 사용된 태그5개 고르기
    let trendingTags=[];
    for(let i=0; i<5; i++){
      let max=0;
      let maxTag='';
      for(let key in countObj){
        if(countObj[key]>max){
          max=countObj[key];
          maxTag=key;
        }
      }
      trendingTags.push(maxTag);
      delete countObj[maxTag];
    }

    if(!req.query.tag){
      let result = await diary.findAll({
        attributes:[
          "title","writer","content","tags","createdAt"
        ],
        include:[{
          model : comment,
          attributes: ["id"]
        },
        {
          model: like,
          attributes: ["id"]
        }]
      })
      .catch(err=>console.log(err))
      if(!result){
        res.status(400).send({message: "failed to get post list"});
      }else{
        res.status(200).send({tagList:trendingTags ,list:result});
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
        include:[{
          model : comment,
          attributes: ["id"]
        },
        {
          model: like,
          attributes: ["id"]
        }]
      })
      .catch(err=>console.log(err))
      if(!result){
        res.status(400).send({message: "failed to get post list"});
      }else{
        res.status(200).send({tag:req.query.tag,list:result});
      }
    }
  },
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
      writer:req.session.username,
      tags:body.tags
    })
    .catch(err=>console.log(err));
    if(!result){
      res.status(400).send("failed");
    }else{
      res.status(200).send({message: "새 글을 등록했습니다"});
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