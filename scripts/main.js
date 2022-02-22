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

fillContainer(100, 75, gridContainer, 'oneCell', 'cell')
let columns = 100; // don't forget to change these globals when changing grid size
let rows = 75; 





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
}


function moveRight(){

    let currentCell = document.querySelector('.selected');
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(idString % columns != 0) {
    let nextCell = document.querySelector(`#cell${+idString+1}`)
    toggleSelected(nextCell)
    }
}

function moveLeft(){
    let currentCell = document.querySelector('.selected');
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(idString % columns != 1) {
    let nextCell = document.querySelector(`#cell${+idString-1}`)
    toggleSelected(nextCell)
    }
}

function moveUp(){
    let currentCell = document.querySelector('.selected');
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(idString-columns < 0){return};
    let nextCell = document.querySelector(`#cell${+idString-columns}`)
    toggleSelected(nextCell)
}

function moveDown(){
    let currentCell = document.querySelector('.selected');
    let currentId = currentCell.getAttribute('id');
    let idString = currentId.slice(4);
    if(+idString+(+columns)> (rows*columns)){return};
    let nextCell = document.querySelector(`#cell${+idString+columns}`);
    toggleSelected(nextCell);
}



function addMyClickListeners() {
    let left = document.querySelector('#arrow-left');
    let right = document.querySelector('#arrow-right');
    let up = document.querySelector('#arrow-up');
    let down= document.querySelector('#arrow-down');

    left.addEventListener('click',  e => {
        moveLeft()
        });
 
    right.addEventListener('click',  e => {
        moveRight()
        });
    
    up.addEventListener('click',  e => {
        moveUp()
        });    

    down.addEventListener('click',  e => {
        moveDown()
        });
    };

addMyClickListeners()


//to do: 
// arrow keys/wasd functionality
// diagonal movement?
// change grid size without crashing?