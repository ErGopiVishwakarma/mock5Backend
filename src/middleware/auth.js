const jwt = require('jsonwebtoken')

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    if(token){
          try {
            jwt.verify(token,'doctor',(err,decode)=>{
                if(err){
                    res.status(400).send({err:err})
                }else{
                    next()
                }
            })
          } catch (error) {
            res.status(400).send({err:error})
          }
    }else{
        res.status(400).send({err:'please login first'})
    }
}

module.exports = authenticate