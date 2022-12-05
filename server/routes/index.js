var express = require('express');
var router = express.Router();
let indexController = require('../controller/index');

/* GET home page. */
router.get('/', indexController.displayHomePage)

/* GET home page. */
router.get('/home', indexController.displayHomePage)

/* GET about page. */
router.get('/about', indexController.displayAboutPage)

/* GET products page. */
router.get('/products', indexController.displayProductsPage)


/* GET services page. */
router.get('/services', indexController.displayServicesPage)


/* GET contact page. */
router.get('/contact', indexController.displayContactPage)


router.get('/login', indexController.displayLoginPage)
//post router for login page
router.post('/login', indexController.processLoginPage)


router.get('/register', indexController.displayRegisterPage)
//post router for register page
router.post('/register', indexController.processRegisterPage)

router.get('/logout', indexController.performLogout);
module.exports = router;

