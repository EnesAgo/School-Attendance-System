const jwt = require('jsonwebtoken');

require("dotenv").config();

const Mongofile = require("./MongooseSchemas");
const QrList = Mongofile.QrList;

  async function createQr(data) {
    try{
        const user = await QrList.create({qrID: data.qrID, svg: data.svg});

        const dataUser = {
          qrID: user.qrID,
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
        const qrCodes = await QrList.find({});
        
        return qrCodes;
    
      }catch(e){
        return e;
      }
  }


  module.exports = {
    createQr: createQr,
    getQrCodes: getQrCodes
  }