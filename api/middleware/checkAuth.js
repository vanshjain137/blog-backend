const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token,process.env.JWT_SECRET)
        console.log(verify)
        req.userData = verify;
        if(verify.userType == 'user' || verify.userType == 'admin')
        {
            next()
        }
        else{
            return res.status(401).json({
                error:'user is not valid'
            })
        }
    }
    catch(err)
    {
        return res.status(401).json({
            message:'not a valid user'
        })
    }
}