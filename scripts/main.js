const body = document.querySelector('body');
const webASketch = document.querySelector('#web-a-sketch');
const center = document.querySelector('#center')

function makeDiv(widthInPixels, heightInPixels, parentNode, divClass, divId) {
    let newDiv = document.createElement('div');
    newDiv.style.cssText = `width: ${widthInPixels}px; height: ${heightInPixels}px`;
    newDiv.setAttribute('class', divClass);
    newDiv.setAttribute('id', divId )
    parentNode.appendChild(newDiv);
   }

makeDiv(1000, 750, center, 'grid container');
const gridContainer = document.querySelector('.grid');
gridContainer.style.background = 'white';



function fillContainer (divsPerRow, divsPerColumn, whichContainer, divClass, divId) {
    let divsTotal = divsPerRow * divsPerColumn;
    let containerWidth = whichContainer.offsetWidth
    let divSize = containerWidth / divsPerRow;
   
       for (let i = 0; i < divsTotal; i++){
           makeDiv(divSize, divSize, whichContainer, `${divClass}`, `${divId}${i+1}`);
       }
   }

fillContainer(120, 90, gridContainer, 'oneCell', 'cell')
let columns = 120; // don't forget to change these globals when changing grid size
let rows = 90; 



function styleAllCells(cellColor, cellBorder) {
    const cells = document.querySelectorAll('.oneCell');
   
    for(let i = 0; i < cells.length; i++){
       cells[i].style.background = cellColor;
       cells[i].style.border = cellBorder;
    }

}

   styleAllCells('white', '1px solid lightgrey');



function deselectAll() {
    const cells = document.querySelectorAll('.oneCell');
    for(let i = 0; i < cells.length; i++){
    cells[i].classList.remove('selected')
    cells[i].style.transform = 'scale(1)' 
    }
}


function selectStartingCell() {
    const cells = document.querySelectorAll('.oneCell');
    for(let i = 0; i < cells.length; i++){
       cells[i].addEventListener("click", select, false);
       function select(){
       deselectAll();
       cells[i].classList.toggle('selected');
       cells[i].style.background = 'black';
       }
    }
}
selectStartingCell();



function toggleSelected (nextCell) {
    deselectAll();
    nextCell.classList.toggle('selected');
    nextCell.style.background = 'black';
    nextCell.style.transform = 'scale(1.15)'
}


function moveRight(){
    let currentCell = document.querySelector('.selected');
    currentCell.style.background = "black";
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(idString % columns == 0){return};
    let nextCell = document.querySelector(`#cell${+idString+1}`)
    setTimeout (toggleSelected, 60, nextCell);
}

function moveLeft(){
    let currentCell = document.querySelector('.selected');
    currentCell.style.background = "black";
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(idString % columns == 1) {return}
    let nextCell = document.querySelector(`#cell${+idString-1}`)
    setTimeout (toggleSelected, 60, nextCell);
}

function moveUp(){
    let currentCell = document.querySelector('.selected');
    currentCell.style.background = "black";
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(idString-columns < 0){return};
    let nextCell = document.querySelector(`#cell${+idString-columns}`)
    setTimeout (toggleSelected, 60, nextCell);
}

function moveDown(){
    let currentCell = document.querySelector('.selected');
    currentCell.style.background = "black";
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(+idString+(+columns)> (rows*columns)){return};
    let nextCell = document.querySelector(`#cell${+idString+columns}`);
    setTimeout (toggleSelected, 60, nextCell);
}

function northEast(){
    let currentCell = document.querySelector('.selected');
    currentCell.style.background = "black";
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(idString-columns < 0 || idString % columns == 0) {return};
    let nextCell = document.querySelector(`#cell${+idString-(columns-1)}`);
    setTimeout (toggleSelected, 60, nextCell);
}

function southEast(){
    let currentCell = document.querySelector('.selected');
    currentCell.style.background = "black";
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(+idString+(+columns)> (rows*columns) || idString % columns == 0) {return};
    let nextCell = document.querySelector(`#cell${+idString+(columns+1)}`);
    setTimeout (toggleSelected, 60, nextCell);
}

function southWest(){
    let currentCell = document.querySelector('.selected');
    currentCell.style.background = "black";
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(+idString+(+columns)> (rows*columns) || idString % columns == 1) {return};
    let nextCell = document.querySelector(`#cell${+idString+(columns-1)}`);
    setTimeout (toggleSelected, 60, nextCell);
}

function northWest(){
    let currentCell = document.querySelector('.selected');
    currentCell.style.background = "black";
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(idString-columns < 0 || idString % columns == 1) {return};
    let nextCell = document.querySelector(`#cell${+idString-(columns+1)}`);
    setTimeout (toggleSelected, 60, nextCell);
}

function addMyClickListeners() {
    let left = document.querySelector('#arrow-left');
    let right = document.querySelector('#arrow-right');
    let up = document.querySelector('#arrow-up');
    let down= document.querySelector('#arrow-down');

    left.addEventListener('click',  e => {
        moveLeft();
        });
 
    right.addEventListener('click',  e => {
        moveRight();
        });
    
    up.addEventListener('click',  e => {
        moveUp();
        });    

    down.addEventListener('click',  e => {
        moveDown();
        });
    };

addMyClickListeners();

function addKeyboardListerersDiagonal (){
const keysPressed = {};
window.addEventListener('keydown', e => {
keysPressed[e.key] = true;


if (keysPressed['ArrowUp'] && e.code == 'ArrowRight' || keysPressed['ArrowRight'] && e.code == 'ArrowUp'){
    northEast();
    
}if (keysPressed['ArrowUp'] && e.code == 'ArrowLeft' || keysPressed['ArrowLeft'] && e.code == 'ArrowUp'){
    northWest();
    
}if (keysPressed['ArrowDown'] && e.code == 'ArrowRight' || keysPressed['ArrowRight'] && e.code == 'ArrowDown'){
    southEast();
    
}if (keysPressed['ArrowDown'] && e.code == 'ArrowLeft' || keysPressed['ArrowLeft'] && e.code == 'ArrowDown'){
    southWest();
    
}

});
window.addEventListener('keyup', e => {
delete keysPressed[e.key];
});
}
addKeyboardListerersDiagonal();


function addKeyboardListeners(){
const keysPressed = {};
window.addEventListener('keydown', e => {
keysPressed[e.key] = true;
let numberPressed = Object.keys(keysPressed).length
console.log(numberPressed)

    if(numberPressed == 1 && e.code === "ArrowUp" || e.code === "KeyW"){
    moveUp();
    }if(numberPressed == 1 && e.code === "ArrowDown" || e.code === "KeyS"){
    moveDown();
    }if(numberPressed == 1 && e.code === "ArrowRight" || e.code === "KeyD"){
    moveRight();
    }if(numberPressed == 1 && e.code === "ArrowLeft" || e.code === "KeyA"){
    moveLeft();
    }else {return};
});
window.addEventListener('keyup', e => {
delete keysPressed[e.key];
});
}
addKeyboardListeners();




function addResetButton () {
    resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', e => {
    styleAllCells('white');
    });
   }
   
addResetButton()



//to do: 
// can I prevent coloring unwanted squre before multiple key presses kick in with a slight delay?
// adjust diagonal functions to split divs and create a straight line