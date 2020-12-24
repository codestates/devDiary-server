const { User } = require('../models')
module.exports = {
  updateUserinfo: async (req, res) => {
    console.log(req.body);
    const body=req.body;

    //1. 유저네임만 수정
    if(body.username && !body.oldPassword && !body.newPassword){
      let validPassword= await User.findOne({
        where:{
          email:body.email
        }
      })

      if(!validPassword){
        return res.status(400).json({message:"이메일이 틀렸습니다"})
      }else{
        let result = await User.update({
          username:body.username
        },{
          where:{
            email:body.email
          }
        })
        .catch(err=>console.log(err))
        if(!result){
          return res.status(400).send("failed");
        }else{
          return res.status(200).send(result);
        }
      }
    }

    //2. 패스워드만 수정
    if(!body.username && body.oldPassword && body.newPassword){
      let validPassword= await User.findOne({
        where:{
          email:body.email,
          password:body.oldPassword
        }
      })

      if(!validPassword){
        return res.status(400).json({message:"기존 패스워드가 틀렸습니다"})
      }else{
        let result = await User.update({
          password:body.newPassword
        },
        {
          where:{
            email:body.email
          }
        })
        .catch(err=>console.log(err))
        if(!result){
          return res.status(400).send("failed");
        }else{
          return res.status(200).send(result);
        }
      }
    }
    //3. 유저네임, 패스워드 모두 수정
    if(body.username && body.oldPassword && body.newPassword){
      let validPassword= await User.findOne({
        where:{
          email:body.email,
          password:body.oldPassword
        }
      })

      if(!validPassword){
        return res.status(400).json({message:"기존 패스워드가 틀렸습니다"})
      }else{
        let result = await User.update({
          password:body.newPassword,
          username:body.username
        },
        {
          where:{
            email:body.email
          }
        })
        .catch(err=>console.log(err))
        if(!result){
          return res.status(400).send("failed");
        }else{
          return res.status(200).send(result);
        }
      }
    }
  },
}	