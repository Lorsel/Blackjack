// C = 0 | Q = 1 | F = 2 | P = 3
const mat = [["C",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["Q",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["F",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["P",[1,2,3,4,5,6,7,8,9,10,11,12,13]]];
var ico = [[],[],[],[]];

for(var i=0;i<4;i++){
    for(var j=0;j<13;j++){
        ico[i][j] = "ico/" + i + "/" + j+1 + ".jpg";
    }
}

var doc = document.getElementById("test");
doc.innerHTML += "<img src='ico/fish_1.png'> </br>";
doc.innerHTML += "<img src='ico/fish_5.png'> </br>";
doc.innerHTML += "<img src='ico/fish_20.png'> </br>";
doc.innerHTML += "<img src='ico/fish_25.png'> </br>";
doc.innerHTML += "<img src='ico/fish_100.png'> </br>";
doc.innerHTML += "<img src='ico/fish_500.png'> </br>";
doc.innerHTML += "<img src='ico/icona.png'> </br>";