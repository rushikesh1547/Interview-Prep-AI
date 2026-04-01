const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Middleware to protect routes
const protect = async (req, res, next) => {
    
    try{
        let token = req.headers.authorization;

        if(token && token.startsWith("Bearer ")){
            token = token.split(" ")[1]; //Extract token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //Verify token
            req.user = await User.findById(decoded.id).select("-password"); //Get user from token
            next();
        }else{
            return res.status(401).json({error: "Not authorized, No token"});
        }
    }catch(error){
        return res.status(401).json({message: "Token Failed", error: error.message});
    }
};

module.exports = {protect};