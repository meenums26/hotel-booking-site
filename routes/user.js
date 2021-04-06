var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Travelex' });
});
router.get('/login',function(req,res){
  res.render('user/login')
})
router.get('/signup',function(req,res){
  res.render('user/signup')
})
module.exports = router;
