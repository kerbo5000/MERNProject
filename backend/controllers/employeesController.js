const Employee = require("../model/Employee");
const News = require("../model/News");
const bcrypt = require("bcrypt");
const ROLES_LIST = require("../config/roles_list");

const getEmployees = async (req, res) => {
  let filter = {};
  if (req?.query?.firstname) {
    filter.firstname = req.query.firstname;
  }
  if (req?.query?.lastname) {
    filter.lastname = req.query.lastname;
  }
  if (req?.query?.username) {
    filter.username = req.query.username;
  }
  let limit = 0;
  if (req?.query?.limit && !isNaN(req.query.limit)) {
    limit = parseInt(req.query.limit, 10);
  }

  let skip = 0;

  if (req?.query?.skip && !isNaN(req.query.skip)) {
    skip = parseInt(req.query.skip, 10);
  }
  const employees = await Employee.find(filter).limit(limit).skip(skip);
  if (req.roles.includes(ROLES_LIST.Admin)) {
    return res.status(200).json(employees);
  } else {
    result = employees.map((employee) => ({
      firstname: employee.firstname,
      lastname: employee.lastname,
      username: employee.username,
      _id: employee.id,
      roles: employee.roles,
      news: employee.news,
    }));
    return res.status(200).json(result);
  }
};
const getEmployeeById = async (req, res) => {
  const employee = req.target;
  if (req.roles.includes(ROLES_LIST.Admin)) {
    return res.status(200).json(employee);
  } else {
    return res.status(200).json({
      firstname: employee.firstname,
      lastname: employee.lastname,
      username: employee.username,
      id: employee.id,
      roles: employee.roles,
      news: employee.news,
    });
  }
};
const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "first and last name are required." });
  }
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  let username =
    firstname.slice(0, firstname.length / 2) +
    lastname.slice(0, lastname.length / 2);
  const password =
    firstname.slice(firstname.length / 2) + lastname.slice(lastname.length / 2);
  const hashPwd = await bcrypt.hash(password, 10);
  while (await Employee.findOne({ username })) {
    username += Math.floor(Math.random() * 10);
  }
  try {
    const employee = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username,
      password: hashPwd,
    });
    return res
      .status(201)
      .json({ _id: employee._id, firstname, lastname, username, password });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const updateEmployeePwd = async (req, res) => {
  const employee = req.target;
  if (req.roles.includes(ROLES_LIST.Admin)) {
    if (!req?.body?.newPassword) {
      return res.status(400).json({ message: "New password required" });
    }
    employee.password = await bcrypt.hash(req.body.newPassword, 10);
    const result = await employee.save();
    return res.status(200).json(result);
  } else if (employee._id.equals(req.userId)) {
    if (!req?.body?.newPassword || !req?.body?.oldPassword) {
      return res.status(400).json({ message: "New and old password required" });
    }
    const match = await bcrypt.compare(req.body.oldPassword, employee.password);
    if (match) {
      employee.password = await bcrypt.hash(req.body.newPassword, 10);
      const result = await employee.save();
      return res.status(200).json({
        firstname: result.firstname,
        lastname: result.lastname,
        username: result.username,
        id: result.id,
      });
    } else {
      return res.sendStatus(403);
    }
  } else {
    return res.sendStatus(403);
  }
};

const updateEmployeeRole = async (req, res) => {
  const employee = req.target;
  employee.roles = { ...employee.roles, Admin: 5150 };
  const result = await employee.save();
  return res.status(200).json(result);
};

const updateEmployeeUsername = async (req, res) => {
  const employee = req.target;
  if (req.roles.includes(ROLES_LIST.Admin) || employee._id.equals(req.userId)) {
    if (!req?.body?.newUsername) {
      return res.status(400).json({ message: "New username required" });
    }
    let newUsername = req.body.newUsername;
    const duplicate = await Employee.findOne({ username: newUsername });
    if (duplicate && employee._id.equals(req.userId)) {
      return res.status(409).json({ message: "username is taken" });
    } else if (duplicate) {
      while (await Employee.findOne({ username: newUsername })) {
        newUsername += Math.floor(Math.random() * 10);
      }
    }
    const news = await News.find({ employee: employee._id });
    const usernameChange = async () => {
      await asyncForEach(news, async (article) => {
        article.username = newUsername;
        await article.save();
      });
    };
    usernameChange();
    employee.username = newUsername;
    const result = await employee.save();
    return res.status(200).json(result);
  } else {
    return res.sendStatus(403);
  }
};
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
}
const deleteEmployee = async (req, res) => {
  const result = await Employee.deleteOne({ _id: req.target._id });
  return res.status(200).json({ ...result, _id: req.target._id });
};

const deleteNotification = async (req, res) => {
  const employee = req.target;
  if (req.roles.includes(ROLES_LIST.Admin) || employee._id.equals(req.userId)) {
    const index = employee.notifications.indexOf(req.params.notificationId);
    employee.notifications.splice(index, 1);
    const result = await employee.save();
    return res.status(200).json({ _id: req.params.notificationId });
  } else {
    return res.snedStatus(403);
  }
};

const getNotifications = async (req, res) => {
  const employee = req.target;
  if (req.roles.includes(ROLES_LIST.Admin) || employee._id.equals(req.userId)) {
    return res.status(200).json(employee.notifications);
  } else {
    return res.sendStatus(403);
  }
};

module.exports = {
  getEmployees,
  createNewEmployee,
  updateEmployeePwd,
  updateEmployeeRole,
  updateEmployeeUsername,
  deleteEmployee,
  getEmployeeById,
  deleteNotification,
  getNotifications,
};
