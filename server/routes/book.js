let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect with book model

let Book = require('../models/book');
const book = require('../models/book');
let bookController = require('../controller/book');
/*CRUD */


/* read operation*/
/* get route for book list*/

router.get('/',bookController.displayBookList);

/* Add operation*/
/* get route for displaying the add-page -- create opeartion*/
router.get('/add', bookController.displayAddPage);


/* Post route for processing tha add-page -- create operation.*/
router.post('/add',bookController.processAddpage);


/* Edit Operation */ 
/* get route for display the Edit-operation -- update opeartion*/
router.get('/edit/:id',bookController.displayEditPage);

/* Post route for process tha edit-operation -- update operation.*/
router.post('/edit/:id',bookController.processEditPage);

/* Delete Operation */ 
router.get('/delete/:id', bookController.performDelete);
/* get to perform delete operation -- deletion*/

module.exports=router;