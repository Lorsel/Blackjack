// C = 0 | Q = 1 | F = 2 | P = 3
//TODO settare dimensioni immagini
const mat = [["C",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["Q",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["F",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["P",[1,2,3,4,5,6,7,8,9,10,11,12,13]]];
var ico = [[],[],[],[]];

let dataBase = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {name: "DEBUG", card: ["1/4","1/7",null,null], card_value: [5,8,null,null], card_sum: 13, insurance: 0, splitted: false, lost: false, fish: 772}
];
let playerN = null;
let isAlive = null;
let whoPlaying = 8;
let firstAce = true;

const def_heigth = 667;
const def_width = 1366;
let isPlaying = false;

let num = 0;
let i = 0;
let curpi = 0;

var doc = document.getElementById("test");
var debug = document.getElementById("debug");
var button = document.getElementById("gameon");
var audio = document.getElementById("audio");
var fish_value = document.getElementsByClassName("fish_value");
var but = document.getElementById("but");

var rand = document.getElementById("rand");
var puls = document.getElementById("partita");
var retro = document.getElementById("retro");

/* UTILITY */
function debPrint() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 13; j++) {
            //ico[i][j] = "ico/" + i + "/" + (j + 1) + ".jpg";
            doc.innerHTML += "<img id='" + i + "_" + j + "' src='ico/" + i + "/original/" + j + ".png'>"
        }
    }

    doc.innerHTML += "</br>"
    doc.innerHTML += "<img id='f1' src='ico/fish/original/Null%20Background/fish_1.png'> </br>";
    doc.innerHTML += "<img id='f5' src='ico/fish/original/Null%20Background/fish_5.png'> </br>";
    doc.innerHTML += "<img id='f20' src='ico/fish/original/Null%20Background/fish_20.png'> </br>";
    doc.innerHTML += "<img id='f25' src='ico/fish/original/Null%20Background/fish_25.png'> </br>";
    doc.innerHTML += "<img id='f100' src='ico/fish/original/Null%20Background/fish_100.png'> </br>";
    doc.innerHTML += "<img id='f500' src='ico/fish/original/Null%20Background/fish_500.png'> </br>";
    doc.innerHTML += "<img id='logo' src='ico/icona.png'> </br>";
}


function menu(page){
    if(page.value == "null" || page.value == "null2" || page.value == "null3" || page.value == "null4"){
        page.value = "null";
    }
    else if(page.value == "musica"){
        musica();
    }
    else if(page.value == "volume"){
        doc.innerHTML = "<input type='range' class='volume' min='0' max='100' step='1' value='" + (audio.volume*100) + "' onchange='volume(this.value)' onfocusout='volume(-1)'>";
        doc.innerHTML += "<div class='volume' style='left: 140px'>" + (audio.volume*100) + "</div>";
    }
    else if(page.value == "name"){
        changeName(whoPlaying);
    }
    else if(page.value == "close"){
        alert("EH VOLEVI, GUARDA CHE FACCIA NON SE LO ASPETTAVA!!")
        window.top.close();
    }
    else if(page.value == "print"){
        debPrint();
    }
    else if(page.value == "bug"){
        debug.innerHTML = "<p style='color: cyan'>Debug: </p>";
        debug.innerHTML += "<p style='color: white;'>Page Height: " + window.innerHeight + " px</p>";
        debug.innerHTML += "<p style='color: white;'>Page Width: " + window.innerWidth +" px</p>";
        //debug.innerHTML += "<p style='color: white;'>Button Top: " + button.style.top + "px</p>"
        //debug.innerHTML += "<p style='color: white;'>Button Left: " + button.style.left + "px</p>"
        console.log(dataBase);
    }
    else if(page.value == "fish"){
        fishValue(whoPlaying);
    }
    else if(page.value == "comp"){
        comp(true);
    }
    else {
        window.location = "./index/" + page.value + ".html";
    }
    page.value = "null";
}

function musica(){
    if(isPlaying == false) {
        audio.play();
        audio.loop = true;
        audio.volume = (50/100);
        isPlaying = true;
    }else if(isPlaying == true) {
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
    }
}

function volume(vol){
    if(vol == -1){
        doc.innerHTML = null;
    }
    else {
        let divvo = document.getElementsByClassName("volume")[1];
        audio.volume = (vol/100);
        divvo.innerHTML = ""+vol;
    }
}

function changeName(playerID){
    if(whoPlaying == null){
        alert("ATTENZIONE prima bisogna avviare una partita per cambiare il proprio nome");
    }
    else{
        do{
            dataBase[playerID].name = prompt("Inserisci il tuo nuovo nome");
        }while(dataBase[playerID].name == "");
    }
}

