//Sets cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Gets cookies
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//Checks lewdness in cookies
var lewdness = getCookie("lewdness");
if (lewdness == "") {
	setCookie("lewdness", "Unlewd", 365)
	lewdness = "Unlewd"
};

//Sets the lewd button
if (lewdness == "Lewd") {
	var lewd_out = "Unlewd"
} else {
	var lewd_out = "Lewd"
}
document.getElementById("lewd").textContent = lewd_out;

function set_lewd() {
	if (lewdness == "Unlewd") {
		setCookie("lewdness", "Lewd", 365)
	} else if (lewdness == "Lewd") {
		setCookie("lewdness", "Unlewd", 365)
	}
	location.reload()
}

//Collects the aspect ratio of the screen of the device
var screen_x = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var screen_y = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var aspect_ratio = screen_x / screen_y

//generates the url for derpibooru
if (lewdness == "Lewd") {
	var lewd = "%2C+NOT+safe%2C+NOT+grimdark%2C+NOT+grotesque%2C+NOT+semi-grimdark%2C+NOT+watersports%2C+NOT+scat%2C+NOT+hyper%2C+NOT+foalcon%2C+NOT+impossibly+large+breasts"
} else {
	var lewd = "%2C+safe%2C+NOT+anthro"
}
var random = Math.floor((Math.random() * 999999999999999999) + 0);
var url = "https://derpibooru.org/search.json?q=score.gte%3A250%2C+Aspect_ratio%3A" + aspect_ratio + "~0.1" + lewd + "%2C+NOT+dialogue%2C+NOT+impossibly+obese%2C+NOT+impossibly+large+ass%2C+NOT+impossibly+large+belly%2C+NOT+obese%2C+NOT+fat%2C+NOT+show+accurate%2C+NOT+traditional+art%2C+NOT+text%2C+NOT+comic%2C+NOT+meme%2C+NOT+screencap%2C+NOT+edit+screencap%2C+NOT+animated%2C+NOT+comparison%2C+NOT+absurd+res%2C+NOT+watermark%2C+NOT+eqg%2C+NOT+human%2C+NOT+sfm%2C+NOT+3d%2C+NOT+furry&sf=random%3A" + random + "&filter_id=56027"

//gets an image from derpibooru  randomly with that aspect ratio
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        var array_len = myObj.search.length;
        var image_num = Math.floor((Math.random() * array_len) + 0);
		if (myObj.search[image_num] == undefined) {
			url = "https://derpibooru.org/search.json?q=landscape%2C+background%2C+NOT+comparison&sf=random%3A" + random
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
			return
		}
        var id = myObj.search[image_num].id;
        document.getElementById("id").href = "https://derpibooru.org/" + id;
        var image = myObj.search[image_num].image;
        document.documentElement.style.backgroundImage = "url(https:" + image + ")";
    };
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

//Function to convert the time to AEDT
function toTimeZone(time, zone) {
    var format = 'HH:mm';
    return moment(time, format).tz(zone).format(format)
};

//Runs it when loaded and then every minute
schedule();
function timer() {
	var seconds = new Date().getSeconds();
	if (seconds == 0) {
		schedule();
	};
};
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
	time = parseInt(time, 10);
	
	//gets the schedule and parses the outputs
	var agenda_out = agendaGet(day, time);
	var agenda = agenda_out[0];
	var up_next = agenda_out[1];
	var time_next = agenda_out[2];
	
	//gets the time until next task
	
	//prints the current agenda
	document.getElementById("schedule").textContent = agenda;
	document.getElementById("up_next").textContent = up_next;
	document.getElementById("time_next").textContent = time_next.substr(0,5);
};

