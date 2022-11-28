// C = 0 | Q = 1 | F = 2 | P = 3
const mat = [["C",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["Q",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["F",[1,2,3,4,5,6,7,8,9,10,11,12,13]],["P",[1,2,3,4,5,6,7,8,9,10,11,12,13]]]; //52
let ico = [
    [],
    []
]

let dataBase = [
    {}, /* 0 */
    {}, /* 1 */
    {}, /* 2 */
    {}, /* 3 */
    {}, /* 4 */
    {}, /* 5 */
    {}, /* 6 */
    {}, /* 7 (curpi) */
    {name: "DEBUG", card: ["1/4","1/7",null,null], card_value: [5,8,null,null], card_sum: 13, insurance: 0, lost: false, standed: false, double: false, punt: false, bet: 0, fish: 772} /* 8 */
];
let start = true;
let isAlive = null;
let whoPlaying = 0;
let firstAce = true;
let fine = false;

const def_heigth = 667;
const def_width = 1366;
let isPlaying = false;
let nowplaying = false;

let num = 0;
let i = 0;
let curpi = 0;
let flag = true;
let flaggo = 0;

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
            doc.innerHTML += "<img id='" + i + "_" + j + "' src='ico/" + i + "/" + j + ".jpg'>"
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
    else if(page.value == "cards"){
        for(var j=1;j<=7;j++){
            retro.innerHTML += "<img class='cella_"+j+"' src='ico/0/0.jpg'>";
        }
        retro.innerHTML += "<img class='cella_mazz_1' src='ico/0/0.jpg'>";
        retro.innerHTML += "<img class='cella_mazz_2' id='back_card' src='ico/Card_Original/retro_carte.png'>";
        retro.innerHTML += "<img class='cella_mazz_3' id='back_card' src='ico/Card_Original/retro_carte.png'>";
        retro.innerHTML += "<img class='cella_mazz_4' id='back_card' src='ico/Card_Original/retro_carte.png'>";
    }
    else if(page.value == "fish"){
        fishValue(whoPlaying);
    }
    else if(page.value == "comp"){
        comp(true);
    }
    else if(page.value == "inc"){
        nextPlayer();
    }
    else if(page.value == "inv"){
        var invo = [];
        for(var l=0;l<num;l++){
            invo.push(dataBase[l].card_sum)
        }
        console.log(invo);
    }
    else if(page.value == "reset"){
        reset();
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
function card_gen(){
    var go = true
    console.log(ico[1].length);
    while(go) {
        var g = Math.floor(Math.random() * 4);
        var n = Math.floor(Math.random() * 12);
        var check = g + "/" + n;
        var found = false;
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < ico[i].length; j++) {
                if (ico[i][j] == check) {
                    found = true;
                    ico[i][j] = null;
                }
                console.log(ico[i][j]);
            }
        }
        if(found==true){
            console.log(found);
            go = false;
            return[g,n];
        }
    }
}

function gioca(){
    if(i==0){
        if(nowplaying == false){
        comp(true);
        var number=0;
        while(number<=0 || number>7){
            number = prompt("inserisci il numero di giocatori");
        }
        puls.style.display="none";
        num = number;
        }
        isAlive = num;
        nowplaying = true;
        setTimeout(gioca, 1000);
    }else if(i<=num){
        let card = card_gen();
        retro.innerHTML += "<img class=\"cella_"+i+"\" src='ico/"+card[0]+"/"+card[1]+".jpg'>";
        let cardID = card[0] + "/" + card[1];
        cardAssign(i-1, cardID, card[1]);
        setTimeout(gioca, 1000);
    }else if(i>num && flag){
        flag = false;
        curpi++;

        var card = card_gen();
        retro.innerHTML += "<img class=\"cella_mazz_"+curpi+"\" src='ico/"+card[0]+"/"+card[1]+".jpg'>";
        let cardID = card[0] + "/" + card[1];
        cardAssign(7, cardID, card[1]);

        retro.innerHTML += "<img class=\"cella_mazz_2\" id='back_card' src='ico/Card_original/retro_carte.png'>";

        nextPlayer();
        setTimeout(gioca, 1000);
    }
    i++;
}

function hit() {
    if (nowplaying == true) {
        var c = 0, table = whoPlaying + 1;
        while (dataBase[whoPlaying].card[c] != null) {
            c++;
            table += 7;
        }
        if (dataBase[whoPlaying].lost || dataBase[whoPlaying].standed) {
            alert("Non puoi richiedere altre carte perchè ti sei fermato o ti sei arreso");
        }
        else if (dataBase[whoPlaying].bet != 0) {
            if(dataBase[whoPlaying].double == false) {
                if (c < dataBase[whoPlaying].card.length) {
                    var l = card_gen();
                    retro.innerHTML += "<img class=\"cella_" + table + "\" src='ico/" + l[0] + "/" + l[1] + ".jpg'>";
                    let cardID = l[0] + "/" + l[1];
                    cardAssign(whoPlaying, cardID, l[1]);
                    hand();
                }
                else {
                    alert("ATTENZIONE " + dataBase[whoPlaying].name + " hai raggiunto il numero massimo di carte per giocatore");
                    stand();
                }
            }
        }
        else {
            alert("ATTENZIONE " + dataBase[whoPlaying].name + " non hai ancora puntato");
        }
        if(dataBase[whoPlaying].card_sum > 21){
            dataBase[whoPlaying].lost = true;
            alert("Il Giocatore: " + dataBase[whoPlaying].name + " ha perso superando il 21");
            isAlive --;
            nextPlayer();
        }
    }
}

function double_down(){
    if(nowplaying == true){
    /*raddoppia la puntata in cambio di una sola carta ricevuta al turno successivo*/
        dataBase[whoPlaying].bet *=2;
        hit();
        dataBase[whoPlaying].double = true;
        /*da finire per lorsel perchè non ho idea di come far richiedere al giocatore una sola carta in più*/
    }else{
        alert("ATTENZIONE " + dataBase[whoPlaying].name+ " il gioco non e\' ancora partito");
    }
}

/*il giocatore si ferma, bloccando il punteggio e le puntate, fino a fine game--FINITO*/
function stand() {
    if (nowplaying == true) {
        if (dataBase[whoPlaying].lost || dataBase[whoPlaying].standed) {
            alert("Non puoi fermarti perchè hai perso o ti sei già fermato");
        } else {
            dataBase[whoPlaying].standed = true;
            isAlive--;
            nextPlayer();
        }
    }
}

function insurance(){
    if(nowplaying == true){
        if(dataBase[whoPlaying].bet != 0) {
            dataBase[whoPlaying].insurance = dataBase[whoPlaying].bet / 2;
        }
        else{
            alert("ATTENZIONE " + dataBase[whoPlaying].name + " non hai ancora puntato");
        }
    /*salva metà della puntata di un giocatore in caso di giocata perdente*/
    }else{
        alert("ATTENZIONE " + dataBase[whoPlaying].name + " il gioco non e\' ancora partito");
    }
}

/*il giocatore si arrende, lasciando il gioco e scartando le sue carte----FINITO*/
function fold(){
    if(dataBase[whoPlaying].lost){
        alert("Nono puoi arrenderti perchè hai gia perso");
    }
    else if(nowplaying == true){
        dataBase[whoPlaying].lost = true;
        dataBase[whoPlaying].bet = 0;
        isAlive--;
        nextPlayer();
    }else{
        alert("ATTENZIONE " + dataBase[whoPlaying].name + " il gioco non e\' ancora partito");
    }
}

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
    debug.innerHTML += "<p style='color: fuchsia'> Player"+ (playerID+1) + ": " + dataBase[playerID].name + "</p>";
    hand();
    //defPuntLimit(playerID);//?
}

