var tsv = "1\tR\t3\t4\n2\tK\t3\t4\n3\tA\t6\t7\n4\tS\t30\t29\n5\tT\t\t\n6\tĐ\t32\t33\n7\tJ\t36\t35\n";

function toggleDB () {
  var DB = document.getElementById("db");
  if (showDB == 1 ) {
    DB.children[1].style.display = "none";
    showDB = 0;
  }
  else {
    DB.children[1].style.display = "block";
    showDB = 1;
  }
}

function person (id,n,date,m,f) {
  this.id = id;
  this.n = n;
  this.date = date;
  this.m = m;
  this.f = f;
  this.kids = [];
  
  this.getNoKids = function () { return this.kids.length; }
}

function loadPersons () {
  var line;
  var all = tsv.split('\n');
  for (var i=0; i<all.length-1; i++) {
    line = all[i].split('\t');
    persons[i+1] = new person (line[0], line[1], 1999, parseInt(line[2])||0, parseInt(line[3])||0);
  }
  
  // find children
  var mom,pop;
  for (i = 1; i < persons.length; i++) {
    mom = persons[i].m;
    if ((mom != null) && (mom != 0) && (mom < persons.length)) { persons[mom].kids.push(i); }
    pop = persons[i].f;
    if ((pop != null) && (pop != 0) && (pop < persons.length)) { persons[pop].kids.push(i); }
  }

  // fill db window
  var dbMin = document.getElementById("dbMin");
  var row; var cell; var mad; var fad;
  for (i = 1; i < persons.length; i++) {
    row = dbMin.insertRow(-1);
    cell = row.insertCell(0); cell.innerHTML = persons[i].id;
    cell = row.insertCell(1); cell.innerHTML = persons[i].n;
  }
}
