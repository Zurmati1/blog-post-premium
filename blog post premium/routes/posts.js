
const r=require('express').Router(),Post=require('../models/Post');
const auth=(q,s,n)=>q.isAuthenticated()?n():s.redirect('/login');
r.get('/',async(q,s)=>s.render('posts/index',{posts:await Post.find().sort({created:-1})}));
r.get('/new',auth,(q,s)=>s.render('posts/new'));
r.post('/',auth,async(q,s)=>{await Post.create(q.body);s.redirect('/posts');});
r.get('/:id/edit',auth,async(q,s)=>s.render('posts/edit',{post:await Post.findById(q.params.id)}));
r.post('/:id/update',auth,async(q,s)=>{await Post.findByIdAndUpdate(q.params.id,q.body);s.redirect('/posts');});
r.post('/:id/delete',auth,async(q,s)=>{await Post.findByIdAndDelete(q.params.id);s.redirect('/posts');});
module.exports=r;
