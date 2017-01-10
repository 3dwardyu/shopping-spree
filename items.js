document.addEventListener("DOMContentLoaded", function(event){
  console.log("loaded");




var itemCount = 0;
var score = 0;
console.log(itemCount);


var clothes = {
  points: 10,
  image: "http://www.clker.com/cliparts/D/R/Z/B/W/g/white-tee-md.png"
};
console.log("Clothes are " + clothes.points + " points");
var food = {
  points: 3
};
var items = [clothes, food]

function addItems(items) {
  for (i = itemCount; i < 5; i++) {
  var addItem = document.createElement("img");
  addItem.setAttribute("src", clothes.image);
  document.getElementById("shopping-floor").appendChild(addItem)
  itemCount++
}


};


function startGame() {

};

function addScore(score, points) {
  score += points;
  document.getElementById("scoreboard").appendChild(score);
};
addItems();
addScore();

})
