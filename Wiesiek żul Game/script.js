//Canvas ------------------------------------------------------------------------------------------ <- CANVAS.
var width = window.innerWidth,                                    // Określam szerokość canvy pobierając obecną szerokość okna w przeglądarce.
height = window.innerHeight,                                      // -||-
ratio = window.devicePixelRatio;                                  // przypisuje własciwą ilość fizycznych pixeli do rozdzielczości w któej wyświetla się przeglądarka.
var canvas = document.getElementById("canvas"),                   // do zmiennej przypisuje canve z pliku HTML. 
c = canvas.getContext("2d");                                      // Deklaruje że będe rysował na canvie w 2D

canvas.width = width * ratio;                                     //Szerokosc Canwy = Width * ratio.
canvas.height = height * ratio;                                   //Wysokość -||-
canvas.style.width = width + "px";                                 
canvas.style.height = height + "px";
c.scale(ratio, ratio);
/////////////ZMIENNE & OBIEKTY/////////////// +++++++++++++++++++++++++++++++++++++++++++++++++++++ <= ZMIENNE & OBIEKTY.
//Mapa
let wysokoscMapy = 15;                                             // Wysokość mapy która bedą reprezentować tablice 
let szerokoscMapy = 100;                                           // Szerokosc -||-
let wielkoscBloczkow = 40;                                         // Wielkość Bloków
let x;//zmienna iteracyjna.
let y;//zmienna iteracyjna.
//Poruszanie się
let step = 0;                                                       //step ( co ile pixeli w obrazu przeskoczyć ) Wieśka Żula
let stepiwo = 0;                                                    //step piwo
let stepOgien = 0;                                                  //step ogien
const SPACE_KEY = 32;                                               // key-code spacji
const UP_KEY = 38;                                                  // key-code strzałki do góry
const LEFT_KEY = 37;                                                // key-code strzałki w lewo
const RIGHT_KEY = 39;                                               // key-code strzałki w prawo
var SpacePressed = false;                                           // Czy Spacja wciśnieta, typ Booleam
var UpPressed = false;                                              // Czy Strzałka w góre wciśnieta, typ Booleam
var leftKeyPress = false;                                           // Czy Strzałka w lewo wciśnieta, typ Booleam
var rightKeyPress = false;                                          // Czy Strzałka w prawo wciśnieta, typ Booleam
//fizyka
let grawitacjaMoc = 3.5;                                            // Siła opadania (ile pixeli na klatke)
let skokstart = 0;                                                  // Miejsce w którym skoczyłem, (potrzebne by określić czy Wiesiek nie przekroczył limitu opadania, co równa się dla niego śmiercią jeśli gdzieś wyląduje)
let skokLimit = 70;                                                 // Maksymalna wysokosc jednorazowego skoku
let jump = false;                                                   // Czy w tej chwili leci.
let pozycjaY;                                                       // pozycjaY, miejsce po wylądowaniu.
//Zasady
let GameOver =  false;                                              // Czy zginąłęś ?
let GameWin = false;                                                // Czy wygrałeś ?
//Muzyka
let PuscMuzyke = false;                                              // Jesli muzyka została juz uruchomiona zmień na true, by nie uruchamiała się z każdą kolejną klatką.
let Hop = 0;                                                         // Odgłos Hop, co trzeci raz mówi Hopsa, zmienna Hop słuzy jej iteracji.

