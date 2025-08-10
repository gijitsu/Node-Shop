const express = require('express');
const userRoute = express.Router();
const AsyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require("../tokenGenerate");
const protect = require('../middleware/Auth');

// login route
userRoute.post(
    "/login", 
    AsyncHandler(async(req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(user && (await user.matchPassword(password)) ) 
        {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id), 
                createdAt: user.createdAt,  
            })
        }
        else 
        {
            res.status(401);
            throw new Error("Invalid Email or Password");

        }

    })
);


// register Routes
userRoute.post("/", 
    AsyncHandler(async(req, res) => {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({email});
        if (existUser) 
        {
            res.status(400);
            throw new Error("User Already Exists");
        }
        else 
        {
            const user = await User.create({
                name,
                email,
                password
            });

            if(user)
            {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt
                });
            }
            else 
            {
                res.status(400);
                throw new Error("Invalid User Data");
            }
        }
}));

// get auth profile data

userRoute.get("/profile", protect, AsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    
    if(user) 
    {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt
        });
    } 
    
    else 
    {
        res.status(404);
        throw new Error("USER NOT FOUND");
    }
}));


// update profile data

userRoute.put("/profile", protect, AsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    
    // if user exists do the block
    if(user)
    {
        // get the new values from the request body or retain the old. 
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) 
        {
            user.password = req.body.password
        }
        
        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            createdAt: updateUser.createdAt,
            token: generateToken(updateUser._id)
        });
    }
    else // else if not throws a 404 status and err message. 
    {
        res.status(404);
        throw new Error("USER NOT FOUND");
    }
}));

module.exports = userRoute;