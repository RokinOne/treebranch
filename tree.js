function canvas () {
  this.width = 800;
  this.height = 600;
 
  // view
  this.zoom = 1;
  this.markX = 0;
  this.markY = 0
  this.centerX = 400;
  this.centerY = 300;
  this.rectX = 0;
  this.rectY = 0;
  this.markViewX = this.markViewY = 0;
  this.viewX = 400;
  this.viewY = 300;
  
  // interact
  this.drag = false;
  this.dragCard = 0;
  this.selectedCard = 0;
 
  this.getOffX = function () { return (this.centerX)-(this.viewX); }
  this.getOffY = function () { return (this.centerY)-(this.viewY); }
  this.zoomIn = function () { this.zoom += 0.1; }
  this.zoomOut = function () { this.zoom -= 0.1; }
 
  this.clear = function () { ctx.clearRect(0, 0, this.width, this.height); }
  
  // main drawing function
  this.draw = function () {
    var offX = this.getOffX();
    var offY = this.getOffY();
    
    // draw cards
    for (var i = 1; i < cards.length-1; i++) {
      cards[i].draw(offX,offY);
      if (i == this.selectedCard) {
        cards[i].drawPoints(offX,offY);
      }
    }
    
    // draw lines - connects CHILD with 2 PARENTS
    for (var i = 1; i < cards.length-1; i++) {
      if ((cards[i].person.m != 0) && (cards[cards[i].person.m] != null)) {
        connectH(cards[cards[i].person.m],cards[i]); }
        
      if ((cards[i].person.f != 0) && (cards[cards[i].person.f] != null)) {
        connectH(cards[cards[i].person.f],cards[i]); }
    }
  }
  
  // TODO return
  this.getMousePos = function (event) {
    var x = y = 0;
    var rect = can.getBoundingClientRect();
    
    this.rectX = rect.left;
    this.rectY = rect.top;
    
    x = (event.clientX - this.rectX);
    y = (event.clientY - this.rectY);
  }
 
 // TODO align cards to grid
  this.align = function (cards) {
    var x = 25, y = 25;
    
    for (var i = 1; i < cards.length; i++) {
      cards[i].setCoords(x + this.getOffX(), y + this.getOffY());
      x += 200;
      if (x > 600) {
        y += 100;
        x = 25;
      }
    }
  }
  
  this.mark = function (event) {
    this.markX = (event.clientX - this.rectX);
    this.markY = (event.clientY - this.rectY);
    
    this.markViewX = this.viewX;
    this.markViewY = this.viewY;
  }
  
  this.move = function (event) {
    var mouseX = event.clientX - this.rectX;
    var mouseY = event.clientY - this.rectY;
  
    mouseX = this.markX - mouseX;
    mouseY = this.markY - mouseY;
  
    this.viewX = this.markViewX + mouseX;
    this.viewY = this.markViewY + mouseY;
    
    display();
  }
}

function connect (oneX,oneY, twoX, twoY) {
  ctx.beginPath();
  ctx.moveTo(oneX+tree.getOffX(),oneY+tree.getOffY());
  ctx.lineTo(twoX+tree.getOffX(),twoY+tree.getOffY());
  ctx.stroke();
}

// connect parent and child
function connectH (parent, child) {
  connect(child.topX,child.topY,parent.bottomX,parent.bottomY);
}

// refresh canvas
function display () {
  tree.clear();
  // reset?
  tempX = 400 - 75; tempY = 300 - 25;
  
  for (var i = 1; i < cards.length; i++) { cards[i].placed = 0; }
 
  //findPlace(cards[6]);
  //tree.align(cards);
  tree.draw();
}