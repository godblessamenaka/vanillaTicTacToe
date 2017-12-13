let boxes = [];
let player;
let avatar;
let moves = 0;
let computerGame = true;
//sets up board layout and gives each cell a class name to be used later
function init() {
  const board = document.createElement('table');
  document.getElementById('tictactoe').appendChild(board);


  for (let i = 0; i < 3; i++) {
    let row = document.createElement('tr');
    board.appendChild(row);
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement('td');
      cell.classList.add('col' + j, 'row' + i);
      cell.style.cssText = "border: 2px solid rgba(0,0,0,0.3); border-image-slice: 2px; border-image: linear-gradient(to bottom, yellow, rgba(0, 0, 0, 0)) 1 100%;";
      if (i == j) {
        cell.classList.add('diagonalA');
      }
      if (j == 3 - i - 1) {
        cell.classList.add('diagonalB');
      }
      cell.addEventListener('click', set);
      row.appendChild(cell);
      boxes.push(cell);

    }
  }

  let avatars = document.getElementsByClassName("avatar-option")
  for (let i=0; i<avatars.length; i++) {
    avatars[i].addEventListener('click', selectAvatar)
  }
  

  window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          let img = document.querySelector('img'); 
          img.src = URL.createObjectURL(this.files[0]); // set src to file url
          img.onload = imageIsLoaded; // optional onload event listener
          avatar = img.src;
      }
  });
});

function imageIsLoaded(e) { alert("Hey, good lookin'!"); }
  
  newGame();
}

function selectAvatar() {
  console.log(this);
  avatar = this.src;
  alert('Hey, good lookin!');
}

// starts new game, initializing score and moves to zero and cells to empty:
function newGame() {
  moves = 0;
  player = 'X';
  boxes.forEach((square) => {
    square.innerHTML = '';
    square.id="";
  });
  document.getElementById('current-player').innerText = 'Player ' + player;

}

function gameTypeChange() {
  computerGame = !computerGame;
  newGame();
}
/*
Check if a win or not
Winning combos:
if col is all same value
if row is all same value
if diagonal all same value (diagonalA or diagonalB)
 */
function win(clicked) {
  let cellTypes = clicked.className.split(/\s+/);
  for (let i = 0; i < cellTypes.length; i++) {
    let testClass = '.' + cellTypes[i];
    if(victory("" + testClass, player)==="victory"){
      return true;
    };
  }
}

function xCanWin(clicked) {
  let cellTypes = clicked.className.split(/\s+/);
  for (let i = 0; i < cellTypes.length; i++) {
    let testClass = '.' + cellTypes[i];
    if(victory("" + testClass, 'X')==="almostVictorious"){
      return true;
    }
  }
}
// end function XcanWin(clicked)

function willWin(clicked) {
  let cellTypes = clicked.className.split(/\s+/);
  for (let i = 0; i < cellTypes.length; i++) {
    let testClass = '.' + cellTypes[i];
    if(victory("" + testClass, player)==="almostVictorious"){
      return true;
    }
  }
}

//finds all winning combos depending on which cell is clicked, checks if those other cells have the same inner text (player)
function victory(selector, text) {
  let winningCombos = Array.from(document.querySelectorAll(selector));
  let playerMarkedCount = 0;
  for (let i=0; i<winningCombos.length; i++) {
    if (winningCombos[i].id===text){
      playerMarkedCount++;
    }
  }
  if (playerMarkedCount===3){
    return "victory";
  }else if (playerMarkedCount===2){
    return "almostVictorious"
  }
};



//Assigns user value to the clicked square and changes the current player to computer.
function set() {
  if (this.innerHTML !== '') {
    return; //can't click an occupied cell
  }
  this.innerHTML = `<div style="background-image: url(${avatar}); background-repeat: no-repeat; background-position: center"><p>${player}</p></div>`;
  this.id = player;
  moves += 1;
  if (win(this)) {
    alert('Player ' + player + ' wins!!!');
    newGame();
  } else if (moves === 9) {
    alert(`It's a tie!`);
    newGame();
  } else {
    if (player === 'X') {player = 'O'}
    else if (player === 'O') {player = 'X'}
    document.getElementById('current-player').innerText = 'Player ' + player + ' turn...';
    if (computerGame){
      setTimeout(computerSet,800);
    }
  }
}

//Assigns computer value and then changes player back to user
function computerSet() {
  let availableCells = Array.from(document.querySelectorAll("td")).filter((elem) =>{return !elem.id});
  let computerSelection = Math.floor(Math.random() * (availableCells.length));
  for (let i=0; i<availableCells.length; i++){ // Prevent X from winning
   if (xCanWin(availableCells[i])){
      computerSelection=i;
    }
    if (willWin(availableCells[i])){ //but more important, win immediately if you can 
      computerSelection=i;
    }
  }
  availableCells[computerSelection].innerHTML=`<div style="background-image: url('https://lessonpix.com/drawings/96419/100x100/Robot.png')"><p>${player}</p></div>`;
  availableCells[computerSelection].id=player;
  moves += 1; 
  if (win(availableCells[computerSelection])) {
    alert('Player ' + player + ' wins!!!');
    newGame();
  } else if (moves === 9) {    
   alert(`It's a tie!`);
    newGame();
  } else {
    player = "X";
    document.getElementById('current-player').innerText = 'Player ' + player;
  }
}




init();