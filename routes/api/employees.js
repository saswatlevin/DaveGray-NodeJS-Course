const express = require('express');
const router = express.Router();
const path = require('path');
const employeesController = require('../../controllers/employeesController');


// The get(), post(), put() and delete() methods are chained.
// They all belong to the same route
router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

// Route to get an employee by id
router.route('/:id')
    .get(employeesController.getSingleEmployee);    


module.exports = router;