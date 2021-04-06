var express = require('express');
var router = express.Router();
const adminHelpers = require('../helpers/admin-helpers');
/* GET users listing. */
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('admin/login')
  }
}

router.get('/',verifyLogin,function(req, res, next) {
  res.render('admin/login');
});
router.get('/login', function(req, res) {
  if(req.session.loggedIn){
    res.redirect('admin/dashboard')
  }
  else{
     // res.render('admin/adminPanel')
      res.render('admin/login',({"loggInErr":req.session.loggInErr}))
  }
});
router.post('/login',(req,res)=>{
  console.log(req.body)
  adminHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true 
      req.session.admin=response.admin
      console.log(response.admin)
      res.redirect('/admin/dashboard')
    }
    else{
      req.session.loggInErr="Invalid username or password!"
      res.redirect('/admin/login')
    }
  })
})
router.get('/dashboard',verifyLogin,(req,res)=>{
  let adminData=req.session.admin
  res.render('admin/dashboard',{admin:true,adminData})
})
router.get('/hotels',verifyLogin,(req,res)=>{
  let adminData=req.session.admin
  adminHelpers.getAllHotels().then((hotels)=>{
    console.log(hotels)
  res.render('admin/hotels',{admin:true,adminData,hotels})
  })
})
router.get('/users',verifyLogin,(req,res)=>{
  let adminData=req.session.admin
  res.render('admin/user',{admin:true,adminData})
})
router.get('/addHotel',verifyLogin,(req,res)=>{
  let adminData=req.session.admin
  res.render('admin/add-hotels',{admin:true,adminData})
})
router.post('/addHotel',(req,res)=>{
adminHelpers.addHotel(req.body).then((data)=>{
  console.log("hotel added!the data is:",data)
  adminHelpers.sendMail(data)
    res.redirect('/admin/hotels')
  
})

})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/admin')
})
module.exports = router;
