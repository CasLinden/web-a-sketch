const body = document.querySelector('body');

function makeDiv(widthInPixels, heightInPixels, parentNode, divClass, divId) {
    let newDiv = document.createElement('div');
    newDiv.style.cssText = `width: ${widthInPixels}px; height: ${heightInPixels}px`;
    newDiv.setAttribute('class', divClass);
    newDiv.setAttribute('id', divId )
    parentNode.appendChild(newDiv);
   }

makeDiv(1000, 750, body, 'grid container');
const gridContainer = document.querySelector('.grid');



function fillContainer (divsPerRow, divsPerColumn, whichContainer, divClass, divId) {
    let divsTotal = divsPerRow * divsPerColumn;
    let containerWidth = whichContainer.offsetWidth
    let divSize = containerWidth / divsPerRow;
   
       for (let i = 0; i < divsTotal; i++){
           makeDiv(divSize, divSize, whichContainer, `${divClass}`, `${divId}${i+1}`);
       }
   }

fillContainer(100, 75, gridContainer, 'oneCell', 'cell') //the grid is now 10 by 10
let columns = 100; // don't forget to change this somehow if the grid changes
let rows = 75; 




function styleAllCells(cellColor, cellBorder) {
    const cells = document.querySelectorAll('.oneCell');
   
    for(let i = 0; i < cells.length; i++){
       cells[i].style.background = cellColor;
       cells[i].style.border = cellBorder;
       }
   }
styleAllCells('white', '1px solid lightgrey');




function addButtons(){
    makeDiv(500, 100, body, 'controlsContainer container')
    let controlsContainer = document.querySelector('.controlsContainer');
    fillContainer(4, 1, controlsContainer, 'controls', 'controls')
  
   let left = document.querySelector('#controls1');
   let right = document.querySelector('#controls2');
   let up = document.querySelector('#controls3');
   let down= document.querySelector('#controls4');
   left.textContent = '<';
   right.textContent = '>';
   up.textContent = '^';
   down.textContent = '↓';
}
addButtons()



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
    let left = document.querySelector('#controls1');
    let right = document.querySelector('#controls2');
    let up = document.querySelector('#controls3');
    let down= document.querySelector('#controls4');

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