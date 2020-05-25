const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async(req, res)=>{
    const { email, password } = req.body;
    try{
        const user = new User({ email, password });
        await user.save();
        const token = jwt.sign({userId: user._id}, 'SECRET_KEY');
        res.send({token})
    } catch(err){
        res.status(422).send(err.message);
    }
 });

 router.post('/signin', async(req, res)=>{
     const { email, password } = req.body;
     if(!email || !password){
         res.status(422).send({error: `Please provide valid email or password`});
     } try {
        const user = await User.findOne({email});
        if(!user){
            res.status(422).send({error: `Please provide valid email or password`})
        }
        const token = jwt.sign({userId: user._id}, 'SECRET_KEY');
        res.send({token});
     } catch (err){
         res.status(422).send({error: `Please provide valid email or password`})
     }
 });

 module.exports = router;