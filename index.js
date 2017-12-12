let boxes = [];
let player;
let avatar;
let moves = 0;

//sets up board layout and gives each cell a class name to be used later
function init() {
  const board = document.createElement('table');
  document.getElementById('tictactoe').appendChild(board);


  for (var i = 0; i < 3; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < 3; j++) {
      var cell = document.createElement('td');
      cell.classList.add('col' + j, 'row' + i);
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
  window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('img'); 
          img.src = URL.createObjectURL(this.files[0]); // set src to file url
          img.onload = imageIsLoaded; // optional onload event listener
          avatar = img.src;
      }
  });
});

function imageIsLoaded(e) { alert("Hey, good lookin'!"); }
  
  newGame();
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

/*
Check if a win or not
Winning combos:
if col is all same value
if row is all same value
if diagonal all same value (diagonalA or diagonalB)
 */
function win(clicked) {
  var cellTypes = clicked.className.split(/\s+/);
  for (var i = 0; i < cellTypes.length; i++) {
    var testClass = '.' + cellTypes[i];
    if(victory("" + testClass, player)){
      return true
    };
  }
}

//finds all winning combos depending on which cell is clicked, checks if those other cells have the same inner text (player)
function victory(selector, text) {
  var winningCombos = Array.from(document.querySelectorAll(selector));
  var victorious = winningCombos.every((elem) => {return elem.id===text})
  return victorious;
};


//Assigns user value to the clicked square and changes the current player to computer.
function set() {
  if (this.innerHTML !== '') {
    return; //can't click an occupied cell
  }
  this.innerHTML = `<div style="background-image: url(${avatar})">${player}</div>`;
  this.id = player;
  moves += 1;
  if (win(this)) {
    alert('Player ' + player + ' wins!!!');
    newGame();
  } else if (moves === 9) {
    alert(`It's a tie!`);
    newGame();
  } else {
    player = 'O';
    document.getElementById('current-player').innerText = 'Player ' + player + ' thinking...';
    setTimeout(computerSet,800);
  }
}

//Assigns computer value to a random square and then changes player back to user
function computerSet() {
  var availableCells = Array.from(document.querySelectorAll("td")).filter((elem) =>{return !elem.id});
  var computerSelection = Math.floor(Math.random() * (availableCells.length));
  availableCells[computerSelection].innerHTML=`<div style="background-image: url('https://lessonpix.com/drawings/96419/100x100/Robot.png')">${player}</div>`;
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