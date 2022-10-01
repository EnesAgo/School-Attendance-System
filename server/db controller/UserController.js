const jwt = require('jsonwebtoken');


const Mongofile = require("./MongooseSchemas");
const UserList = Mongofile.UserList;


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

      const user = await UserList.findOne({email: data.email})

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
  return await UserList.find({})
}


  module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    allUsers: allUsers
  }