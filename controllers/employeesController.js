const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) {this.employees = data}

};
const getAllEmployees = (req, res) => {
    // Send the json as such
    res.json(data.employees);
};

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname 
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({'message': 'First and Last names are mandatory.'});
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
    console.log("req.body.id in updateEmployee", req.body.id);
    const employee = data.employees.find(emp => emp.id == parseInt(req.body.id));
    console.log("employee in updateEmployee", employee);
    
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }

    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];

    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1: a.id < b.id ? -1 : 0 ));

    res.json(data.employees);

};

const deleteEmployee = (req, res) => {
    console.log("req.body.id in deleteEmployee", req.body.id);
    const employee = data.employees.find(emp => emp.id == parseInt(req.body.id));
    console.log("employee in deleteEmployee", employee);
    
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
};

const getSingleEmployee = (req, res) => {
    const { id } = req.params;
    console.log("id in getSingleEmployee", id);
    const employee = data.employees.find(emp => emp.id == parseInt(id));
    console.log("employee in getSingleEmployee", employee);
    
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    
    res.json(employee);
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getSingleEmployee
};