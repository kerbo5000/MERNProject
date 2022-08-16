const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    User: Number,
    Editor: {
      type: Number,
      default: 1984,
    },
    Admin: Number,
  },
  refreshToken: String,
  news: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
    },
  ],
  notifications: [
    {
      type: new mongoose.Schema(
        {
          newsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "News",
            required: true,
          },
          action: {
            type: String,
            required: true,
          },
          amount: {
            type: Number,
            require: true,
          },
        },
        { timestamps: true }
      ),
    },
  ],
});
module.exports = mongoose.model("Employee", employeeSchema);
