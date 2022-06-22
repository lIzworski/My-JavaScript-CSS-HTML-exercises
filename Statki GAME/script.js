let WielkoscMapy = 600;
//Statki
let statek5 = 5, statek4 = 4,statek3 = 3, statek2 = 2, statek1 = 1;
let kierunek;
let poziomo = true;
let czyWolne = false;
let iloscStatkowWroga = 0;
let iloscStatkowMoich = 0;

//Mapa
let iloscKolumn = 10;
let iloscWierszy = 10;
let kogoKolej = true // true == Gracz.
let komputer = 1;
let gracz = 0;
let tekstKolejki;
let GameOver =  false;
//Przeciwnik
let ostatniTrafiony = {
    osX: 0,
    osY: 0,
    kierunek: 0,
    seria: 0,
}

function utwurzTablice(){
    tablicaMapyGracza = [];
    for (var i = 0; i < iloscWierszy; i++) {
        tablicaMapyGracza[i] = [];
    }
    tablicaMapyKomputera = [];
    for (var i = 0; i < iloscWierszy; i++) {
        tablicaMapyKomputera[i] = [];
    }
    wypelnijTabliceZerami();
}
function wypelnijTabliceZerami(){
    for(let i = 0; i < iloscWierszy; i++){
        for(let j =0; j<iloscWierszy;j++){
            tablicaMapyGracza[i][j] = 0;
            tablicaMapyKomputera[i][j] = 0;
        }
    }
}
function dzwiekPlusk(){
    const dzwiek = [ new Audio('audio/splash.mp3'), new Audio('audio/splash1.mp3'), new Audio('audio/splash2.mp3'), new Audio('audio/splash3.mp3')];
    let i = Math.floor(Math.random()*dzwiek.length);
    dzwiek[i].play();
}
function dzwiekTrafienia(){
    const dzwiek = [  new Audio('audio/wybuch2.mp3')];
    let i = Math.floor(Math.random()*dzwiek.length);
    dzwiek[i].play();
}

