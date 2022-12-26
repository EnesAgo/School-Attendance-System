const express = require("express");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const qr = require('qrcode')
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

const ActivityFunc = require('./db controller/UserActivityController');
const enterSchool = ActivityFunc.enterSchool;
const leaveSchool = ActivityFunc.leaveSchool;

const GetDataFunc = require("./db controller/GetData");
const { getUserData } = require("./db controller/GetData");
const getData = GetDataFunc.getData;



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


//routes
app.get("/", (req, res) => {
    res.send("hello")
})

app.get("/getData", async (req, res) => {

  const startDate = {
    year: req.query.startDateyear,
    month: req.query.startDatemonth,
    day: req.query.startDateday,
  }
  const endDate = {
    year: req.query.endDateyear,
    month: req.query.endDatemonth,
    day: req.query.endDateday,
  }

  const data = await getData(startDate, endDate)

  res.json(data)
})

app.get("/getUserData", async (req, res) => {

  const startDate = {
    year: req.query.startDateyear,
    month: req.query.startDatemonth,
    day: req.query.startDateday,
  }
  const endDate = {
    year: req.query.endDateyear,
    month: req.query.endDatemonth,
    day: req.query.endDateday,
  }

  const data = await getUserData(startDate, endDate, req.query.email)

  res.json(data)
})

app.post("/signup", async (req, res) => {
  const uuidString = uuidv4()
  const qrIDString = uuidv4()

  console.log(`index: ${qrIDString}`)

  const user = await createUser({username: req.body.username, email: req.body.email, uuID: uuidString, qrID: qrIDString})

  console.log(user)

  res.json(user)
})

app.post("/login", async (req, res) => {

    const qrCodes = await allUsers()
    console.log(req.body)

    console.log(qrCodes.some(e => e.qrID === req.body.qrID))

    if(qrCodes.some(e => e.qrID === req.body.qrID)){
      const loginToken = await loginUser({qrID: req.body.qrID})

      console.log(loginToken)

      res.header('authorization', loginToken).json(loginToken)
    }
    else{
      res.json({error: "user not found"})
    }
})

app.get("/allusers", async (req, res) => {
  console.log(await allUsers())
  res.json(await allUsers())
})

app.post("/generatecode", async (req, res) => {
    const newUUID = req.body.qrID;    

    const qrcode = qr.toString(newUUID, {type:'svg'}, (err, url) => {
        if(err) return err
        console.log(url)
        return url
      })

    const qrcodeString = qr.toString(newUUID, {type: "utf8"}, (err, url) => {
      if(err) return err
      console.log(url)
      return url
    })

      const newQr = await createQr({qrID: newUUID, svg: qrcode.toString()})

      // const newQrString = await createQr({username: username, qrID: newUUID, svg: qrcodeString})

      const roundedCorners = Buffer.from(qrcode);


        await sharp(roundedCorners)
        .png()
        .resize(400, 400)
        .toFile("new-file.png")
        
      return newQr
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