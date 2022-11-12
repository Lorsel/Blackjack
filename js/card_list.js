var doc = document.getElementById("divvo");

for(var i=0;i<4;i++){
    for(var j=0;j<10;j++) {
        doc.innerHTML += "<img src='ico/" + i + "/" + j + ".png'>";
    }
}