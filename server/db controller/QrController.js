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

  const QrList = sequelize.define("qrcodes", {
    qrID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    svg: {
      type: DataTypes.TEXT('long'),
      allowNull: false,    
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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


  async function createQr(data) {
    try{
      const allQRCodes = await QrList.findAll()
      if(allQRCodes !== [] || allQRCodes){
        await QrList.destroy({where: {}})
      }

        const user = await QrList.create({username: data.username, email: data.email, qrID: data.qrID, svg: data.svg});

        const dataUser = {
          qrID: user.qrID,
          email: user.email, 
          svg: user.svg
        }

        return dataUser


    }catch(e){
        console.log(e)
        return e;
    }
    
  }

  async function getQrCodes() {
    try{
        const qrCodes = await QrList.findAll();
        
        return qrCodes;
    
      }catch(e){
        return e;
      }
  }


  module.exports = {
    createQr: createQr,
    getQrCodes: getQrCodes
  }