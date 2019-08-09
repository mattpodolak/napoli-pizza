const hours = require('../menu/store_hours.json');

export function checkTime(){
    var date = new Date();
    var day = date.getDay();
    var hour = date.getUTCHours();

    console.log('hr', hour)

    if(hours.open){
        //store set to open
        return true
    }

    if(hours.closed){
        //store set to closed
        return false
    }

    if(day == 0){
        //sun
        var times = hours.sun
    }
    else if(day == 1){
        //mon
        var times = hours.mon
    }
    else if(day == 2){
        //tues
        var times = hours.tues        
    }
    else if(day == 3){
        //wed
        var times = hours.wed        
    }
    else if(day == 4){
        //thurs
        var times = hours.thurs        
    }
    else if(day == 5){
        //fri
        var times = hours.fri
    }
    else{
        //sat
        var times = hours.sat
    }

    //convert open and close times to UTC by adding 4 hours
    var openTime = times.open+4;
    var closeTime = times.close+4;

    if(hour >= closeTime && hour < openTime){
        //store is closed
        return false
    }
    else{
        //store is open
        return true
    }

    
}