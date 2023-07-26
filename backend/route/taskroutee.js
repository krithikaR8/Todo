const express = require('express');
const getalltasks = require('../controllers/taskcontroller');

const router = express.Router();


router.get('/alltask', getalltasks.getAllTasks);
router.post('/create',getalltasks.createtask)
router.put('/update/:id',getalltasks.updatetask)
router.delete('/delete/:id', getalltasks.deletetask)
router.get('/search',getalltasks.searchtask)
module.exports = router;