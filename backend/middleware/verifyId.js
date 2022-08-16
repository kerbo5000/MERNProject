const News = require("../model/News");
const Employee = require("../model/Employee");
const User = require("../model/User");
const mongoose = require("mongoose");
const verifyId = (type) => {
  return async (req, res, next) => {
    switch (type) {
      case "user":
        if (!req?.params?.userId) {
          return res.sendStatus(400);
        }
        if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
          let user = await User.findById(req.params.userId);
          if (!user) {
            return res.sendStatus(204);
          }
          req.target = user;
          next();
        } else {
          return res.sendStatus(400);
        }
        break;
      case "employee":
        if (!req?.params?.employeeId) {
          return res.sendStatus(400);
        }
        if (mongoose.Types.ObjectId.isValid(req.params.employeeId)) {
          let employee = await Employee.findById(req.params.employeeId);
          if (!employee) {
            return res.sendStatus(204);
          }
          req.target = employee;
          next();
        } else {
          return res.sendStatus(400);
        }
        break;
      case "news":
        if (!req?.params?.newsId) {
          return res.sendStatus(400);
        }
        if (mongoose.Types.ObjectId.isValid(req.params.newsId)) {
          let news = await News.findById(req.params.newsId);
          if (!news) {
            return res.sendStatus(204);
          }
          req.target = news;
          next();
        } else {
          return res.sendStatus(400);
        }
        break;
    }
  };
};

module.exports = verifyId;
