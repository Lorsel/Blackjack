var doc = document.getElementById("divvo");

for(var i=0;i<13;i++){
    for(var j=0;j<4;j++) {
        doc.innerHTML += "<img src='../ico/" + j + "/original/" + i + ".png'>";
    }
    if(i<9 && i>0) {
        doc.innerHTML += "<h3>Questa carta vale " + (i + 1) + "</h3>";
        doc.innerHTML += "<br/>";
    }
    if(i>=9){
        doc.innerHTML += "<br/>";
    }
    if(i==0){
        doc.innerHTML += "<h3 style='margin-bottom: 0px'>Questa carta vale 1 </h3><br/><h3 style='margin-top: 0px'>A meno che sono sia il primo uscito, in questo caso vale 11</h3>";
    }
    if(i==12){
        doc.innerHTML += "<h3>Queste carte valgono 10</h3>";
        doc.innerHTML += "<br/>";
    }
}
