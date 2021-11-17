
const express = require ("express")
const router = new express.Router()
const verifyToken = require("../middleware/auth")
const {getSingleTriviaQuestions,verifyAnswer,updatePlayerScore} = require ("./utils")
router.get("/questions/single",verifyToken,(req,res)=>{
    const question = getSingleTriviaQuestions()
    res.status(200).send({data:{question}, status:true, message: "consulta exitosa"})
   })
router.post("/questions/response",verifyToken,(req,res)=>{
 try{const request = req.body
  const winner = verifyAnswer(request.question,request.answer)
  const score = updatePlayerScore(req.headers["user"],winner)
  res.status(200).send({data:{score},status: true, message: "ACTUALIZACIÓN CORRECTA"})
}catch(error){
    console.log(error)  
        res.status(500).send({data:{error: error.toString()}, status:false, message: "error"})
}

})





module.exports = router 