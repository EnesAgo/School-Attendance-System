const jwt = require('jsonwebtoken');


const Mongofile = require("./MongooseSchemas");
const UserList = Mongofile.UserList;


  async function createUser(data) {
    try{

        console.log(`userController: ${data.qrID}`)


        const user = await UserList.create({username: data.username, email: data.email, uuID: data.uuID, qrID: data.qrID});

        const token = jwt.sign({uuID: data.uuID}, process.env.JWT_SECRET);
    
        const dataUser = {
          username: user.username, 
          email: user.email, 
          uuID: user.uuID,
          qrID: user.qrID,
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

      const user = await UserList.findOne({qrID: data.qrID})

    console.log(user)

      const token = jwt.sign({user: user.uuID}, process.env.JWT_SECRET);
  
      const dataUser = {
        username: user.username, 
        email: user.email, 
        uuID: user.uuID,
        qrID: user.qrID,
        token: token
      }

      return dataUser


  }catch(e){
      console.log(e)
      return e;
  }
  }

async function allUsers() {
  return await UserList.find({})
}


  module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    allUsers: allUsers
  }