//////////// Obiekty ////////////
//Przestrzeń                                                         //Obiekty przechowują informacje o pozycji, colorze, coliderze itd.
let przestrzen = {
    id: "mur",
    pozX: 0,
    pozY: 0,
    colider: 0,
    color: "#626464",
    obraz: 0,
}
//Platforma
let platforma = {
    id: "platforma",
    pozX: 0,
    pozY: 0,
    colider: 1,
    color: "green",
    obraz: 0,
}
//Win
let win = {
    id: "win",
    pozX: 100,
    pozY: 100,
    colider: 7,
    color: "green",
    obraz: 0,
}
//Postac
let postac = {
    skok: 3,
    predkosc: 1.5,
    id: "postac",
    pozX: 160,
    pozY: 30,
    colider: 2, 
    color: "red",
    obraz: 0,
}
//Drabina
let drabina = {
    id: "ogien",
    pozX: 0,
    pozY: 0,
    colider: 3, 
    color: "yellow",
}
//Ogien
let ogien = {
    id: "ogien",
    pozX: 0,
    pozY: 0,
    colider: 10, 
    color: "yellow",
    obraz: 0,
}
//Nóż
let noz = {
    id: "nóż",
    pozX: 0,
    pozY: 0,
    colider: 5, 
    color: "yellow",
    obraz: 0,
}
//////////////SPRITES/////////////// -------------------------------------------------------------- <- DUSZKI.
//Platforma                                                                   // Duszki, przypsuje zmiennym odpowiednie obrazki z pliku Sprites.
var podloga = new Image();
podloga.src = "sprites/podloga.png";
//Drabina
var drabinaa = new Image();
drabinaa.src = "sprites/Drabina.png";
//Postac
var vandi = new Image();
vandi.src = "sprites/Vandi.png";
//Zul Wiesiek;
var Wiesiek = new Image();
var idePrawo = new Image();
idePrawo.src = "sprites/ZulPrawo.png";
var ideLewo = new Image();
ideLewo.src = "sprites/ZulLewo.png";
var stoje = new Image();
stoje.src = "sprites/stoje-Sheet.png";
var plecami = new Image();
plecami.src = "sprites/zul-wiesiek-plecy.png";
//Upadek Żula

var zup = new Image();
zup.src = "sprites/zul-Upadek-Sheet.png";
//Piwo
var piwo = new Image();
piwo.src = "sprites/Piwo-Sheet.png";

//Wall 
var sciana = new Image();
sciana.src = "sprites/Wall.png";
// Plomienie
var ogien2 = new Image();
ogien2.src = "sprites/plomien-Sheet.png";

Wiesiek = stoje;                                                                //Wiesiek gdy się nie rusza, wyświetla się frontem czyli wyświetla animacje Stoje.

//////////////FUNKCJE/////////////// -------------------------------------------------------------- <= FUNKCJE.

//Mapa -------------------------------------------------------------------------------------------- <- MAPA.
function stworzTabliceMapy(){ // Tworzy tablice które będą różnymi warstwami gry koliderów.
    MapArray = [];
    for (var i = 0; i < wysokoscMapy; i++) {
        MapArray[i] = [szerokoscMapy];
    }
    PlatformArray = [];
    for (var i = 0; i < wysokoscMapy; i++) {
        PlatformArray[i] = [szerokoscMapy];
    }
    CharacterArray = [];
    for (var i = 0; i < wysokoscMapy; i++) {
        CharacterArray[i] = [szerokoscMapy];
    }
    AudioArray = [];
    for (var i = 0; i < wysokoscMapy; i++) {
        AudioArray[i] = [szerokoscMapy];
    }
}
function wypelnijTabliceZerami(){ // Wypełnia wszystkie tablice zerami.
    for(let i = 0; i < wysokoscMapy; i++){
        for(let j =0; j<szerokoscMapy;j++){
            MapArray[i][j] = 0;
            PlatformArray[i][j] = 0;
            CharacterArray[i][j] = 0;
            AudioArray[i][j] = 0;
        }
    }
}
function stworzAudioCheckPoint(x,y, colider){
    AudioArray[y][x] = colider;
}
function stworzPlatformeNaMapie(x, y, wielkosc){ //stwórz platforme na mapie.
    wielkosc += x;
    for(x; x < wielkosc; x++){
        PlatformArray[y][x] = platforma.colider; 
        platforma.obraz++;
    }
}
function stworzDrabineNaMapie(x, y, wysokoscDrabiny){ //stwórz drabine na mapie.
    wysokoscDrabiny += y;
    for(y; y < wysokoscDrabiny; y++){
        PlatformArray[y][x] = drabina.colider; 
    }
}
function stworzOgienNaMapie(x,y, wielkosc){ // stwórz ogień na mapie.
    wielkosc += x;
    for(x; x < wielkosc; x++){
        PlatformArray[y][x] = ogien.colider; 
        platforma.obraz++;
    }
    if(platforma.obraz > 4){
        platforma.obraz = 0;
    }
}
function stworzWinNaMapie(x,y){ // stwórz win na mapie;
        win.pozX = x;
        win.pozY = y;
        PlatformArray[win.pozY][win.pozX] = win.colider; 

}
function umiescColiderPostaciNaMapie(){  
    CharacterArray[Math.ceil(postac.pozY / wielkoscBloczkow)][Math.ceil(postac.pozX / wielkoscBloczkow)] = postac.colider; // Umieszcza colider postaci na mapie
}