function strzelaj(xx,yy){
    if(GameOver == false){
        let x = (xx/40)-1.5;
        let y = (yy/40)-1.5;
        if(tablicaMapyKomputera[y][x] == 1){
            tablicaMapyKomputera[y][x] = 2; // 2 = trafiony
            c.fillStyle = '#7130E2';
            c.fillRect(x*40+30, y*40+30, 40, 40);
            iloscStatkowWroga -= 1;
            trafilesStrzelaszJeszczeRaz();
            wyswietlDane();
            if(iloscStatkowWroga == 0){
                Win();
                GameOver = true;
            }
            dzwiekTrafienia();
        }
        else if(tablicaMapyKomputera[y][x] == 0){
            c.fillStyle = 'blue';
            c.fillRect(x*40+30, y*40+30, 40, 40);
            tablicaMapyKomputera[y][x] = 3; // 3 = pudło
            dzwiekPlusk();
        }
    }
}
function sprawdzCzyByloJuzTuStrzelane(xx,yy){
    let x = (xx/40)-1.5;
    let y = (yy/40)-1.5;
    if(tablicaMapyKomputera[y][x] == 2 || tablicaMapyKomputera[y][x] == 3){
        console.log("Już tutaj strzelałeś, strzel gdzie indziej")
        return true;
    }
    else{
        return false;
    }  
}
function trafilesStrzelaszJeszczeRaz(){
    if(kogoKolej == false){
        kogoKolej = true;
    }
    else{
        kogoKolej = false;
    }
}
function wyswietlDane(){
    function wyswietlIloscZycWroga(){
        c.fillStyle = 'white';
        c.fillRect(100, 460, 300, 50);
        c.fillStyle = 'blue';
        c.font = "30px Arial";
        c.fillText("Ilosc zyc: " + iloscStatkowWroga,150,490);
    }
    function wyswietlIloscZycTwoja(){
        c.fillStyle = 'white';
        c.fillRect(700, 460, 220, 50);
        c.fillStyle = 'blue';
        c.font = "30px Arial";
        c.fillText("Ilosc zyc: " + iloscStatkowMoich,715,490);
    }
    wyswietlIloscZycTwoja();
    wyswietlIloscZycWroga();
}
function Win(){
    let odLewej = 370;
    let odGory = 200;
    if(iloscStatkowMoich == 0){
        const dzwiek = new Audio('audio/lose.mp3');
        dzwiek.play();
        c.fillStyle = 'black';
        c.font = "140px Arial";
        c.fillText("Przegrałeś !!!",100,240);
    }
    else if(iloscStatkowWroga == 0){
        const dzwiek = new Audio('audio/win.mp3');
        dzwiek.play();
        c.fillStyle = 'black';
        c.font = "140px Arial";
        c.fillText("Zwycięstwo !!!" ,100,240);
    }
}
function KolejKomputera(){
    
    if(GameOver == false){
        function strzalKomputera(){
            x = losuj();
            y = losuj();
            if(tablicaMapyGracza[y][x] == 2 || tablicaMapyGracza[y][x] == 3){
                strzalKomputera();
            }
            else{
                if(tablicaMapyGracza[y][x] == 1){
                    ostatniTrafiony.osX = x;
                    ostatniTrafiony.osY = y;
                    if(ostatniTrafiony.seria = 0){
                        ostatniTrafiony.kierunek++;
                    }
                    ostatniTrafiony.seria++;
                    tablicaMapyGracza[y][x] = 2; // 2 = trafiony
                    c.fillStyle = '#E51D1D';
                    c.fillRect(x*40+30+565, y*40+30, 40, 40);
                    iloscStatkowMoich -= 1;
                    wyswietlDane();
                    if(iloscStatkowMoich == 0){
                        Win();
                        GameOver = true;
                    }
                    dzwiekTrafienia();
                    setTimeout(strzalKomputeraZIQ,1400);
                }
                else if(tablicaMapyGracza[y][x] == 0){
                    c.fillStyle = '#62E8DF';
                    c.fillRect(x*40+30 + 565, y*40+30, 40, 40);
                    tablicaMapyGracza[y][x] = 3; // 3 = pudło
                    dzwiekPlusk();
                }
            }
        }
        function strzalKomputeraZIQ(){
            if(ostatniTrafiony.kierunek < 5){
                if(ostatniTrafiony.kierunek == 1 && ostatniTrafiony.osX <= 8){ // w prawo
                    x = ostatniTrafiony.osX +1;
                    y = ostatniTrafiony.osY;
                }
                else if(ostatniTrafiony.kierunek ==2 && ostatniTrafiony.osX >= 1){ //w lewo
                    x = ostatniTrafiony.osX-1;
                    y = ostatniTrafiony.osY;
                }
                else if(ostatniTrafiony.kierunek==3 && ostatniTrafiony.osX <= 8){ //w dól
                    x = ostatniTrafiony.osX;
                    y = ostatniTrafiony.osY +1;
                }
                else if(ostatniTrafiony.kierunek ==4 && ostatniTrafiony.osX >= 1){ //do góry
                    x = ostatniTrafiony.osX;
                    y = ostatniTrafiony.osY -1;
                }
                else{
                    ostatniTrafiony.kierunek++;
                }   
            }
            else{
                ostatniTrafiony.kierunek = 1;
            }
            if(tablicaMapyGracza[y][x] == 2 || tablicaMapyGracza[y][x] == 3){
                strzalKomputera()
            }
            else{
                if(tablicaMapyGracza[y][x] == 1){
                    ostatniTrafiony.osX = x;
                    ostatniTrafiony.osY = y;
                    if(ostatniTrafiony.seria = 0){
                        ostatniTrafiony.kierunek++;
                    }
                    ostatniTrafiony.seria++;
                    tablicaMapyGracza[y][x] = 2; // 2 = trafiony
                    c.fillStyle = '#E51D1D';
                    c.fillRect(x*40+30+565, y*40+30, 40, 40);
                    iloscStatkowMoich -= 1;
                    wyswietlDane();
                    if(iloscStatkowMoich == 0){
                        Win();
                        GameOver = true;
                    }
                    setTimeout(strzalKomputeraZIQ,1400);
                    
                }
                else if(tablicaMapyGracza[y][x] == 0){
                    ostatniTrafiony.seria =0
                    ostatniTrafiony.kierunek++;
                    c.fillStyle = '#62E8DF';
                    c.fillRect(x*40+30 + 565, y*40+30, 40, 40);
                    tablicaMapyGracza[y][x] = 3; // 3 = pudło
                    dzwiekPlusk();
                }
            }
        }
     setInterval(strzalKomputera(),2000) ;
    }
}
function losuj(){
    //Losuj liczbę od 0 do 9
    return Math.floor(Math.random() * 10);
}
var c = document.getElementById('canvasWrog').getContext('2d');

