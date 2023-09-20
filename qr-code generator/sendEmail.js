const fs = require("fs")
const { google } = require('googleapis')
const nodemailer = require("nodemailer");

require("dotenv").config()


const MongooseFile = require("./MongooseSchemas")
const UserList = MongooseFile.UserList;

const MAIL_CLIENT_ID = process.env.MAIL_CLIENT_ID;
const MAIL_CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
const MAIL_REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
const MAIL_REDIRECT_URI = process.env.MAIL_REDIRECT_URI;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const oAuth2Client = new google.auth.OAuth2(MAIL_CLIENT_ID, MAIL_CLIENT_SECRET, MAIL_REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: MAIL_REFRESH_TOKEN })


async function main() {
  let data = JSON.parse(fs.readFileSync("emailList.txt"))

  let arr = []
  
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: MAIL_USER,
          pass: MAIL_PASSWORD,
          clientId: MAIL_CLIENT_ID,
          clientSecret: MAIL_CLIENT_SECRET,
          refreshToken: MAIL_REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      async function sendEmail(email, filename) {
        
        const mailOptions = {
            from: 'YKC ATTENDANCE SYSTEM', 
            to: email, 
            subject: "YKC / QR CODE",
            html: `<b>This is your qr code:</b> <br><br> <img src="cid:image">`,
            attachments: [{
              filename: filename,
              path: __dirname +'/Teachers-Qr-Codes/'+filename,
              cid: 'image'
          }]
          }
        
        
          transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(`err: ${err}`)
            }else{
                console.log(`email sent uscceccfully to :${info.response}`)

                data = JSON.parse(fs.readFileSync("emailList.txt"))
                const unsetArray = data.filter(element => element.email != email);
                
                fs.writeFileSync("emailList.txt", JSON.stringify(unsetArray))
            }
          })
      }



      const allUsers = await UserList.find();


      // console.log(data)

      data.forEach(e => {
        data = JSON.parse(fs.readFileSync("emailList.txt"))
        sendEmail(e.email, e.photo)
      });





    // allUsers.forEach(e => {
    //   sendEmail(e.email, `${e.username}.png`)
    // })


    // sendEmail("enesago010@gmail.com", "Enes Ago.png")
}

main()