/* GAME */
function gioca(){
    if(i==0){
        comp(true);
        var number=0;
        while(number<=0 || number>7){
            number = prompt("inserisci il numero di giocatori");
        }
        puls.style.display="none";
        num = number;
        setTimeout(gioca, 1000);
    }
    else if(i<=num){
        var g=0, n=0;
        g = Math.floor(Math.random() * 4);
        n = Math.floor(Math.random() * 12);
        retro.innerHTML += "<img class=\"cella_"+i+"\" src='ico/"+g+"/"+n+".jpg'>";
        let cardID = "" + g + "/" + n;
        cardAssign(i-1, cardID, n);
        setTimeout(gioca, 1000);
    }
    else if(i>num){
        if(num<8){
            i = 8;
        }
        curpi++;
        var g=0, n=0;
        g = Math.floor(Math.random() * 4);
        n = Math.floor(Math.random() * 12);
        retro.innerHTML += "<img class=\"cella_mazz_"+curpi+"\" src='ico/"+g+"/"+n+".jpg'>";
        let cardID = "" + g + "/" + n;
        cardAssign(i-1, cardID, n);
        setTimeout(gioca, 1000);
    }
    i++;
}


function double_down(){
    /*raddoppia la puntata in cambio di una sola carta ricevuta al turno successivo*/
}

function insurance(){
    /*salva metà della puntata di un giocatore in caso di giocata perdente*/
}

function split(){
    /*divide le carte del giocatore con tre possibilità
        -separa due carte e ne aggiunge una uguale alla seconda delle 2;
        -conta le due carte iniziali del giocatore come una carta sola;
        -aggiunge una carta a ciascuna altra carta separata;
    */
}

//per creare degli stalli di tempo per tra un turno e l'altro
/*function demo () {
    // (A) DO SOMETHING
    rand.innerHTML += "<p> ciao </p>";

    // (B) RUN THIS AFTER 1 SECOND
    setTimeout(demoA, 10000);

    // (C) NOTE - SETTIMEOUT() IS ASYNC
    // THIS WILL CONTINUE TO RUN!
    console.log("Third");
  }

  function demoA () { rand.innerHTML += "<p> mondo </p>"; }*/

  function fishValue(playerID){
    let value = dataBase[playerID].fish;
    let fi = [500,100,25,20,5,1];
    let t = 0;
    for(var i=0;i<6;i=i+1){
        while(value>=fi[i]){
            value=value-fi[i];
            t++;
        }
        fish_value[i].innerHTML = "" + t; t=0;
    }
    debug.innerHTML = "<p style='color: cyan'>Turno di:</p>";
    debug.innerHTML += "<p style='color: fuchsia'>Player"+ (playerID+1) + ": " + dataBase[playerID].name + "</p>";
}

// {name, card, card_value, card_sum, insurance, splitted, fish}
function comp(flag){
    for(var i=0;i<7;i++){
        if(flag){
            dataBase[i].name = (i+1);
        }
        dataBase[i].card = [null,null,null,null];
        dataBase[i].card_value = [null,null,null,null];
        dataBase[i].card_sum = 0;
        dataBase[i].insurance = 0;
        dataBase[i].splitted = false;
        dataBase[i].lost = false;
        dataBase[i].fish = 500;
    }
}

function reset(){
    alert("Reset Tavolo");
    comp(false);
    firstAce = true;
    isAlive = playerN;
    whoPlaying = 0;
    but.innerHTML = "";
}

function cardAssign(playerID, card_id, card_val){
    var i=0;
    var flag = true;
    while(dataBase[playerID].card[i] != null){
        i++;
        if(i>=4){
            flag = false;
            return;
        }
    }
    if(flag){
        dataBase[playerID].card[i] = card_id;
        dataBase[playerID].card_value[i] = cardValue(parseInt(card_val));
        dataBase[playerID].card_sum = dataBase[playerID].card_sum + cardValue(parseInt(card_val));
    }
    else{
        alert("Limite Numero di Carte Raggiunto");
        dataBase[playerID].lost = true;
        isAlive--;
    }

}

function cardValue(card){
    if(card>0 && card<=9){
        if(card == 0 && firstAce == true){
            firstAce = false;
            console.log(card+" Dio Negro 1");
            return 11*1;
        }
        else{
            console.log(card+" Dio Negro 2");
            return (card+1)*1;
        }
    }
    else if(card>9 && card<=13){
        console.log(card+" Dio Negro 3");
        return 10*1;
    }

}

function nextPlayer(){
    if(whoPlaying>=6){
        whoPlaying = 0;
    }
    else{
        whoPlaying++;
    }
    if(dataBase[whoPlaying].lost){
        whoPlaying++;
    }
    if(isAlive <= 0){
        endGame();
    }
    fishValue(whoPlaying);
}

function endGame(playerID){
    but.style.color = "fuchsia";
    but.innerHTML = "<p style='color: cyan'>WINNER:</p>";
    but.innerHTML += "<p>Player" + playerID + "</p>";
    but.innerHTML += "<p>" + dataBase[playerID].name + "</p>";
    reset();
}