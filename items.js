document.addEventListener("DOMContentLoaded", function(event){

var itemCount = 0;
var score = 0;
console.log(itemCount);


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

function addItems() {
  for (i = itemCount; i < 15; i++) {
  var item = items[Math.floor(Math.random() * items.length)];
  var addItem = document.createElement("img");
  addItem.setAttribute("src", item.image);
  addItem.setAttribute("data-score", item.points);
  addItem.setAttribute("data-id", itemCount);
  addItem.setAttribute("class", "item");
  addItem.setAttribute("height", "30px");
  addItem.setAttribute("width", "24px");
  addItem.style.top = Math.ceil(Math.random() * 410) + "px";
  addItem.style.left = Math.ceil(Math.random() * 460) + "px";
  document.getElementById("shopping-floor").appendChild(addItem);

  itemCount++
}
};


function addScore(points) {
  score += points;
  document.getElementsByClassName("currentscore")[0].innerHTML = "Score : " + score;

};


function startGame() {
  addItems();
  for (i = 0; i < itemCount; i++) {

    document.getElementsByClassName("item")[i].onclick = function () {
      points = parseInt(this.getAttributeNode("data-score").value);
      this.remove();
      itemCount--
      addScore(points);
      console.log(itemCount);
      addItems();
    };
  };

};
startGame();

})
