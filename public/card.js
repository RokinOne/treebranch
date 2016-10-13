function card (id,person) {
  this.x = 10;
  this.y = 10;
  this.width = 150;
  this.height = 50;
  this.margin = 100;
  this.id = id;
  this.person = person;
  this.placed = 0; // are coordinates assigned
  this.bgColor = "white";
  this.drag = 0;
  this.markX = this.markY = 0;
 
  this.setCoords = function (x,y) {
    this.x = x;
    this.y = y;
    this.topX = x+(this.width/2*tree.zoom);
    this.topY = y;
    this.rightX = x+this.width*tree.zoom;
    this.rightY = y+(this.height/2*tree.zoom);
    this.bottomX = x+(this.width/2*tree.zoom);
    this.bottomY = y+this.height*tree.zoom;
    this.leftX = x;
    this.leftY = y+(this.height/2*tree.zoom);
  };
 
  this.draw = function (offX,offY) {
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(this.x+offX,this.y+offY,this.width*tree.zoom,this.height*tree.zoom);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(person.n,this.x+offX + this.width/2*tree.zoom,this.y+offY+30*tree.zoom);
    ctx.fillText(person.date,this.x+offX + this.width/2*tree.zoom,this.y+offY+45*tree.zoom);
  };
  
  this.mark = function (event) {
    var rect = can.getBoundingClientRect();
    
    this.rectX = rect.left;
    this.rectY = rect.top;
    
    this.markX = (event.clientX - this.rectX);
    this.markY = (event.clientY - this.rectY);
    
    this.offsetX = this.markX - this.x;
    this.offsetY = this.markY - this.y;
  };

  this.select = function () {
    this.bgColor = "green";
    //this.drawPoints();
  };
  
  this.move = function (event) {
    var mouseX = event.clientX - tree.rectX;
    var mouseY = event.clientY - tree.rectY;
  
    var x = mouseX - this.offsetX;
    var y = mouseY - this.offsetY;
  
    this.setCoords(x,y);
    //this.setCoords(x+tree.getOffX(),y+tree.getOffY());
    
    display();
  };
  
  this.drawPoints = function (offX,offY) {
    ctx.beginPath();
    ctx.arc(this.topX+offX,this.topY+offY,2,0,2*Math.PI);
    ctx.stroke();    
    ctx.beginPath();
    ctx.arc(this.rightX+offX,this.rightY+offY,2,0,2*Math.PI);
    ctx.stroke();    
    ctx.beginPath();
    ctx.arc(this.bottomX+offX,this.bottomY+offY,2,0,2*Math.PI);
    ctx.stroke();    
    ctx.beginPath();
    ctx.arc(this.leftX+offX,this.leftY+offY,2,0,2*Math.PI);
    ctx.stroke();
  };
  
  this.contains = function (e,offX,offY) {
    var tree = document.getElementById("tree");
    var rect = tree.getBoundingClientRect();
    var x = e.clientX - rect.left - offX;
    var y = e.clientY - rect.top - offY;

    return (x > this.leftX) && (x < this.rightX) && (y > this.topY) && (y < this.bottomY);
  };
}
