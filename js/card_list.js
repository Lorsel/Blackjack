var doc = document.getElementById("divvo");

for(var i=0;i<10;i++){
    for(var j=0;j<4;j++) {
        doc.innerHTML += "<img src='../ico/" + j + "/" + i + ".png'>";
    }
    doc.innerHTML += "<h3>Questa carta vale " + (i+1) + "</h3>";
    doc.innerHTML += "<br/>";
}