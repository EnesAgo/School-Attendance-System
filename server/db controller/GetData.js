const Mongofile = require("./MongooseSchemas");
const userActivityList = Mongofile.userActivityList;
const moment = require('moment');

async function getData(startDate, endDAte) {
    try{
        const activity = await userActivityList.find({});

        console.log(moment(activity[0].date).format());

        const range = await userActivityList.find({ //query today up to tonight
            date: {
                // $gte: new Date(startDate.year, startDate.month, startDate.day), 
                $gte: moment(`${startDate.year}-${startDate.month}-${startDate.day}`).startOf('day').toDate(),
                $lt: moment(`${endDAte.year}-${endDAte.month}-${endDAte.day}`).startOf('day').toDate()
            }
        })

        console.log(range)
        
        // return moment(activity[0].date).format();
    
        return range

      }catch(e){
        return e;
      }
  }

  async function getUserData(startDate, endDAte, userEmail) {
    try{
        const activity = await userActivityList.find({});

        console.log(moment(activity[0].date).format());

        const range = await userActivityList.find({ //query today up to tonight
            date: {
                // $gte: new Date(startDate.year, startDate.month, startDate.day), 
                $gte: moment(`${startDate.year}-${startDate.month}-${startDate.day}`).startOf('day').toDate(),
                $lt: moment(`${endDAte.year}-${endDAte.month}-${endDAte.day}`).startOf('day').toDate()
            },
            email: userEmail
        })

        console.log(range)
        
        // return moment(activity[0].date).format();
    
        return range

      }catch(e){
        return e;
      }
  }

module.exports = {
    getData: getData,
    getUserData: getUserData
  }