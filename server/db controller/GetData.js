const Mongofile = require("./MongooseSchemas");
const userActivityList = Mongofile.userActivityList;
const moment = require('moment');

async function getData(startDate, endDAte) {
    try{
        const activity = await userActivityList.find({});

        console.log(moment(activity[0].date).format());

        const range = await userActivityList.find({ //query today up to tonight
            date: {
                $gte: new Date(startDate.year, startDate.month, startDate.day), 
                $lt: new Date(endDAte.year, endDAte.month, endDAte.day)
            }
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
  }