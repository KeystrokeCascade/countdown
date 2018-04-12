//Collects the aspect ratio of the device
var screen_x = screen.width;
var screen_y = screen.height;
var aspect_ratio = screen_x / screen_y

//generates the url for derpibooru
var random = Math.floor((Math.random() * 999999999999999999) + 0);
var url = "https://derpibooru.org/search.json?q=score.gte%3A250%2C+Aspect_ratio%3A" + aspect_ratio + "~0.01%2C+NOT+animated%2C+NOT+absurd+res%2C+NOT+watermark%2C+NOT+eqg%2C+NOT+anthro%2C+NOT+human%2C+NOT+sfm&sf=random%3A" + random

//gets an image from derpibooru  randomly with that aspect ratio
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        var array_len = myObj.search.length;
        var image_num = Math.floor((Math.random() * array_len) + 0);
        var id = myObj.search[image_num].id;
        document.getElementById("id").textContent = id;
        var image = myObj.search[image_num].image;
        document.documentElement.style.backgroundImage = "url(https:" + image + ")";
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

//Function to convert the time to AEDT
function toTimeZone(time, zone) {
    var format = 'HH:mm';
    return moment(time, format).tz(zone).format(format)
}

//Runs it when loaded and then every minute
schedule();
function timer() {
  var seconds = new Date().getSeconds();
  if (seconds == 0) {
    schedule();
  }
}
setInterval(timer,1000);

//Takes the time and date and calculates the event on
function schedule() {
  
  //Creates time and prints it
  var time_output = toTimeZone(new Date(), 'Australia/Melbourne');
  document.getElementById("time").textContent = time_output;
  
  //Converts the day of week from a number to string and prints it
  var time = moment.tz(new Date(),'Australia/Melbourne');
  var day = time.format('dddd');
  document.getElementById("day").textContent = day;
  
  //Changes time to an integer
  var time = time_output.replace(":", "");
  time = parseInt(time, 10)
  
  //Chooses what time and day corrospond to the schedule
  var agenda = ""
  //Sunday

  if (day == "Sunday") {
      if (time >= 0 && time <= 700) {
        agenda = "sleeping"
      } else if (time >= 701 && time <= 2200) {
        agenda = "at home"
      } else if (time >= 2201 && time <= 2400) {
        agenda = "sleeping"
      }
      ;

//Monday
  } else if (day == "Monday") {
      if (time >= 0 && time <= 745) {
        agenda = "sleeping"
      } else if (time >= 746 && time <= 845) {
        agenda = "on the school bus"
      } else if (time >= 846 && time <= 1115) {
        agenda = "studying"
      } else if (time >= 1116 && time <= 1135) {
        agenda = "on break"
      } else if (time >= 1136 && time <= 1305) {
        agenda = "studying"
      } else if (time >= 1306 && time <= 1350) {
        agenda = "on break"
      } else if (time >= 1351 && time <= 1520) {
        agenda = "studying"
      } else if (time >= 1521 && time <= 1620) {
        agenda = "on the school bus"
      } else if (time >= 1621 && time <= 2200) {
        agenda = "at home"
      } else if (time >= 2201 && time <= 2400) {
        agenda = "sleeping"
      }
      ;

//Tuesday
  } else if (day == "Tuesday") {
      if (time >= 0 && time <= 745) {
        agenda = "sleeping"
      } else if (time >= 746 && time <= 845) {
        agenda = "on the school bus"
      } else if (time >= 846 && time <= 1115) {
        agenda = "studying"
      } else if (time >= 1116 && time <= 1135) {
        agenda = "on break"
      } else if (time >= 1136 && time <= 1305) {
        agenda = "studying"
      } else if (time >= 1306 && time <= 1350) {
        agenda = "on break"
      } else if (time >= 1351 && time <= 1520) {
        agenda = "studying"
      } else if (time >= 1521 && time <= 1615) {
        agenda = "on the school bus"
      } else if (time >= 1616 && time <= 1745) {
        agenda = "at work"
      } else if (time >= 1746 && time <= 2200) {
        agenda = "at home"
      } else if (time >= 2201 && time <= 2400) {
        agenda = "sleeping"
      }
      ;

//Wednesday
  } else if (day == "Wednesday") {
      if (time >= 0 && time <= 745) {
        agenda = "sleeping"
      } else if (time >= 746 && time <= 845) {
        agenda = "on the school bus"
      } else if (time >= 846 && time <= 1115) {
        agenda = "studying"
      } else if (time >= 1116 && time <= 1135) {
        agenda = "on break"
      } else if (time >= 1136 && time <= 1230) {
        agenda = "studying"
      } else if (time >= 1231 && time <= 1450) {
        agenda = "at VET"
      } else if (time >= 1451 && time <= 1500) {
        agenda = "on break"
      } else if (time >= 1501 && time <= 1745) {
        agenda = "at VET"
      } else if (time >= 1745 && time <= 2200) {
        agenda = "at home"
      } else if (time >= 2201 && time <= 2400) {
        agenda = "sleeping"
      }
      ;
//Thursday
  } else if (day == "Thursday") {
      if (time >= 0 && time <= 745) {
        agenda = "sleeping"
      } else if (time >= 746 && time <= 845) {
        agenda = "on the school bus"
      } else if (time >= 846 && time <= 1115) {
        agenda = "studying"
      } else if (time >= 1116 && time <= 1135) {
        agenda = "on break"
      } else if (time >= 1136 && time <= 1305) {
        agenda = "studying"
      } else if (time >= 1306 && time <= 1350) {
        agenda = "on break"
      } else if (time >= 1351 && time <= 1520) {
        agenda = "studying"
      } else if (time >= 1521 && time <= 1620) {
        agenda = "on the school bus"
      } else if (time >= 1621 && time <= 2200) {
        agenda = "at home"
      } else if (time >= 2201 && time <= 2400) {
        agenda = "sleeping"
      }
      ;

//Friday
  } else if (day == "Friday") {
      if (time >= 0 && time <= 745) {
        agenda = "sleeping"
      } else if (time >= 746 && time <= 845) {
        agenda = "on the school bus"
      } else if (time >= 846 && time <= 1115) {
        agenda = "studying"
      } else if (time >= 1116 && time <= 1135) {
        agenda = "on break"
      } else if (time >= 1136 && time <= 1305) {
        agenda = "studying"
      } else if (time >= 1306 && time <= 1350) {
        agenda = "on break"
      } else if (time >= 1351 && time <= 1520) {
        agenda = "studying"
      } else if (time >= 1521 && time <= 1600) {
        agenda = "on the school bus"
      } else if (time >= 1601 && time <= 1820) {
        agenda = "at work"
      } else if (time >= 1821 && time <= 2200) {
        agenda = "at home"
      } else if (time >= 2201 && time <= 2400) {
        agenda = "sleeping"
      }
      ;
//Saturday
  } else if (day == "Saturday") {
      if (time >= 0 && time <= 800) {
        agenda = "sleeping"
      } else if (time >= 701 && time <= 2330) {
        agenda = "at home"
      } else if (time >= 2331 && time <= 2400) {
        agenda = "sleeping"
      }
      ;
  }
  //prints the current agenda
  document.getElementById("schedule").textContent = agenda;
}
