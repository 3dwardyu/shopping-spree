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
function removeItem(item) {
  points = parseInt(this.dataset.score);
  addScore(points);
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
    addItem.className = 'item draggable';
    // addItem.setAttribute("class", "item");
    // addItem.setAttribute("class", "draggable");
    addItem.style.height = "30px";
    addItem.style.width = "24px";
    addItem.style.top = Math.ceil(Math.random() * 410) + "px";
    addItem.style.left = Math.ceil(Math.random() * 560) + "px";
    // addItem.addEventListener('click', removeItem);
    // addItem.addEventListener('click', dragMoveListener);

    document.getElementById("shopping-floor").appendChild(addItem);

};

 interact('.draggable').draggable({
    inertia: true,
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementReact: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    onmove: dragMoveListener
  });

interact('.dropzone').dropzone({
    accept: '.draggable',
    overlap: 0.75,
//     ondropactivate: function (event) {
//
//   event.target.classList.add('drop-active');
// },
// ondragenter: function (event) {
//   var draggableElement = event.relatedTarget,
//       dropzoneElement = event.target;
//       document.getElementById('cart').style.border('solid 5px red');
// },
    ondrop: function (event){
      console.log(event);
      var item = event.relatedTarget;
    points = parseInt(item.dataset.score);
    addScore(points);
    item.remove();
      addItems();
    }

  });
  function dragMoveListener (event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };



function startGame() {
  for (i = 0; i < 15; i++) {
    addItems();
  };
};


startGame();
})
