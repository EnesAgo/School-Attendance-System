const express = require("express");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const qr = require('qrcode')
const nodemailer = require("nodemailer");

require('dotenv').config()


const LoginFunc = require('./db controller/UserController')
const createUser = LoginFunc.createUser;
const loginUser = LoginFunc.loginUser;

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

app.post("/generatecode", async (req, res) => {

    const username = req.body.username;
    const email = req.body.email;

    const newUUID = uuidv4();    

    const qrcode = qr.toString(newUUID, {type:'svg'}, (err, url) => {
        if(err) return err
        return url
      })

      const newQr = await createQr({username: username, email: email, qrID: newUUID, svg: qrcode.toString()})

    // const qrcode = qr.toDataURL('I am a pony!', function (err, url) {
    //     console.log(url)
    //     res.send(url)
    //   })


      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        },
        tls: {
          servername: process.env.MAIL_SERVERNAME
      }
    });

    const mailOptions = {
      from: '"YKC ATTENDANCE SYSTEM" <info@ykc.edu.mk>', // sender address
      to: email, // list of receivers
      subject: "YKC / QR CODE", // Subject line
      html: `<b>here is your qr code</b> <br /> ${qrcode}`, // html body
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