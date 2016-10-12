// keyboard controls
document.onkeydown = function(evt) {
  evt = evt || window.event;
  switch (evt.keyCode) {
    case 37: tree.viewX -= 10; break; // left
    case 38: tree.viewY -= 10; break; // up
    case 39: tree.viewX += 10; break; // right
    case 40: tree.viewY += 10; break; // down
    case 65: tree.zoomIn(); break;    // a
    case 89: tree.zoomOut(); break;   // y
  }
  display();
}

// click card, line or bg
function mouseDown (event) {
  if (tree.selectedCard != 0) { //quickfix
    cards[tree.selectedCard].bgColor = "white";
  }
  
  tree.selectedCard = 0;
  var offX = tree.getOffX();
  var offY = tree.getOffY();
  
  // clicked a card
  for (var i = 1; i < cards.length; i++) {
    if (cards[i].contains(event,offX,offY)) tree.selectedCard = i;
  }
  logit(tree.selectedCard,"card");
  
  // clicked background
  if (tree.selectedCard == 0) {
    tree.drag = true;
    tree.mark(event);
  }
  else {
    for (var i = 1; i < cards.length; i++) {
      cards[i].bgColor = "white";
    }
    cards[tree.selectedCard].mark(event);
    cards[tree.selectedCard].select();
    tree.dragCard = tree.selectedCard;
    display();
  }
}

function mouseUp () {
  tree.drag = 0;
  tree.dragCard = 0;
}

function mouseMove (event) {
  // tree.getMousePos(event);
  if (tree.drag) { tree.move(event); }
  else if (tree.dragCard != 0) {
    cards[tree.dragCard].move(event);
  }
}

function save () {
  var text = "";
  
  for (var i = 1; i < cards.length-1; i++) {
    text += "[" + i + "|";
    text += cards[i].x + "|";
    text += cards[i].y + "|";
    text += cards[i].width + "|";
    text += cards[i].height + "|";
    text += cards[i].margin + "|";
    text += cards[i].person.n + "|";
    text += cards[i].person.date + "|";
    text += cards[i].person.m + "|";
    text += cards[i].person.f + "|";
    text += cards[i].person.n + "|";
    text += "]";
  }
  
  logit(text,"TREE")
}

function openLoad () {
  document.getElementById("load").style.display = "block";
}

function load () {
  var text = document.getElementById("loadForm").value;
  document.getElementById("load").style.display = "none";
  logit(text);
}