//Poruszaj się ------------------------------------------------------------------------------------ <- PORUSZANIE SIĘ.
function Sterowanie(){  // Wykrywa zdarzenia i jeśli są do nich przypisane jakieś akcje to je wykonuje.
    if(GameOver == false && GameWin == false){ 
        document.addEventListener('keydown', keyPressed);
        document.addEventListener('keyup', keyReleased);
    
        function keyPressed(evt){ // Jesli wciśniety klawisz Spacji, w lewo, w prawo, do góry.
            if(evt.keyCode == SPACE_KEY){
                SpacePressed = true;
            }
            if(evt.keyCode == LEFT_KEY){
                leftKeyPress = true;
                PoruszajSie();
            }
            if(evt.keyCode == RIGHT_KEY){
                rightKeyPress = true;
                PoruszajSie();
            }
            
            if(evt.keyCode == UP_KEY && jump == false ){ // Podskocz, o ile nie jesteś już w powietrzu.
                if(Hop == 0 || Hop ==1){ // powiedz 2 Hop za trzecim razem Hopsa, następnie zzeruj zmieną Hop.
                    let audio4 = new Audio("Audio/Hop.M4A")
                    audio4.play();
                    Hop++;
                }
                else if(Hop == 2){
                    let audio5 = new Audio("Audio/Hopsa.M4A")
                    audio5.play();
                    Hop=0;
                }
                jump = true;
                UpPressed = true;
                PoruszajSie();
            }
            
        }
        function keyReleased(evt){ // Wykryj zdarzenia puszczenia klawisza, następnieobróć Wieśka w kierunku frontu.
            if(evt.keyCode == SPACE_KEY){
                if(GameOver == false){
                    SpacePressed = false;
                    Wiesiek = stoje;
                }
                
            }
            if(evt.keyCode == LEFT_KEY){
                if(GameOver == false){
                    leftKeyPress = false;
                    Wiesiek = stoje;
                }
            }
            if(evt.keyCode == RIGHT_KEY){
                if(GameOver == false){
                    rightKeyPress = false;
                    Wiesiek = stoje;
                }
            }
            if(evt.keyCode == UP_KEY){ // Gdy wiesiek skacze, i puszcze kierunek nie zmieniał jest obrazka.
                if(GameOver == false){
                    UpPressed = false;
                }
            }
        }
        function PoruszajSie(){  // 
            
            if(PuscMuzyke == false){            // Przeglądarka blokuje możliwość uruchomienia automatycznie audio, dlatego audio przypisane jest do pierwszego ruchu gracza.
                let FlameSound = new Audio("Audio/AudioOgien.mp3")
                let Musicgame = new Audio("Audio/gameMusic.mp3")
                let cosnapil =  new Audio("Audio/cosBymSieNapil.M4A")
                cosnapil.load(); // wczytaj audio
                cosnapil.volume = 1; // ustaw głośność
                cosnapil.play();  // włącz audio.
                FlameSound.load();
                FlameSound.volume = 0.7;
                Musicgame.load();
                Musicgame.volume = 0.5; // Pół głośności.
                Musicgame.play();
                PuscMuzyke = true; // zmien PunćMuzykę na true, by uruchomiła ta funkcja uruchomiła się tylko raz po pierwszym wykrycia zdarzenia na klawiaturze.
            }
            if(GameOver == false && GameWin == false){                    
                if(leftKeyPress == true){ // Jesli wcisne w prawo
                    Wiesiek = ideLewo; // zmien animacje na WIeśka idącego w Lewo
                    postac.pozX -= postac.predkosc; // ustaw predość przesuwania się animacji, pobierajac ją z obiektu postać.predkosc
                }
                else if(rightKeyPress == true){//Jeśli wcisne w Lewo
                    Wiesiek = idePrawo;
                    postac.pozX += postac.predkosc;
                }
                else if(rightKeyPress == false && leftKeyPress == false ){//Jesli nie wcisne ani w prawo ani w lewo
                    Wiesiek = stoje;
                }
                else if(UpPressed == true && rightKeyPress == true && jump == true){//jesli wcisne do góry, i w prawo
                    postac.pozY -= postac.skok ;   // obróc grawitację, i podnoś postać aż osiągnie limit skok.
                    postac.pozX += postac.predkosc; 
                }
                else if(UpPressed == true && leftKeyPress == true && jump == true){ //jesli wciasne do góry, i w lewo
                    postac.pozY -= postac.skok;
                    postac.pozX -= postac.predkosc;
                }
                if(czyMaszJuzPiwko() == true && GameWin == false){ // Gdy Wieśiek znajdzie piwo
                    let audio1 = new Audio("Audio/winSound1.mp3")
                    audio1.play();
                    let audio2 = new Audio("Audio/yeah.mp3")
                    audio2.play();
                    let audio3 = new Audio("Audio/openBeer.mp3")
                    audio3.play();
                    setTimeout(pij,3400); // odpal audio picia po 3,4 sekundzie.
                    win.colider = 666;  // zmień kolider na inny numer, by przestał sie wyświetlać
                    rysujWygrales();  // uruchom funkcje wyświetaljącą Wygraną na Canvie.
                    UpPressed = false; // zablokuj mozliwosć poruszania się.
                    rightKeyPress = false;
                    leftKeyPress = false;
                    GameWin = true;  // Wiele funkcji zawsze sprawdza czy gra nie jest GameOver albo GameWin true, jeśli tak jest, to blokowane są możliwosći poruszania się.
                }

                if(UpPressed == true){ // jeśli spacja, CEL Rzuc Nożem ************************************************************************************************************************************ PRACUJE
                    if(UpPressed == true){   // Może kiedyś w przyszłośći ;)
                        jump = true;
                        skokstart = 0;
                    }
                }
                ///////////////////////////////////////////////Jeśli spacja wcisnieta to rzuca nożem
            }
        }
    }
}
//Fizyka ------------------------------------------------------------------------------------------ <- FIZYKA.
function pij(){ // Pij 
    let audio4 = new Audio("Audio/picie.mp3")
    Musicgame.volume = 0.2
    audio4.volume =3;
    audio4.play();
}
function WykryjPlatforme(){ // Czy colider postaci znajduję się na poyzji w której znajduje się colider platformy.
    if(PlatformArray[Math.floor(postac.pozY / wielkoscBloczkow)+1][Math.round(postac.pozX / wielkoscBloczkow)] == 1 || PlatformArray[Math.floor(postac.pozY / wielkoscBloczkow)+1][Math.round(postac.pozX / wielkoscBloczkow)] == 3  ){
        jump = false;
        return true;
    }
    else{
        jump = true;
        return false;
    }
}
function grawitacja(){ // Opadanie // Skakanie.
    if(UpPressed == false ){
        if(GameOver == false && GameWin == false){
            if(leftKeyPress == true){ 
                postac.pozX -= postac.predkosc;
            }
            if(rightKeyPress == true){
                postac.pozX += postac.predkosc;
            }

            if(WykryjPlatforme() == false && UpPressed == false){
                if(czyWpadlemDoOgnia() == false){
                    postac.pozY += grawitacjaMoc;
                }
                else{
                    GameOver = true;
                    Wiesiek = new Image();
                    rysujPrzegrales();
                }
            }
            if(WykryjPlatforme() == false && UpPressed == true){
                if(czyWpadlemDoOgnia()== false){
                    postac.pozY += grawitacjaMoc;
                }
                if(czyNieUderzylemWSufit = true){
                }
                else{
                    if(GameOver == false){
    
                        Wiesiek = new Image(); // jeśli wiesiek wpadnie do Ognia to znika
                        rysujPrzegrales(); // wyświetla Prazegrałeś.
                        GameOver = true;
                    }
                }
            }
            if(WykryjPlatforme()== true){
                pozycjaY = postac.pozY;
                if(CzySkaczeZeZbytWysoka() == true){ // Jeśli skoczysz z zbyt wysoka zginiesz. 
                    if(GameOver == false){
                        let audio = new Audio("Audio/fallDead.mp3")
                        audio.play();
                        Wiesiek = zup;
                        rysujPrzegrales();
                        GameOver = true;
                    }
                }
            }

        }
    }
    else{ // Skok
        if(czyNieUderzylemWSufit() == true){
            if(GameOver == false && GameWin == false){
                if(postac.pozY + skokLimit > pozycjaY ){
                    postac.pozY -= grawitacjaMoc;
                    skokstart = postac.pozY;
                    if(leftKeyPress == true){ 
                        postac.pozX -= postac.predkosc;
                    }
                    if(rightKeyPress == true){
                        postac.pozX += postac.predkosc;
                    }
                    if(postac.pozY + skokLimit > pozycjaY + skokLimit/2){
                        postac.pozY -= grawitacjaMoc/2;
                        if(leftKeyPress == true){ 
                            postac.pozX -= postac.predkosc;
                        }
                        if(rightKeyPress == true){
                            postac.pozX += postac.predkosc;
                        }
                    }
                }
                else{
                    UpPressed = false;
                }
            }
        }
        else{
            UpPressed = false;
        }
    }

}

