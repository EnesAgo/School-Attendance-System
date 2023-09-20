const mongoose = require("mongoose");

require("dotenv").config()

mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("connected");
},e => {
console.log(e)
})

const QrListSchema = new mongoose.Schema({
    qrID: String,
    svg: String,
})

const userActivityListSchema = new mongoose.Schema({
    username: String,
    email: String,
    uuID: String,
    enterLeaveSchool: String,
    date: Date,
})

const UserListSchema = new mongoose.Schema({
    username: String,
    email: String,
    uuID: String,
    qrID: String,
})

module.exports = {
  QrList: mongoose.model("qrcodes", QrListSchema),
  userActivityList: mongoose.model("useractivity", userActivityListSchema),
  UserList: mongoose.model("users", UserListSchema)
  
}