window.onload = function(){
    utwurzTablice();
    //uzupeliamTabliceZerami();
    //Zapisuje pod xx,yy nr okienka z tablic które było kliknięte.
    if(GameOver == false){
        document.onclick = function(e) {
            let xx,yy;
    
            if(kogoKolej == true){
                if(e.pageX < 440 && e.pageX > 30 && e.pageY < 440 && e.pageY > 40)
                {
                    xx = Math.floor(e.pageX/40)*40+20;
                    yy = Math.floor(e.pageY/40)*40+20;
                    if(sprawdzCzyByloJuzTuStrzelane(xx,yy) == false){
                        kogoKolej = false;
                        tekstKolejki = "twoja kolej"
                        strzelaj(xx,yy);
                        if(kogoKolej == false){
                            setTimeout(KolejKomputera,1000);
                            setTimeout(kogoKolej = true, 1000);
                            // kogoKolej = true;
                        }
                    }
                }
                else{
                    xx = "poza Planszą"
                    yy = "poza Plansza"
                }
            }

        }

    }

    
    function umiescStatkiNaMapie(){
        let przeciwnyKierunek = false;
        let poczatekStatku = {
            Px: 0,
            Py: 0,
        }
        let koniecStatku = {
            Kx: 0,
            Ky: 0,
        }
        let wielkoscStatku = 0;
        let x = 0;
        let y = 0;
        // Potrzebne by losować miejsce pojawienia się wrogiego statku.
        //Potrzebne by określić kierunek w którym statek się pojawi na mapie.
        function losujKierunek(){
            kierunek = Math.floor(Math.random() * 2)   
            if(kierunek == 0){
                poziomo = true; 
            }
            else{
                poziomo = false;
            }
        }

        //Funkcja dodaje statek na losowe pozycje
        function dodajStatek(JakiStatek,kto){
            if(kto == 0){
                tablicaMapy = tablicaMapyGracza;
            }
            else if (kto == 1){
                tablicaMapy = tablicaMapyKomputera;
            }
            wielkoscStatku = JakiStatek;

            let ktooo = kto;
            x = losuj();
            y = losuj();
            losujKierunek();
            ustawStatek(ktooo);  
        }

        function obliczKoniecStatku(){
            if (poziomo == true){
                if(x + dlugoscStatku <= 9){
                     koniecStatku.Kx = x+dlugoscStatku;
                     koniecStatku.Ky = y;
                     przeciwnyKierunek = false;
                }
                else if(x -dlugoscStatku >= 0 ){
                    koniecStatku.Kx = x-dlugoscStatku;
                    koniecStatku.Ky = y;
                    przeciwnyKierunek = true;
                }
            }
            else{
                if(y + dlugoscStatku <= 9){
                    koniecStatku.Kx = x;
                    koniecStatku.Ky = y + dlugoscStatku;
                    przeciwnyKierunek = false;
                }
                else if(y - dlugoscStatku >= 0){
                    koniecStatku.Kx = x;
                    koniecStatku.Ky = y - dlugoscStatku;
                    przeciwnyKierunek = true;
                }
            }
        }
        function sprawdzCzyMoznaUstawicTutajStatek(){
            let dlugosc = 0;
            if(poziomo == true && przeciwnyKierunek == false){
                let wPrawo = poczatekStatku.Px;
                for(wPrawo; wPrawo <= koniecStatku.Kx; wPrawo++){
                    if(tablicaMapy[poczatekStatku.Py][wPrawo] == 0){
                        dlugosc++;
                    }
                    else if(tablicaMapy[poczatekStatku.Py][wPrawo] == 1){
                    }
                }
                sprawdz();
            }
            else if(poziomo == true && przeciwnyKierunek == true){
                let wLewo = poczatekStatku.Px;
                for(wLewo; wLewo >= koniecStatku.Kx; wLewo--){
                    if(tablicaMapy[poczatekStatku.Py][wLewo] == 0){
                        dlugosc++;
                    }
                } 
                sprawdz();
            }
            else if(poziomo == false && przeciwnyKierunek == false){
                let wDol = poczatekStatku.Py;
                for(wDol; wDol <= koniecStatku.Ky; wDol++){
                    if(tablicaMapy[wDol][poczatekStatku.Px] == 0){
                        dlugosc++;
                    }
                }  
                sprawdz();
            }
            else if(poziomo == false && przeciwnyKierunek == true){
                let doGory = poczatekStatku.Py;
                for(doGory; doGory >= koniecStatku.Ky; doGory--){
                    if(tablicaMapy[doGory][poczatekStatku.Px] == 0){
                        dlugosc++;
                    }
                } 
                sprawdz();
            }
            function sprawdz(){
                // console.log(wielkoscStatku)
                // console.log(dlugosc)
                if(dlugosc == wielkoscStatku){
                    return czyWolne = true;
                }
                else{
                    return czyWolne = false;
                }
            }
            
        }
        function dodajStatekDoTablicy(){
            if(poziomo == true && przeciwnyKierunek == false){
                let wPrawo = poczatekStatku.Px;
                for(wPrawo; wPrawo <= koniecStatku.Kx; wPrawo++){
                    if(tablicaMapy[poczatekStatku.Py][wPrawo] == 0){
                        tablicaMapy[poczatekStatku.Py][wPrawo] = 1;
                    }
                }
            }
            else if(poziomo == true && przeciwnyKierunek == true){
                let wLewo = poczatekStatku.Px;
                for(wLewo; wLewo >= koniecStatku.Kx; wLewo--){
                    if(tablicaMapy[poczatekStatku.Py][wLewo] == 0){
                        tablicaMapy[poczatekStatku.Py][wLewo] = 1;
                    }
                }    
            }
            else if(poziomo == false && przeciwnyKierunek == false){
                let wDol = poczatekStatku.Py;
                for(wDol; wDol <= koniecStatku.Ky; wDol++){
                    if(tablicaMapy[wDol][poczatekStatku.Px] == 0){
                        tablicaMapy[wDol][poczatekStatku.Px] = 1;
                    }
                }    
            }
            else if(poziomo == false && przeciwnyKierunek == true){
                let doGory = poczatekStatku.Py;
                for(doGory; doGory >= koniecStatku.Ky; doGory--){
                    if(tablicaMapy[doGory][poczatekStatku.Px] == 0){
                        tablicaMapy[doGory][poczatekStatku.Px] = 1;
                    }
                }    
            }
        }
        function ustawStatek(kim){
            dlugoscStatku = wielkoscStatku-1;
            poczatekStatku.Px = x;
            poczatekStatku.Py = y;
            obliczKoniecStatku();
            sprawdzCzyMoznaUstawicTutajStatek();
            //console.log(czyWolne)
            if(czyWolne == true){
                dodajStatekDoTablicy();
                //Warunek dodaje ilosc posiadych punktów floty ( każdy fragment statku to 1 pkt)
                if(kim == 0){
                    iloscStatkowMoich += wielkoscStatku;
                }
                else if (kim == 1){
                    iloscStatkowWroga += wielkoscStatku;
                }
            }
            else{
                dodajStatek(wielkoscStatku, kim)
            }
        }
        //Statki Wroga
        dodajStatek(statek4,1);
        dodajStatek(statek3,1);
        dodajStatek(statek2,1);
        dodajStatek(statek1,1);
        dodajStatek(statek5,1);

        //Statki Gracza
        dodajStatek(statek5,0);
        dodajStatek(statek4,0);
        dodajStatek(statek3,0);
        dodajStatek(statek2,0);
        dodajStatek(statek1,0);

        wyswietlStatkiGracza();
        //wyswietlStatkiKomputera();
        //Wyswietla Statki 
        function wyswietlStatkiGracza(){
            for(i=0; i< 10; i++){
                for(j=0;j<10;j++){
                    if(tablicaMapyGracza[j][i] == 1){
                        c.fillStyle = 'green';
                        c.fillRect(i*40-10+40+565, j*40-10+40, 40, 40);
                    }
                }
            }
            console.table(tablicaMapyGracza);
        }
        //Funckja awaryjna do badania problemów z wrogimi statkami.
        function wyswietlStatkiKomputera(){
            for(i=0; i< 10; i++){
                for(j=0;j<10;j++){
                    if(tablicaMapyKomputera[j][i] == 1){
                        c.fillStyle = '#A2191E';
                        c.fillRect(i*40-10+40, j*40-10+40, 40, 40);
                    }
                }
            }
            console.table(tablicaMapyKomputera);
        }
    }
    // Tworze Plansze 10 x 10.
    function rysujPlanszeWroga(){
        //Niebieskie tło
        c.fillStyle = '#68B1E9';
        c.fillRect(10, 10, 440, 440);
        //Szachownica
        c.strokeStyle = "rgb(50,50,50)";
        c.lineWidth = 1;
        c.fillStyle = 'red';
        c.font = "20px Arial";
        c.fillText("Mapa przeciwnika",150,450);
        c.fillStyle = 'black';
        c.font = "20px Arial";
        //Liczby
        c.fillText("1",43,24);
        c.fillText("2",83,24);
        c.fillText("3",123,24);
        c.fillText("4",163,24);
        c.fillText("5",203,24);
        c.fillText("6",243,24);
        c.fillText("7",283,24);
        c.fillText("8",323,24);
        c.fillText("9",363,24);
        c.fillText("10",398,24);
        //Litery
        c.fillText("A",13,55);
        c.fillText("B",13,95);
        c.fillText("C",13,135);
        c.fillText("D",13,175);
        c.fillText("E",13,215);
        c.fillText("F",13,255);
        c.fillText("G",13,295);
        c.fillText("H",13,335);
        c.fillText("I",17,375);
        c.fillText("J",16,415);
        
        for(let i=1; i<=11; i++)
            {
            c.beginPath();
            c.moveTo(30,i*40-10);
            c.lineTo(430,i*40-10);
            c.stroke();
            c.closePath();
            }
        for(let i=1; i<=11; i++)
            {
            c.beginPath();
            c.moveTo(i*40-10,40-10);
            c.lineTo(i*40-10,440-10);
            c.stroke();
            c.closePath();
            }
    }
    function rysujPlanszeMoja(){
        //Niebieskie tło
        c.fillStyle = '#68FFE9';
        c.fillRect(575, 10, 440, 440);
        //Szachownica
        c.strokeStyle = "rgb(50,50,50)";
        c.lineWidth = 1;
        c.fillStyle = 'red';
        c.font = "20px Arial";
        c.fillText("Pozycje twojej floty",713,450);
        c.fillStyle = 'black';
        c.font = "20px Arial";
        c.fillText("1",610,24);
        c.fillText("2",650,24);
        c.fillText("3",690,24);
        c.fillText("4",730,24);
        c.fillText("5",770,24);
        c.fillText("6",810,24);
        c.fillText("7",850,24);
        c.fillText("8",890,24);
        c.fillText("9",930,24);
        c.fillText("10",965,24);
        //Litery
        c.fillText("A",578,55);
        c.fillText("B",578,95);
        c.fillText("C",578,135);
        c.fillText("D",578,175);
        c.fillText("E",578,215);
        c.fillText("F",578,255);
        c.fillText("G",578,295);
        c.fillText("H",578,335);
        c.fillText("I",582,375);
        c.fillText("J",581,415);
        for(let i=1; i<=11; i++)
            {
            c.beginPath();
            c.moveTo(40+555,i*40-10);
            c.lineTo(440+555,i*40-10);
            c.stroke();
            c.closePath();
            }
        for(let i=1; i<=11; i++)
            {
            c.beginPath();
            c.moveTo(i*40+555,40-10);
            c.lineTo(i*40+555,440-10);
            c.stroke();
            c.closePath();
            }
    }
    rysujPlanszeWroga();
    rysujPlanszeMoja();
    umiescStatkiNaMapie();
    wyswietlDane();
}