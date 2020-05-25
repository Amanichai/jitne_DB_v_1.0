const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = RequireAuth = (req, res, next)=>{
    const { authorization } = req.headers;
    if(!authorization){
        res.status(401).send({error: `Please log in...`})
    }
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'SECRET_KEY', async(err, payload)=>{
        if(err){
            res.status(401).send({error: `Please log in...`})
        }
        const {userId} = payload;
        const user = await User.find(userId);
        req.user = user;
        next();
    });
};