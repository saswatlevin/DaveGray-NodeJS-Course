const express = require('express');
const router = express.Router();
const path = require('path');
const employeesController = require('../../controllers/employeesController');
//const verifyJWT = require('../../middleware/verifyJWT');


// The get(), post(), put() and delete() methods are chained.
// They all belong to the same route.
// These methods can also be defined separately without chaining.
// The individual routes can be protected by passing verifyJWT as an argument in them.
router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

// Route to get an employee by id
router.route('/:id')
    .get(employeesController.getSingleEmployee);    


module.exports = router;