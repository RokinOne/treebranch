// TODO ALGORITAM
function findPlace (card) {
  if (card.placed === 0) {
    card.setCoords(tempX + tree.getOffX(),tempY + tree.getOffY());
    card.placed = 1;
    
    if (card.person.kids.length > 0) { // goto children, no check
      tempX -= (card.margin * tree.zoom * card.person.kids.length );
      for (var i = 0; i < card.person.kids.length; i++) {
        tempY += card.margin * tree.zoom;
        tempX += card.margin * tree.zoom;
        findPlace(cards[card.person.kids[i]]);
        
        tempY -= card.margin * tree.zoom;
      }
    }
    
    if ((card.person.m != 0) && (cards[card.person.m] != null)) { // goto mother
      tempY -= card.margin * tree.zoom;
      tempX += (-(card.margin*2) + (cards[card.person.m].person.getNoKids() * card.margin * tree.zoom));
      findPlace(cards[card.person.m]);
      
      tempY += card.margin * tree.zoom;
      tempX -= (-(card.margin*2) + (cards[card.person.m].person.getNoKids() * card.margin * tree.zoom));
    }
 
    if ((card.person.f != 0) && (cards[card.person.f] != null)) { // goto father
      tempY -= card.margin * tree.zoom;
      tempX += ((cards[card.person.f].person.getNoKids() * card.margin * tree.zoom));
      findPlace(cards[card.person.f]);
      
      tempY += card.margin * tree.zoom;
      tempX -= ((cards[card.person.f].person.getNoKids() * card.margin * tree.zoom));
    }
  }
}

var showDB = 1;
var tempX, tempY;
tempX = 400 - 75;
tempY = 300 - 25;

// get persons
var persons = [];
loadPersons();

// init canvas, controls
var can = document.getElementById("tree");
var ctx = can.getContext("2d");

var tree = new canvas ();
var rect = can.getBoundingClientRect();    
tree.rectX = rect.left;
tree.rectY = rect.top;

can.onmouseup = mouseUp;
can.onmousedown = mouseDown;
can.onmousemove = mouseMove;

// assign cards
var cards = [];
for (var i = 1; i <= persons.length; i++) { cards[i] = new card (i,persons[i]); } // one-indexed

// determine card positions (update view) - ALGORITAM
findPlace(cards[6]);
    
// if not placed, stack in corner
for (var i = 1; i <= cards.length-2/*FIXME*/; i++) {
  if (cards[i].placed == 0) {
    cards[i].setCoords(10 + tree.getOffX(),10 + tree.getOffY());
    cards[i].placed = 1;
  }
}

display();