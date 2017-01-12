document.addEventListener("DOMContentLoaded", function(event){

var itemCount = 0;
var score = 0;

//creates objects with images and points
var clothes = {
  points: 10,
  image: "http://www.clker.com/cliparts/D/R/Z/B/W/g/white-tee-md.png",
  class: "clothes"
};

var food = {
  points: 3,
  image: "http://www.free-icons-download.net/images/cake-icon-46133.png",
  class: "food"
};

 var book = {
   points: 5,
   image: "http://megaicons.net/static/img/icons_sizes/8/178/128/printed-matter-book-icon.png",
   class: "book"
 }

var items = [clothes, food, book];

//function to add score
function addScore(points) {
  score += points;
  document.getElementById("currentscore").innerHTML = "Score : " + score;

};
function removeItem() {
  points = parseInt(this.dataset.score);
  addScore(points);
  this.remove();
    this.remove();
    addItems();

};
// function to add items to screen with eventlistener
function addItems() {

    var item = items[Math.floor(Math.random() * items.length)];
    var addItem = document.createElement("img");
    addItem.setAttribute("src", item.image);
    addItem.setAttribute("data-score", item.points);
    addItem.setAttribute("data-id", itemCount);
    addItem.setAttribute("class", "item");
    addItem.style.height = "30px";
    addItem.style.width = "24px";
    addItem.style.top = Math.ceil(Math.random() * 410) + "px";
    addItem.style.left = Math.ceil(Math.random() * 460) + "px";
    addItem.addEventListener('click', removeItem);

    document.getElementById("shopping-floor").appendChild(addItem);


};


function startGame() {
  for (i = 0; i < 15; i++) {
    addItems();

  };
};

// function removeItem() {
//   points = parseInt(this.getAttributeNode("data-score").value);
//   this.remove();
//   itemCount--;
//   addScore(points);
// };
startGame();
})
