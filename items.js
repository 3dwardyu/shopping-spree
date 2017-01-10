document.addEventListener("DOMContentLoaded", function(event){

var itemCount = 0;
var score = 0;
console.log(itemCount);


var clothes = {
  points: 10,
  image: "http://www.clker.com/cliparts/D/R/Z/B/W/g/white-tee-md.png"
};

var food = {
  points: 3
};

var items = [clothes, food];

function addItems(items) {
  for (i = itemCount; i < 5; i++) {
  var addItem = document.createElement("img");
  addItem.setAttribute("src", clothes.image);
  addItem.setAttribute("height", "150px");
  addItem.setAttribute("width", "120px");
  document.getElementById("shopping-floor").appendChild(addItem);
  itemCount++
}
};


function startGame() {

};

function addScore() {
  var points = 10;
  score += points;
  document.getElementsByClassName("currentscore")[0].innerHTML = "Score : " + score;

};
addItems();
addScore();

})