//Zasady ------------------------------------------------------------------------------------------ <- ZASADY.
function czyWpadlemDoOgnia(){ // Sprawdz czy obcena pozycja Postaci w px, po przekonwertowaniu na miejsce w tablicy, nie jest równa coliderowi Ognia, jesli tak zwróć true i wydaj dzwięk.
    if(PlatformArray[Math.ceil(postac.pozY / wielkoscBloczkow)][Math.round(postac.pozX / wielkoscBloczkow)] == 10 ){
        if(GameOver == false){
            let audio2 = new Audio("Audio/Burned.mp3")
            audio2.play()
            GameOver = true;
        }
        return true;
    }
    else{
        return false;
    }
}
function czyMaszJuzPiwko(){  // Sprawdz czy obcena pozycja Postaci w px, po przekonwertowaniu na miejsce w tablicy, nie jest równa coliderowi Win, jesli tak to zwróć True
    if(PlatformArray[Math.round(postac.pozY / wielkoscBloczkow)][Math.round(postac.pozX / wielkoscBloczkow)] == 7 ){
        return true;
    }
    else{
        return false
    }
}
function czyNieUderzylemWSufit(){ // Czy postać nie wyskoczyła nad tablice.
    if(postac.pozY == 1  ){
        return false;
    }
    else {
        return true;
    }
}
function CzySkaczeZeZbytWysoka(){ // czy nie skacze ze zbyt wysoka. Jesli tak, to zwróć true, a gdzieś indziej wykonaj animacje łamania się postaci po upadku z wysoka.

    if(pozycjaY - skokstart > 200 ){
        return true;
    }
    else{
        return false;
    }
}
//Rysuj ------------------------------------------------------------------------------------------- <- RYSUJ.

