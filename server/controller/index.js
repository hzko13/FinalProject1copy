let express = require('express');
let router = express.Router();

module.exports.displayHomePage = (req,res)=> {
    res.render('partials/home', { title: 'Home' });}

module.exports.displayAboutPage = (req,res)=> {
    res.render('partials/about', { title: 'About'
    });}

module.exports.displayProductsPage = (req,res)=> {
    res.render('index', { title: 'Products'
    });}
module.exports.displayProductsPage = (req,res)=> {
    res.render('partials/index', { title: 'Schedule'
    });}

module.exports.displayServicesPage = (req,res)=> {
    res.render('partials/new', { title: 'Services'
    });}

module.exports.displayContactPage = (req,res)=> {
    res.render('partials/Contact', { title: 'Contact'
    });}

    module.exports.displaySchedulePage = (req,res)=> {
        res.render('partials/schedule', { title: 'Schedule'
        });}
    

module.exports.displayLoginPage = (req,res)=> {
    if (!req.user)
    {
        res.render('auth/login',
        {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/')
    }}
module.exports.processLoginPage = (req,res) => {
    passport.authenticate('local',(err,user, info)=>
    {
        if (err)
        {
            return next(err);
        }
        if (!user)
        {
            req.flash('loginMessage',
            'AuthenticationError');
            return res.redirect('login');
        }
        req.login(user,(err) =>{
            if (err)
            {
                return next(err)
            }
            return res.redirect('/book-list');
        })
    })(req,res.next)}

module.exports.displayRegisterPage = (req,res)=>{
    //check if user is not already logged in
    if (!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            message: req.flash('RegisterMessage'),
            displayName: req.user ? req.user.displayName:''
        })
    }
    else
    {
        return res.redirect('/')
    }}

module.exports.processRegisterPage = (req,res)=>{
    let newUser = new User({
        username: req.body.username,
        //password:req.body.password,
        email:req.body.email,
        displayName: req.body.displayName

    })
    User.register(newUser, req.body.password, (err) =>{
        if (err)
        {
            console.log("Error: Inserting the new User");
            if (err.name=="UserExsistsError")
            {
                req.flash('registerMessage',
                'Registration Error: User already Exsists');
            }
        return res.render('auth/register',
        {
            title:'Register',
            message: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName:''
        });
        }
        else
        {
            // if reg not succesful
            return passport.authenticate('local')(req,res,()=>{
                res.redirect('book-list');
            })
        }
    })
}

module.exports.performLogout = (req,res,next)=>
{
    req.logout();
    res.redirect('/');
}