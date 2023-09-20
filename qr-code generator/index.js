const qr = require('qrcode');
const sharp = require('sharp');

const MongooseFile = require("./MongooseSchemas")
const UserList = MongooseFile.UserList;

async function generate(qrID, pathName) {

    const qrcode = qr.toString(qrID, {type:'svg'}, (err, url) => {
        if(err) return err
        // console.log(url)
        return url
      })

    const qrcodeString = qr.toString(qrID, {type: "utf8"}, (err, url) => {
      if(err) return err
      // console.log(url)
      return url
    })

      const roundedCorners = Buffer.from(qrcode);

      try{

        await sharp(roundedCorners)
        .png()
        .resize(400, 400)
        // .toFile(`${__dirname}/qrcodes/${path}.png`)
        .toFile(`Teachers-Qr-Codes/${pathName}.png`)


      } catch(e){
        console.log(`err: ${e}`)
      }
        
      return qrcodeString
}

async function main() {
  const allUsers = await UserList.find();
  
  // console.log(allUsers)

  allUsers.forEach(e => {
    console.log(e.username);
    console.log(e.qrID);

    generate(e.qrID, e.username)

  })

}
  main()

  // generate("90ac8a1e-1a55-41c3-89f1-60e8d9037681", "Brikena Bekteshi")