function rysujCoJestNaTablicy(){
    // Rysowanie bloczków na podstawie coliderów z tablicy.
    for(i=0; i< wysokoscMapy; i++){
        for(j=0;j<szerokoscMapy;j++){
            if(MapArray[i][j] == przestrzen.colider){
                c.drawImage(sciana, j*wielkoscBloczkow, i*wielkoscBloczkow); // Wyswietl sciane.
            }
        }
    }
    for(i=0; i< wysokoscMapy; i++){
        for(j=0;j<szerokoscMapy;j++){
            if(PlatformArray[i][j] == platforma.colider){
                c.drawImage(podloga, j*wielkoscBloczkow, i*wielkoscBloczkow); // Wyswietl podloge
            }
        }
    }
    for(i=0; i< wysokoscMapy; i++){
        for(j=0;j<szerokoscMapy;j++){
            if(PlatformArray[i][j] == drabina.colider){
                c.drawImage(drabinaa, j*wielkoscBloczkow, i*wielkoscBloczkow); // Wyswietl drabine
            }
        }
    }
    for(i=0; i< wysokoscMapy; i++){ // RYSUJ PIWO
        for(j=0;j<szerokoscMapy;j++){
            if(PlatformArray[i][j] == win.colider){
                c.drawImage(piwo, 40* Math.floor(stepiwo), 0, 40, 40, j*wielkoscBloczkow,i*wielkoscBloczkow, 40, 40); // uruchomienie animacji Piwa
            }
        }
    }
    for(i=0; i< wysokoscMapy; i++){ // RYSUJ OGIEŃ
        for(j=0;j<szerokoscMapy;j++){
            if(PlatformArray[i][j] == ogien.colider){
                c.drawImage(ogien2, 40* Math.floor(stepOgien), 0, 40, 40, j*wielkoscBloczkow,i*wielkoscBloczkow, 40, 40);  // uruchomienie animacji Ognia
            }
        }
    }

    rysujPostac(Wiesiek); // Rysuj wieśka ( funkcja)
}