// {name, card, card_value, card_sum, insurance, splitted, lost, standed, double, punt, bet, fish}
function comp(flag){
    for(var i=0;i<8;i++){
        if(flag){
            dataBase[i].name = "Player" + (i+1);
            dataBase[i].fish = 500;
        }
        dataBase[i].card = [null,null,null,null];
        dataBase[i].card_value = [null,null,null,null];
        dataBase[i].card_sum = 0;
        dataBase[i].insurance = 0;
        dataBase[i].lost = false;
        dataBase[i].double = false;
        dataBase[i].punt = false;
        dataBase[i].standed = false;
        dataBase[i].bet = 0;
    }
    console.log(dataBase);
    if(flag) {
        for (var l = 0; l < 2; l++) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 13; j++) {
                    ico[l].push(i + "/" + j);
                }
            }
        }
        console.log(ico);
    }
}

function reset(){
    alert("Reset Tavolo");
    comp(false);
    firstAce = true;
    isAlive = num;
    whoPlaying = 0;
    i = 0;
    curpi = 0;
    flag = true;
    retro.innerHTML = "";
    gioca();
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
        let val = cardValue(parseInt(card_val));
        dataBase[playerID].card_value[i] = val;
        dataBase[playerID].card_sum += val;
    }
    else{
        alert("Limite Numero di Carte Raggiunto");
    }
    console.log(dataBase[whoPlaying].card_sum);
}

