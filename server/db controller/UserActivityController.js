const { Sequelize, DataTypes } = require("sequelize");
const jwt = require('jsonwebtoken');

require("dotenv").config();

const sequelize = new Sequelize(process.env.SEQUELIZE_DB, process.env.SEQUELIZE_USER, process.env.SEQUELIZE_PASSWORD, {
    host: process.env.SEQUELIZE_HOST,
    dialect: "mysql",
  });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

  const userActivityList = sequelize.define("useractivity", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,    
    },
    uuID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enterLeaveSchool: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
  });

  sequelize
  .sync()
  .then(() => {
    console.log("User table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });


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