document.addEventListener("DOMContentLoaded", function(event){
  itemCount = 0;
  var score;
  var timer;
  var time = 30;
  var startTimer;
  var highScore = 0;

  // Finds the size of your browser
  var innerPageWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var innerPageHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  // Sets play area based on the size of your current broswer size
  var playScreen = document.getElementById("shopping-floor");
  var screenWidth = (innerPageWidth * 0.8)
  var screenHeight = (innerPageHeight * 0.8)
  playScreen.style.width = screenWidth + "px";
  playScreen.style.height = screenHeight + "px";

  //creates objects with images and points
  var clothes = {
    points: 100,
    image: "https://s3-us-west-2.amazonaws.com/shoppingspree/Tshirt.svg",
    class: "clothes"
  }
  var candy = {
    points: 10,
    image: "https://s3-us-west-2.amazonaws.com/shoppingspree/Candy.svg",
    class: "candy"
  }
  var computer = {
   points: 500,
   image: "https://s3-us-west-2.amazonaws.com/shoppingspree/Computer.svg",
   class: "computer"
  }
  var camera = {
   points: 300,
   image: "https://s3-us-west-2.amazonaws.com/shoppingspree/Camera.svg",
   class: "book"
  }
  var shoes = {
   points: 50,
   image: "https://s3-us-west-2.amazonaws.com/shoppingspree/Shoes.svg",
   class: "shoes"
  }
  var cheese = {
   points: 35,
   image: "https://s3-us-west-2.amazonaws.com/shoppingspree/Cheese.svg",
   class: "cheese"
  }
  var toy = {
   points: 20,
   image: "https://s3-us-west-2.amazonaws.com/shoppingspree/Lego.svg",
   class: "toy"
  }
  var glasses = {
   points: 50,
   image: "https://s3-us-west-2.amazonaws.com/shoppingspree/Eyeglass.svg",
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
    addItem.style.top = Math.ceil(Math.random() * (screenHeight - 50)) + "px";
    addItem.style.left = Math.ceil(Math.random() * (screenWidth - 50)) + "px";
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

  // Intro screen, removes the gameboard
  function startScreen(){
    document.getElementById('startingscreen').style.display = "block";
    document.getElementById('gameboard').style.visibility = "hidden";
    document.getElementById('start-button').addEventListener("click", startGame);
  }

  // Removes the starts screen and shows gameboard
  function clearScreen(){
    document.getElementById('startingscreen').style.display = "none";
    document.getElementById('gameboard').style.visibility = "visible";
    document.getElementById("currentscore").innerHTML = "Score : " + score;
    document.getElementById("currenttime").innerHTML = "Time : " + time;
  }

  // Starts the game by clearing the start screen, filling the board and starting timer
  function startGame(){
    score = 0;
    timer = time;
    clearScreen();
    fillBoard();
    runTimer();
  }

  // The game end, clears the board and shows the start screen with scores
  function gameOver() {
    var clear = clearInterval(startTimer);
    clearBoard();
    startScreen();
    postScore();
  };

  // Updates and counts down the timer on screen
  function updateTimer() {
    var currenttime = timer - 1;
    timer = currenttime;
    document.getElementById("currenttime").innerHTML = "Time : " + currenttime;
    if (timer < 0) {
      gameOver();
    }
  }

  // Sets a countdown timer
  function runTimer(){
    startTimer = setInterval(updateTimer,1000)
  };

  // Removes all the items from the board
  function clearBoard(){
    var clearitem = document.getElementsByClassName('item');
    while (clearitem.length > 0) {
      clearitem[0].parentNode.removeChild(clearitem[0]);
    }
  };

  // Fill the game board with 45 items
  function fillBoard() {
    for (i = 0; i < 45; i++) {
      addItem();
    }
  };

  // Calculates the highscore and posts both highscore and current score
  function postScore(){
    document.getElementById('currentgamescore').innerHTML = "Score : " + score;
    if (score > highScore) {
      highScore = score;
    document.getElementById('highscore').innerHTML = "High Score : " + highScore;
    }
    else {
      document.getElementById('highscore').innerHTML = "High Score : " + highScore;
    }
  };

  startScreen();
})
