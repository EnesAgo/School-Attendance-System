const jwt = require('jsonwebtoken');

require("dotenv").config();

const Mongofile = require("./MongooseSchemas");
const userActivityList = Mongofile.userActivityList;


  async function enterSchool(data) {
    try{

        const objData = {
            username: data.username, 
            email: data.email,
            uuID: data.uuID,
            enterLeaveSchool: "enter",
            date: new Date()
        }

        const activity = await userActivityList.create(objData);

        return activity


    }catch(e){
        console.log(e)
        return e;
    }
    
  }

  async function leaveSchool(data) {
    try{

        const objData = {
            username: data.username, 
            email: data.email,
            uuID: data.uuID,
            enterLeaveSchool: "leave",
            date: new Date()
        }

        const activity = await userActivityList.create(objData);

        return true


    }catch(e){
        console.log(e)
        return e;
    }
    
  }


  module.exports = {
    enterSchool: enterSchool,
    leaveSchool: leaveSchool
  }