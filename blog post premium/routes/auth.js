
const r=require('express').Router(),passport=require('passport'),User=require('../models/User');
r.get('/register',(q,s)=>s.render('auth/register'));
r.post('/register',async(q,s)=>{await User.register(new User({username:q.body.username}),q.body.password);s.redirect('/login');});
r.get('/login',(q,s)=>s.render('auth/login'));
r.post('/login',passport.authenticate('local',{successRedirect:'/posts',failureRedirect:'/login'}));
r.get('/logout',(q,s)=>q.logout(()=>s.redirect('/login')));
module.exports=r;
