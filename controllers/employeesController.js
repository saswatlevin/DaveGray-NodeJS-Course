const data = {};
data.employees = require('../model/employees.json');

const getAllEmployees = (req, res) => {
    // Send the json as such
    res.json(data.employees);
};

const createNewEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname 
    });
};

const updateEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname 
    });
};

const deleteEmployee = (req, res) => {
    res.json({
        "id": req.body.id
    });
}

const getSingleEmployee = (req, res) => {
    res.json({
        "id": req.params.id
    });
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getSingleEmployee
}