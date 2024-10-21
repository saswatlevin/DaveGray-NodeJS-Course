const express = require('express');
const router = express.Router();
const path = require('path');

const data = {};
data.employees = require('../../model/employees.json');

// The get(), post(), put() and delete() methods are chained.
// They all belong to the same route
router.route('/')
    .get((req, res) => {
        // Send the json as such
        res.json(data.employees);
    })
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname 
        });
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname 
        });
    })
    .delete((req, res) => {
        res.json({
            "id": req.body.id
        });
    });

// Route to get an employee by id
router.route('/:id')
    .get((req, res) => {
        res.json({
            "id": req.params.id
        });
    });    


module.exports = router;