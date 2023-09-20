const fs = require("fs")
require("dotenv").config()


const MongooseFile = require("./MongooseSchemas")
const UserList = MongooseFile.UserList;

async function main() {
    let arr = []
    const allUsers = await UserList.find();

    allUsers.forEach(e => {
        arr.push({email: e.email, photo: `${e.username}.png`})
    })

    fs.writeFileSync("emailList.txt", JSON.stringify(arr))


}
main()