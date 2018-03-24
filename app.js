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