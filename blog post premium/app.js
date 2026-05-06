
const express=require('express'),mongoose=require('mongoose'),session=require('express-session');
const passport=require('passport'),LocalStrategy=require('passport-local');
const User=require('./models/User');
const auth=require('./routes/auth'),posts=require('./routes/posts');
const app=express();
mongoose.connect('mongodb://127.0.0.1:27017/blogPremium');
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(session({secret:'luxury',resave:false,saveUninitialized:false}));
app.use(passport.initialize()); app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{res.locals.user=req.user;next();});
app.use('/',auth); app.use('/posts',posts);
app.get('/',(req,res)=>res.redirect('/posts'));
app.listen(3000);
