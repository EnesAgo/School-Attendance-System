const express = require("express");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const qr = require('qrcode')
const nodemailer = require("nodemailer");
const { google } = require('googleapis')
const sharp = require('sharp');
const fs = require("fs")

require('dotenv').config()


const LoginFunc = require('./db controller/UserController')
const createUser = LoginFunc.createUser;
const loginUser = LoginFunc.loginUser;
const allUsers = LoginFunc.allUsers;

const QrFunc = require('./db controller/QrController')
const createQr = QrFunc.createQr;
const getQrCodes = QrFunc.getQrCodes;

const ActivityFunc = require('./db controller/UserActivityController')
const enterSchool = ActivityFunc.enterSchool;
const leaveSchool = ActivityFunc.leaveSchool;



//init express server
const app = express()
app.use(express.json());

//limit the api call
app.use(express.json({limit: '100mb'}));

//enable cors
app.use(cors({
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }))


//googleapi
const MAIL_CLIENT_ID = process.env.MAIL_CLIENT_ID;
const MAIL_CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
const MAIL_REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
const MAIL_REDIRECT_URI = process.env.MAIL_REDIRECT_URI;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;



const oAuth2Client = new google.auth.OAuth2(MAIL_CLIENT_ID, MAIL_CLIENT_SECRET, MAIL_REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: MAIL_REFRESH_TOKEN })


//routes
app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/signup", async (req, res) => {
  const uuidString = uuidv4()

  const user = await createUser({username: req.body.username, email: req.body.email, uuID: uuidString})

  console.log(user)

  res.json(user)
})

app.post("/login", async (req, res) => {

    const qrCodes = await getQrCodes()
    console.log(req.body)

    if(qrCodes.some(e => e.qrID === req.body.qrID)){
      const loginToken = await loginUser({email: req.body.email, qrID: req.body.qrID})

      console.log(loginToken)

      res.header('authorization', loginToken).json(loginToken)
    }
    else{
      res.json({error: "qr not found"})
    }
  })
app.get("/allusers", async (req, res) => {
  console.log(await allUsers())
  res.json(await allUsers())
})

app.post("/generatecode", async (req, res) => {

    const username = req.body.username;
    const email = req.body.email;

    const newUUID = uuidv4();    

    const qrcode = qr.toString(newUUID, {type:'svg'}, (err, url) => {
        if(err) return err
        return url
      })

    const qrcodeString = qr.toString(newUUID, {type: "utf8"}, (err, url) => {
      if(err) return err
      console.log(url)
      return url
    })

      const newQr = await createQr({username: username, email: email, qrID: newUUID, svg: qrcode.toString()})

      const newQrString = await createQr({username: username, email: email, qrID: newUUID, svg: qrcodeString})

      const roundedCorners = Buffer.from(qrcode);


        await sharp(roundedCorners)
        .png()
        .resize(400, 400)
        .toFile("new-file.png")




      const accessToken = await oAuth2Client.getAccessToken();


    //   const transporter = nodemailer.createTransport({
    //     host: process.env.MAIL_HOST,
    //     port: process.env.MAIL_PORT,
    //     auth: {
    //       user: process.env.MAIL_USER,
    //       pass: process.env.MAIL_PASSWORD
    //     },
    //     tls: {
    //       servername: process.env.MAIL_SERVERNAME
    //   }
    // });


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

    const mailOptions = {
      from: '"YKC ATTENDANCE SYSTEM" <gfree0838@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "YKC / QR CODE", // Subject line
      html: `<b>here is your qr code this:</b> <img src="cid:image">`, // html body
      attachments: [{   // stream as an attachment
        filename: 'image.png',
        // content: fs.createReadStream('./new-file.png')
        path: __dirname +'/new-file.png',
        cid: 'image'
    }]
    }


    transporter.sendMail(mailOptions, (err, info) => {
      if(err){
          console.log(err)
          res.json(err)
      }else{
          console.log(`email sent uscceccfully to :${info.response}`)
          res.json(newQr)
      }
    })

})


app.post("/enterschool", async (req, res) => {
  const activity = enterSchool({username: req.body.username, email: req.body.email, uuID: req.body.uuID})

  res.json(activity)
})

app.post("/leaveschool", async (req, res) => {
  const activity = leaveSchool({username: req.body.username, email: req.body.email, uuID: req.body.uuID})

  res.json(activity)
})


app.listen(process.env.PORT || '3001', () => {
    console.log(`connected to localhost: ${process.env.PORT || '3001'}`)
})