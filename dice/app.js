//Blinks the underscore
var underscore = "_"
function blinker() {
  if (underscore == "_") {
    underscore = ""
  } else {
    underscore = "_"
  }
  document.getElementById("underscore").textContent = underscore;
}

setInterval(blinker,440);

//Creates an array of adjectives
var action = new Array(11)
action[0] = "lick"
action[1] = "rub"
action[2] = "suck"
action[3] = "kiss"
action[4] = "fondle"
action[5] = "bite/slap"
action[6] = "finger/stroke"
action[7] = "fuck"
action[8] = "tease"
action[9] = "massage"
action[10] = "wild card"

//Creates an array of parts
var part = new Array(12)
part[0] = "face"
part[1] = "ear"
part[2] = "lips"
part[3] = "pussy/cock"
part[4] = "neck"
part[5] = "nipples"
part[6] = "ass"
part[7] = "crotch"
part[8] = "thighs"
part[9] = "mouth"
part[10] = "balls/clit"
part[11] = "wild card"

//Rolls 2 die to select randomly from each array and display it
function roll() {
  var action_rand = Math.floor(Math.random() * 10);
  var part_rand = Math.floor(Math.random() * 11);
  document.getElementById("action").textContent = action[action_rand];
  document.getElementById("part").textContent = part[part_rand];
}