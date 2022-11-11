// C = 0 | Q = 1 | F = 2 | P = 3
//TODO settare dimensioni immagini
const mat = [["C",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["Q",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["F",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["P",[1,2,3,4,5,6,7,8,9,10,11,12,13]]];
var ico = [[],[],[],[]];
var doc = document.getElementById("test");
for(var i=0;i<4;i++){
    for(var j=0;j<13;j++){
        ico[i][j] = "ico/" + i + "/" + (j+1) + ".jpg";
        doc.innerHTML += "<img id='" + i + "_" + j + "' src='ico/" + i + "/" + j + ".png'>"
    }
}

doc.innerHTML += "</br>"
doc.innerHTML += "<img id='f1' src='ico/fish/fish_1.png'> </br>";
doc.innerHTML += "<img id='f5' src='ico/fish/fish_5.png'> </br>";
doc.innerHTML += "<img id='f20' src='ico/fish/fish_20.png'> </br>";
doc.innerHTML += "<img id='f25' src='ico/fish/fish_25.png'> </br>";
doc.innerHTML += "<img id='f100' src='ico/fish/fish_100.png'> </br>";
doc.innerHTML += "<img id='f500' src='ico/fish/fish_500.png'> </br>";
doc.innerHTML += "<img id='logo' src='ico/icona.png'> </br>";

function chiudi(){
    alert("EH VOLEVI, GUARDA CHE FACCIA NON SE LO ASPETTAVA!!")
    window.top.close();
}

