/* DOM Creation functions */
// / create elements
var statement = function (action, content, parent, property){
    var newItem = document.createElement(action);
    newItem.textContent = content;
    parent.appendChild(newItem);
};

// makes cells for table
var makeCell = function (j){
    var createRow = document.createElement("tr");
    tBody.appendChild(createRow);
    for (var i = 1; i <= 4; ++i){ //4x4 column x row
        statement("td", i + ", " + j, createRow);
	}
};

// creates buttons
var makeButton = function (direction){
    var newButton = document.createElement("button");
    var t = document.createTextNode(direction);
    newButton.id = direction;
    newButton.appendChild(t); //node tHead
    document.body.appendChild(newButton);
};


function moveRight () {
    var current = document.getElementById("current");
    current.style.borderWidth = "1px";
    current.removeAttribute("id");
    current = current.nextElementSibling;// boundaries issue
    current.style.borderWidth = "3px";
    current.id = "current";
}

function moveDown (current) {
    var current = document.getElementById("current");
    current.style.borderWidth = "1px";
    current.removeAttribute("id");
    current = current.parentNode;
    current = current.nextElementSibling;
    current = current.firstElementChild;// boundaries issue
    current.style.borderWidth = "3px";
    current.id = "current";
}

function moveLeft (current) {
    var current = document.getElementById("current");
    current.style.borderWidth = "1px";
    current.removeAttribute("id");
    current = current.previousElementSibling; // boundaries issue
    current.style.borderWidth = "3px";
    current.id = "current";
}

function moveUp (current) {
    var current = document.getElementById("current");
    current.style.borderWidth = "1px";
    current.removeAttribute("id");
    current = current.parentNode;
    current = current.previousElementSibling; // change to nextElementSibling? nope
    current = current.firstElementChild; // this will go farthest left of the element... how do i maek it go straight up?
    current.style.borderWidth = "3px";
    //current = document.getElementsByTagName("td")[0] tried to fix problem by directly trying to force it up a node.
    current.id = "current";
}

function highlight (current){ //just mark current as yellow.
    var current = document.getElementById("current");
    current.style["background-color"] = "yellow";
    
}

//construct table seq.
var newTable = document.createElement("table");
newTable.border = "1px"; //set border 1xp 

var tHead = document.createElement("thead");
newTable.appendChild(tHead);

for(var i = 1; i <= 4; i++)
{
    statement("th", "Header " + i, tHead);
}
var tBody = document.createElement("tbody");
newTable.appendChild(tBody);

for (var i = 1; i <= 4; i++)
{
    makeCell(i);
}

document.getElementById("Table").appendChild(newTable);

makeButton("Up"); 
makeButton("Down");
makeButton("Left"); 
makeButton("Right");
makeButton("Mark");

var current = document.getElementsByTagName("td")[0]; //start upper left corner
current.id = "current";
current.style.borderWidth = "3px";

document.getElementById("Up").addEventListener("click", moveUp);
document.getElementById("Down").addEventListener("click", moveDown);
document.getElementById("Left").addEventListener("click", moveLeft);
document.getElementById("Right").addEventListener("click", moveRight);
document.getElementById("Mark").addEventListener("click", highlight);