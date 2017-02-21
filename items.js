document.addEventListener("DOMContentLoaded", function(event){
  itemCount = 0;
  var score;
  var timer;
  var time = 3;
  var startTimer;
  var highScore = 0;

  //creates objects with images and points
  var clothes = {
    points: 100,
    image: "file:///Users/edwardyu/Desktop/projects/images/Tshirt.svg",
    class: "clothes"
  }
  var candy = {
    points: 10,
    image: "file:///Users/edwardyu/Desktop/projects/images/Candy.svg",
    class: "candy"
  }
  var computer = {
   points: 500,
   image: "file:///Users/edwardyu/Desktop/projects/images/Computer.svg",
   class: "computer"
  }
  var camera = {
   points: 300,
   image: "file:///Users/edwardyu/Desktop/projects/images/Camera.svg",
   class: "book"
  }
  var shoes = {
   points: 50,
   image: "file:///Users/edwardyu/Desktop/projects/images/Shoes.svg",
   class: "shoes"
  }
  var cheese = {
   points: 35,
   image: "file:///Users/edwardyu/Desktop/projects/images/Cheese.svg",
   class: "cheese"
  }
  var toy = {
   points: 20,
   image: "file:///Users/edwardyu/Desktop/projects/images/Lego.svg",
   class: "toy"
  }
  var glasses = {
   points: 50,
   image: "file:///Users/edwardyu/Desktop/projects/images/Eyeglass.svg",
   class: "toy"
  }

  //puts items into an array to be selected at random
  var items = [clothes, candy, computer, camera, shoes, cheese, toy, glasses];

  //function to add score
  function addScore(points) {
    score += points;
    document.getElementById("currentscore").innerHTML = "Score : " + score;
  };

  // function to add items to screen with eventlistener
  function addItem() {
    var item = items[Math.floor(Math.random() * items.length)];
    var addItem = document.createElement("img");
    addItem.setAttribute("src", item.image);
    addItem.setAttribute("data-score", item.points);
    addItem.setAttribute("data-id", itemCount);
    addItem.className = 'item draggable';
    addItem.style.top = Math.ceil(Math.random() * 410) + "px";
    addItem.style.left = Math.ceil(Math.random() * 560) + "px";
    document.getElementById("shopping-floor").appendChild(addItem);
  };

  //interact library that allows drag and drop
  interact('.draggable').draggable({
    inertia: true,
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementReact: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    onmove: dragMoveListener
  });

  //removes items and calculates the points once dropped
  interact('.dropzone').dropzone({
    accept: '.draggable',
    overlap: 0.75,
    ondrop: function (event){
      var item = event.relatedTarget;
      points = parseInt(item.dataset.score);
      addScore(points);
      item.remove();
      addItem();
    }
  });

  //adds drag event listener
  function dragMoveListener (event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };
  //
  // function start() {
  //   score = 0;
  //   timer = 5000;
  //   gameOn = true;
  //   startScreen();
  //   updateTimer();
  // };


  function startScreen(){
    document.getElementById('startingscreen').style.display = "block";
    document.getElementById('gameboard').style.visibility = "hidden";
    document.getElementById('start-button').addEventListener("click", startGame);
  }

  function clearScreen(){
    document.getElementById('startingscreen').style.display = "none";
    document.getElementById('gameboard').style.visibility = "visible";
    document.getElementById("currentscore").innerHTML = "Score : " + score;
    document.getElementById("currenttime").innerHTML = "Time : " + time;
  }

  function startGame(){
    score = 0;
    timer = time;
    clearScreen();
    fillBoard();
    runTimer();
  }

  function gameOver() {
    var clear = clearInterval(startTimer);
    clearBoard();
    startScreen();
    postScore();
  };

  function updateTimer() {
    var currenttime = timer - 1;
    timer = currenttime;
    document.getElementById("currenttime").innerHTML = "Time : " + currenttime;
    if (timer < 0) {
      gameOver();
    }
  }

  function runTimer(){
    startTimer = setInterval(updateTimer,1000)
  };

  function clearBoard(){
    var clearitem = document.getElementsByClassName('item');
    while (clearitem.length > 0) {
      clearitem[0].parentNode.removeChild(clearitem[0]);
    }
  }

  function fillBoard() {
    for (i = 0; i < 30; i++) {
      addItem();
    };
  };

  function postScore(){
    currentGameScore = score;
    document.getElementById('currentgamescore').innerHTML = "Currentscore : " + currentGameScore;
    if (currentGameScore > highScore) {
      highScore = currentGameScore;
    document.getElementById('highscore').innerHTML = "Highscore : " + highScore;
  }
  else {
    document.getElementById('highscore').innerHTML = "Highscore : " + highScore;
  }
};


  startScreen();
})
