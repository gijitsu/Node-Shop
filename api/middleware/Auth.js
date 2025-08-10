const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const User = require('../models/User');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


const protect = asyncHandler(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))   // ex: [0 : Bearer, 1 : ksdoqdwqeqoeqdqkdq]
    {   
        try {
            token = req.headers.authorization.split(" ")[1];    // retrieve the token which is in the position index 1.
            const decodeToken = jwt.verify(token, JWT_SECRET);

            req.user = await User.findById(decodeToken.id).select("-password");
            next();
        } catch(err) {
            console.log(err);
        }
    }

    // if no token
    if(!token) 
    {
        res.status(401);
        throw new Error("Not authorize!");
    }
});

module.exports = protect;