function cardValue(card){
    if(card>=0 && card<=9){
        if(card == 0 && firstAce == true){
            firstAce = false;
            card = 11;
            return card;
        }
        else{
            card += 1;
            return card;
        }
    }
    else if(card>9 && card<=13){
        card = 10;
        return card;
    }

}
/*funzione che 'passa il testimone' al giocatore successivo--FINITO*/
function nextPlayer(){
    if(start){
        start = false;
        fishValue(whoPlaying);
        return 0;
    }

    whoPlaying++;

    if(whoPlaying >= num){
        whoPlaying = 0;
    }
    if(isAlive <= 0){
        endGame();
    }
    while(dataBase[whoPlaying].lost || dataBase[whoPlaying].standed){
        whoPlaying++;
    }
    fishValue(whoPlaying);
}

/*funzione che richiede al giocatore quante fish vuoi puntare--FINITO*/
function bet(){
    if(nowplaying == true){
        if(dataBase[whoPlaying].punt != true){
            dataBase[whoPlaying].punt = true;
            var puntata = (dataBase[whoPlaying].fish + 50);
            while(puntata > dataBase[whoPlaying].fish || puntata == null) {
                puntata = prompt("Quando si desidera scommettere?");
                if(puntata > dataBase[whoPlaying].fish){
                    alert("Puntata più alta di quando si possiede" +
                    "     Puntata --> " + puntata +
                        "     Conto --> " + dataBase[whoPlaying].fish);
                }
            }
            dataBase[whoPlaying].bet += puntata;
            dataBase[whoPlaying].fish -= puntata;
            alert("Puntata effettuata" +
                "     Puntata --> " + puntata +
                "     Conto --> " + dataBase[whoPlaying].fish);
            fishValue(whoPlaying);
        }else{
            alert("hai già puntato trmn");
        }
        }else{
            alert("ATTENZIONE " + dataBase[whoPlaying].name + " il gioco non e\' ancora partito");
        }
}

function hand(){
    doc.innerHTML = "Hand: " + dataBase[whoPlaying].card_sum;
}

function curpi_card(){
    while(curpi<4) {
        curpi++;
        if(dataBase[7].card_sum > 21){
            dataBase[7].lost = true;
        }
        else if(dataBase[7].card_sum<=17) {
            let card = card_gen();
            retro.innerHTML += "<img class=\"cella_mazz_" + curpi + "\" src='ico/" + card[0] + "/" + card[1] + ".jpg'>";
            let cardID = card[0] + "/" + card[1];
            cardAssign(7, cardID, card[1]);
        }
    }
    console.log(dataBase[7].card_sum);
}

function endGame(/*playerID*/){
    /*qui mettiamo le carte al curpi e poi le confrontiamo con quelle dei giocatori*/
    /*controllo carte + aggiunta/perdita fish*/
    curpi_card();
    for(var i=0;i<num;i++){
        if(dataBase[i].lost == false){
            if(dataBase[7].lost){
                dataBase[i].fish += Math.floor(dataBase[i].bet*3/2);
            }
            else if(dataBase[i].card_sum == dataBase[7].card_sum){
                //caso carte uguali al curpi
                dataBase[i].fish += dataBase[i].bet;
            }else if(dataBase[i].card_sum > dataBase[7].card_sum){
                //caso carte maggiori
                dataBase[i].fish += Math.floor(dataBase[i].bet*3/2);
            }
            else if(dataBase[i].card_sum < dataBase[7].card_sum){
                flaggo++;
                if(dataBase[i].insurance > 0){
                    dataBase[i].fish += dataBase[i].insurance;
                }
            }
        }
        dataBase[i].bet = 0;
    }
    setTimeout(win, 1000);
    setTimeout(continua, 2200);
}

function win(){
    var winner = [];
    var zombie = 0;
    for(var i=0;i<num;i++){
        if(dataBase[i].lost == true){
            zombie++;
        }
    }
    if(dataBase[7].lost == false && flag>=num || zombie>=num){
        winner = "Mazzero";
    }
    else {
        for (var i = 0; i < num; i++) {
            if (dataBase[i].lost == false) {
                if(dataBase[i].card_sum >= dataBase[7].card_sum || dataBase[7].lost == true) {
                    winner.push(dataBase[i].name);
                }
            }
        }
    }
    flaggo = 0;
    alert("I vincitori della mano sono: " + winner);
}

/*fine del gioco, semplice refresh della pagina--FINITO*/
function ref(){
    var conferma = window.confirm("sei sicuro di voler smettere di giocare?");
    if(conferma){
        window.location.reload();
    }else{
        window.alert("attento a ciò che premi onissassaoid");
    }
}

/*continua il gioco ripulendo il tabellone*/
function continua(){
    console.log(isAlive);
    if(isAlive == 0){
        reset();
    }else{
        alert("ATTENZIONE player: non tutti i giocatori hanno finito!");
    }
}