function rysujPostac(ktoreZdjecie){ // Rysuje postać, na cavie. na pozycjach pobranych z Obiektu postac
    c.drawImage(ktoreZdjecie, 64* Math.floor(step), 0, 64, 64, postac.pozX, postac.pozY, 45, 45);
}
function rysujPrzegrales(){ //Wyświetla napis "PRZEGRAŁEŚ"
    c.fillStyle = "yellow";
    c.font = "190px Arial";
    c.fillText("NIE ŻYJESZ!",90,330);
    GameOver = true;
}
function rysujWygrales(){ //Wyświetla Wygraną"
    c.fillStyle = "blue";
    c.font = "130px Arial";
    c.fillText("Gasisz pragnienie!",60,300);
    c.fillStyle = "red";
    c.font = "100px Arial";
    c.fillText("Wygrałeś !!",380,410);
    GameWin = true;
}
function rysujInfo(){ // Rysuje informacje o poruszaniu się, oraz o tym w jaki sposób możesz zginąć.
    c.beginPath();
    c.strokeStyle = '#FFC143';
    c.moveTo(width/2 + width/7-15, 40);
    c.lineTo(width/2 + width/7 + 430, 40);
    c.lineTo(width/2 + width/7 + 430, 175);
    c.lineTo(width/2 + width/7-15, 175);
    c.lineTo(width/2 + width/7-15, 40);
    c.stroke();
    c.fillStyle = "#CD850A";
    c.font = "15px Arial";
    c.fillText("- Prawo - lewo by chodzić, góra by skakać.",width/2 + width/7,70);
    c.fillText("- Ogień zabija.",width/2 + width/7,100);
    c.fillText("- Jeśli spadniesz z wysokości powyżej trzech platform Giniesz.",width/2 + width/7,130);
    c.fillText("- Nie przejdź obok piwa obojętnie !!!",width/2 + width/7,160)
}
function rzutNozem(){ // Może kiedyś.
    let nozPozY = postac.pozY;


}
//Animuj ------------------------------------------------------------------------------------------ <- ANIMUJ.
function animuj(){ // Funkcja animująca wszystko, która przez rekurencję powtarza sama siębie w nieskończoność.
    rysujCoJestNaTablicy();
    update();
    requestAnimationFrame(animuj);
    if(GameOver == true){
        rysujPrzegrales();               
    }
    if(GameWin== true){
        rysujWygrales();
    }
    rysujInfo();
}
//Update ------------------------------------------------------------------------------------------ <- UPDATE.
function update(){ // Aktualiazacje
grawitacja()
if(ogien2){
    stepOgien += 0.25;/// Zmaian prędkości obrotu
    if (stepOgien >= 4) // Powtarzaj animacje, cofając Step do poczatku.
        stepOgien -= 4;
}

if(piwo){
    stepiwo += 0.2;  
    if (stepiwo >= 11)
        stepiwo -= 11;
}

if(Wiesiek == stoje){
    step += 0.1;
    if (step >= 10)
        step -= 10;
}
if( Wiesiek == ideLewo){
    step += 0.3;
    if (step >= 12 )
        step -= 12;
}
if(Wiesiek == idePrawo ){
    step += 0.3;
    if (step >= 12)
        step -= 12;
}
if(Wiesiek == zup){
    step += 0.15;
}
}
//WywoływaczeFunckji. ***************************************************************************** <- WYWOŁANIA FUNKCJI.
function start(){ // Funckja wywołująca cały program, wraz z jego mapą i postaciami.

stworzTabliceMapy();
wypelnijTabliceZerami();
// Ustawianie platform na mapie.
stworzPlatformeNaMapie(2,3,3);
stworzPlatformeNaMapie(6,6,10);
stworzPlatformeNaMapie(7,4,2);
stworzPlatformeNaMapie(4,7,1);
stworzPlatformeNaMapie(1,9,1);
stworzPlatformeNaMapie(4,11,1);
stworzPlatformeNaMapie(5,11,1);
stworzPlatformeNaMapie(7,12,1);
stworzPlatformeNaMapie(9,11,1);
stworzPlatformeNaMapie(11,13,1);
stworzPlatformeNaMapie(13,13,1);
stworzPlatformeNaMapie(15,13,1);
stworzPlatformeNaMapie(17,13,1);
stworzPlatformeNaMapie(19,12,1);
stworzPlatformeNaMapie(21,12,1);
stworzPlatformeNaMapie(23,13,1);
stworzPlatformeNaMapie(25,13,1);
stworzPlatformeNaMapie(27,13,1);
stworzPlatformeNaMapie(29,12,2);
stworzPlatformeNaMapie(27,11,1);
stworzPlatformeNaMapie(23,10,3);
stworzPlatformeNaMapie(17,8,2);
stworzOgienNaMapie(23,9,2)
stworzOgienNaMapie(14,8,3)

stworzPlatformeNaMapie(14,9,3);
stworzPlatformeNaMapie(20,9,2);
stworzPlatformeNaMapie(27,11,1);
stworzPlatformeNaMapie(29,12,1);
stworzPlatformeNaMapie(27,9,2);
stworzPlatformeNaMapie(27,9,2);
stworzPlatformeNaMapie(24,8,2);
stworzOgienNaMapie(28,8,1);
stworzOgienNaMapie(0,wysokoscMapy-1,szerokoscMapy-1);
stworzOgienNaMapie(6,5,10);
stworzOgienNaMapie(5,7,2);
stworzPlatformeNaMapie(5,8,2);
stworzDrabineNaMapie(17,4,4)
stworzPlatformeNaMapie(14,4,2);
// WYgrana
stworzWinNaMapie(14,3);

// stwórz postać
umiescColiderPostaciNaMapie();
animuj();
Sterowanie();   
}
window.onload = start();
console.table(PlatformArray)


