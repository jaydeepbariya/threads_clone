const jwt = require('jsonwebtoken');


exports.auth = async (req,res,next) =>{
    try{
        const token = req.body.token || req.cookies.token || req.header('Authorization').replace("Bearer ", "");
        
        if(!token){
            return res.status(400).json({
                success : false,
                message : "Empty Token"
            });
        }

        let decode;

        try{
            decode = jwt.verify(token, process.env.JWT_SECRET);
        }catch(error){
            console.log("token verification error", error.message);
            return res.status(401).json({
                success : false,
                message : "Invalid Token"
            });
        }

        req.user = decode;
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success : false,
            message : "Error In Token Validation, Please Try Again"
        });
    }

}
