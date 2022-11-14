var doc = document.getElementById("divvo");

for(var i=0;i<13;i++){
    for(var j=0;j<4;j++) {
        doc.innerHTML += "<img src='../ico/" + j + "/" + i + ".png'>";
    }
    if(i<9) {
        doc.innerHTML += "<h3>Questa carta vale " + (i + 1) + "</h3>";
        doc.innerHTML += "<br/>";
    }
    if(i>=9){
        doc.innerHTML += "<br/>";
    }
    if(i==12){
        doc.innerHTML += "<h3>Queste carte valgono 10</h3>";
        doc.innerHTML += "<br/>";
    }
}