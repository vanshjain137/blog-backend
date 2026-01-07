const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../model/auth');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let otpStore = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send OTP Route
router.post('/user/forgot-password', (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email }).then(user => {
        if (!user) return res.status(404).json({ msg: "Email not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
        otpStore[email] = otp; // Save OTP to verify later

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting the password is: ${otp}. It is valid for 10 minutes.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).json({ error: error.message });
            res.status(200).json({ msg: "OTP sent to your email!" });
        });
    });
});

// Verify OTP & Reset Password Route
router.post('/user/reset-password', (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (otpStore[email] !== otp) {
        return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });

        User.findOneAndUpdate({ email: email }, { password: hash })
            .then(() => {
                delete otpStore[email]; // Clear OTP after use
                res.status(200).json({ msg: "Password updated successfully!" });
            })
            .catch(err => res.status(500).json({ error: err }));
    });
});


//Route to send OTP for Signup
router.post('/user/signup-otp', (req, res) => {
    const { email } = req.body;
    
    User.findOne({ email: email }).then(user => {
        if (user) return res.status(400).json({ msg: "Email already registered" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = otp; 

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your Email - Vansh Jain Blog',
            text: `Your verification code is: ${otp}`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) return res.status(500).json({ error: error.message });
            res.status(200).json({ msg: "Verification code sent to your email!" });
        });
    });
});


//user signup
router.post('/user/signup',(req,res)=>{
    const { fullName, email, password, otp } = req.body;

    if (otpStore[email] !== otp) {
        return res.status(400).json({ msg: "Invalid or expired OTP" });
    }
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else
        {
            const user = new User({
                _id:new mongoose.Types.ObjectId,
                fullName:req.body.fullName,
                email:req.body.email,
                password:hash
            })
            user.save()
            .then(result=>{
                delete otpStore[email]; // Clear OTP
                res.status(200).json({
                    newUser:result
                })
            })
            .catch(error=>{
                console.log(error)
                res.status(500).json({
                    error:error
                })
            })
        }
    })
})

//user login
router.post('/user/login',(req,res)=>{
    User.find({email:req.body.email})
    .then(user=>{
        console.log(user)
        if(user.length<1)
        {
            return res.status(404).json({
                message:'user not found'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    msg:'password matching failed'
                })
            }
            const token = jwt.sign({
                email:user[0].email,
                fullName:user[0].fullName,
                userType:'user'
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'7d'
            })
            res.status(200).json({
                email:user[0].email,
                fullName:user[0].fullName,
                token:token
            })
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


//admin login
router.post('/admin/login',(req,res)=>{
    if(req.body.userName === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD)
    {
        const token = jwt.sign({
                email:'vanshjain@gmail.com',
                fullName:'vansh jain',
                userType:'admin'
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'7d'
            })
            return res.status(200).json({
                fullName:'vansh jain',
                email:'vanshjain@gmail.com',
                token:token
            })
    }
    res.status(404).json({
        msg:'Invalid Admin Credentials'
    })
})




module.exports = router;