//Chooses what time and day correspond to the schedule
function agendaGet(day, time) {
	var agenda = ""
	var up_next = ""
	var time_next = ""

//Sunday
	if (day == "Sunday") {
		if (time >= 0 && time <= 700) {
			agenda = "sleeping"
			up_next = "at home"
			time_next = "07:00:00"
		} else if (time >= 701 && time <= 2200) {
			agenda = "at home"
			up_next = "sleeping"
			time_next = 22
		} else if (time >= 2201 && time <= 2400) {
			agenda = "sleeping"
			up_next = "on the school bus"
			time_next = 31.45
		};

//Monday
	} else if (day == "Monday") {
		if (time >= 0 && time <= 745) {
			agenda = "sleeping"
			up_next = "on the school bus"
			time_next = 7.45
		} else if (time >= 746 && time <= 845) {
			agenda = "on the school bus"
			up_next = "studying"
			time_next = 8.45
		} else if (time >= 846 && time <= 1115) {
			agenda = "studying"
			up_next = "on break"
			time_next = 11.15
		} else if (time >= 1116 && time <= 1135) {
			agenda = "on break"
			up_next = "studying"
			time_next = 11.35
		} else if (time >= 1136 && time <= 1305) {
			agenda = "studying"
			up_next = "on break"
			time_next = 13.05
		} else if (time >= 1306 && time <= 1350) {
			agenda = "on break"
			up_next = "studying"
			time_next = 13.50
		} else if (time >= 1351 && time <= 1520) {
			agenda = "studying"
			up_next = "on the school bus"
			time_next = 15.20
		} else if (time >= 1521 && time <= 1620) {
			agenda = "on the school bus"
			up_next = "at home"
			time_next = 16.20
		} else if (time >= 1621 && time <= 2200) {
			agenda = "at home"
			up_next = "sleeping"
			time_next = 22
		} else if (time >= 2201 && time <= 2400) {
			agenda = "sleeping"
			up_next = "on the school bus"
			time_next = 31.45
		};

//Tuesday
	} else if (day == "Tuesday") {
		if (time >= 0 && time <= 745) {
			agenda = "sleeping"
			up_next = "on the school bus"
			time_next = 7.45
		} else if (time >= 746 && time <= 845) {
			agenda = "on the school bus"
			up_next = "studying"
			time_next = 8.45
		} else if (time >= 846 && time <= 1115) {
			agenda = "studying"
			up_next = "on break"
			time_next = 11.45
		} else if (time >= 1116 && time <= 1135) {
			agenda = "on break"
			up_next = "studying"
			time_next = 11.35
		} else if (time >= 1136 && time <= 1305) {
			agenda = "studying"
			up_next = "on break"
			time_next = 13.05
		} else if (time >= 1306 && time <= 1350) {
			agenda = "on break"
			up_next = "studying"
			time_next = 13.50
		} else if (time >= 1351 && time <= 1520) {
			agenda = "studying"
			up_next = "on the school bus"
			time_next = 15.20
		} else if (time >= 1521 && time <= 1615) {
			agenda = "on the school bus"
			up_next = "at work"
			time_next = 16.15
		} else if (time >= 1616 && time <= 1745) {
			agenda = "at work"
			up_next = "at home"
			time_next = 17.45
		} else if (time >= 1746 && time <= 2200) {
			agenda = "at home"
			up_next = "sleeping"
			time_next = 22
		} else if (time >= 2201 && time <= 2400) {
			agenda = "sleeping"
			up_next = "on the school bus"
			time_next = 31.45
		};

//Wednesday
	} else if (day == "Wednesday") {
		if (time >= 0 && time <= 745) {
			agenda = "sleeping"
			up_next = "on the school bus"
			time_next = 7.45
		} else if (time >= 746 && time <= 845) {
			agenda = "on the school bus"
			up_next = "studying"
			time_next = 8.45
		} else if (time >= 846 && time <= 1115) {
			agenda = "studying"
			up_next = "on break"
			time_next = 11.15
		} else if (time >= 1116 && time <= 1135) {
			agenda = "on break"
			up_next = "studying"
			time_next = 11.35
		} else if (time >= 1136 && time <= 1230) {
			agenda = "studying"
			up_next = "at VET"
			time_next = 12.30
		} else if (time >= 1231 && time <= 1450) {
			agenda = "at VET"
			up_next = "on break"
			time_next = 14.50
		} else if (time >= 1451 && time <= 1500) {
			agenda = "on break"
			up_next = "at VET"
			time_next = 15
		} else if (time >= 1501 && time <= 1745) {
			agenda = "at VET"
			up_next = "at home"
			time_next = 17.45
		} else if (time >= 1745 && time <= 2200) {
			agenda = "at home"
			up_next = "sleeping"
			time_next = 22
		} else if (time >= 2201 && time <= 2400) {
			agenda = "sleeping"
			up_next = "on the school bus"
			time_next = 31.45
		};
	  
//Thursday
	} else if (day == "Thursday") {
		if (time >= 0 && time <= 745) {
			agenda = "sleeping"
			up_next = "on the school bus"
			time_next = 7.45
		} else if (time >= 746 && time <= 845) {
			agenda = "on the school bus"
			up_next = "studying"
			time_next = 8.45
		} else if (time >= 846 && time <= 1115) {
			agenda = "studying"
			up_next = "on break"
			time_next = 11.15
		} else if (time >= 1116 && time <= 1135) {
			agenda = "on break"
			up_next = "studying"
			time_next = 11.35
		} else if (time >= 1136 && time <= 1305) {
			agenda = "studying"
			up_next = "on break"
			time_next = 13.05
		} else if (time >= 1306 && time <= 1350) {
			agenda = "on break"
			up_next = "studying"
			time_next = 13.50
		} else if (time >= 1351 && time <= 1520) {
			agenda = "studying"
			up_next = "on the school bus"
			time_next = 15.20
		} else if (time >= 1521 && time <= 1620) {
			agenda = "on the school bus"
			up_next = "at home"
			time_next = 16.20
		} else if (time >= 1621 && time <= 2200) {
			agenda = "at home"
			up_next = "sleeping"
			time_next = 22
		} else if (time >= 2201 && time <= 2400) {
			agenda = "sleeping"
			up_next = "on the school bus"
			time_next = "07:45:00"
		};

//Friday
	} else if (day == "Friday") {
		if (time >= 0 && time <= 745) {
			agenda = "sleeping"
			up_next = "on the school bus"
			time_next = 7.45
		} else if (time >= 746 && time <= 845) {
			agenda = "on the school bus"
			up_next = "studying"
			time_next = 8.45
		} else if (time >= 846 && time <= 1115) {
			agenda = "studying"
			up_next = "on break"
			time_next = 11.15
		} else if (time >= 1116 && time <= 1135) {
			agenda = "on break"
			up_next = "studying"
			time_next = 11.35
		} else if (time >= 1136 && time <= 1305) {
			agenda = "studying"
			up_next = "on break"
			time_next = 13.05
		} else if (time >= 1306 && time <= 1350) {
			agenda = "on break"
			up_next = "studying"
			time_next = 13.50
		} else if (time >= 1351 && time <= 1520) {
			agenda = "studying"
			up_next = "on the school bus"
			time_next = 15.20
		} else if (time >= 1521 && time <= 1600) {
			agenda = "on the school bus"
			up_next = "at work"
			time_next = 16
		} else if (time >= 1601 && time <= 1820) {
			agenda = "at work"
			up_next = "at home"
			time_next = 18.20
		} else if (time >= 1821 && time <= 2200) {
			agenda = "at home"
			up_next = "sleeping"
			time_next = 22
		} else if (time >= 2201 && time <= 2400) {
			agenda = "sleeping"
			up_next = "at home"
			time_next = 32
		};

//Saturday
	} else if (day == "Saturday") {
		if (time >= 0 && time <= 800) {
			agenda = "sleeping"
			up_next = "at home"
			time_next = 8
		} else if (time >= 701 && time <= 2330) {
			agenda = "at home"
			up_next = "sleeping"
			time_next = 23
		} else if (time >= 2331 && time <= 2400) {
			agenda = "sleeping"
			up_next = "at home"
			time_next = 31
		};
	};
	
	var agenda_out = [agenda, up_next, time_next]
	return agenda_out
};