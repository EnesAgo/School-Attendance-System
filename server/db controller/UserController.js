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

  const UserList = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuID: {
      type: DataTypes.STRING
    }
  });

  sequelize
  .sync()
  .then(() => {
    console.log("User table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });


  async function createUser(data) {
    try{

        const user = await UserList.create({username: data.username, email: data.email, uuID: data.uuID});

        const token = jwt.sign({uuID: data.uuID}, process.env.JWT_SECRET);
    
        const dataUser = {
          username: user.username, 
          email: user.email, 
          uuID: user.uuID,
          token: token
        }

        return dataUser


    }catch(e){
        console.log(e)
        return e;
    }
    
  }


  async function loginUser(data) {
    try{

      const user = await UserList.findOne({where: {
        email: data.email
    }})

    console.log(user)

      const token = jwt.sign({user: user.uuID}, process.env.JWT_SECRET);
  
      const dataUser = {
        username: user.username, 
        email: user.email, 
        uuID: user.uuID,
        token: token
      }

      return dataUser


  }catch(e){
      console.log(e)
      return e;
  }
  }

async function allUsers() {
  return await UserList.findAll()
}


  module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    allUsers: allUsers
  }