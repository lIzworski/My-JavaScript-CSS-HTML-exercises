//tabica zawierająca hasła - dowolnie można ją modyfikować
var listaHasel=new Array(5);
listaHasel[0]="Kłamcy dobrej pamięci i dowcipu prędkiego potrzeba"
listaHasel[1]="Niedaleko pada jabłko od jabłoni"
listaHasel[2]="Gdzie diabeł nie może, tam babę pośle"
listaHasel[3]="Wszędzie dobrze, ale w domu najlepiej"
listaHasel[4]="Ładnemu we wszystkim ładnie"
listaHasel[5]="W zdrowym ciele zdrowy duch"
listaHasel[6]="broda mędrcem nie czyni"
listaHasel[7]="bogatemu diabeł dzieci kołysze"
listaHasel[8]="apetyt rośnie w miarę jedzenia"
listaHasel[9]="dobra i wdowa, gdy młoda i zdrowa"
listaHasel[10]="Bóg pomaga temu, który sam rozwiązuje własne problemy"
listaHasel[11]="Baba z wozu, koniom lżej"
listaHasel[12]="Swój ciągnie do swojego"
listaHasel[13]="Lepszy wróbel w garści niż gołąb na dachu"
listaHasel[14]="Szczęście jest pomiędzy ustami a brzegiem kielicha"
listaHasel[15]="Ręka rękę myje"
listaHasel[16]="W zdrowym ciele zdrowy duch"
listaHasel[17]="Każdy sądzi według siebie"
listaHasel[18]="Kruk krukowi oka nie wykole"
listaHasel[19]="Gdzie diabeł nie może tam babę pośle"
listaHasel[20]="Nie chwal dnia przed zachodem słońca"
listaHasel[21]="Kto pod kim dołki kopie, ten sam w nie wpada"
listaHasel[22]="Okazja na nikogo nie czeka"
listaHasel[23]="Kuj żelazo, póki gorące"
listaHasel[24]="Kto nie idzie naprzód, ten się cofa"
listaHasel[25]="Kto dwa zające goni, żadnego nie złapie"

//funkcja wybierająca losowe hasło
function wybierzHaslo() 
{
	return listaHasel[Math.floor(Math.random() * listaHasel.length)];
} 

var haslo = wybierzHaslo(); //przypisanie wybranego hasła do zmiennej
haslo = haslo.toUpperCase();

var dlugosc = haslo.length;
var ile_skuch = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
var eksplozja = new Audio("eksplozja.mp3");
var sukces = new Audio("sukces.mp3");
let stanKonta = 100;
let wartoscLitery = 100;

var haslo1 = "";

//pętla odpowiadajaca za wygenerowanie spacji i "-" w miejscu nieznananych litera
for (i=0; i<dlugosc; i++)
{
	if (haslo.charAt(i)==" ") haslo1 = haslo1 + " ";
	else if (haslo.charAt(i)==",") haslo1 = haslo1 + ",";
	else haslo1 = haslo1 + "-";
}

function wypisz_haslo()
{
	document.getElementById("plansza").innerHTML = haslo1;
}

function losujWartoscLitery(){
	let liczba = 0;
	liczba = (Math.floor(Math.random()*11))*10;
	//liczba -=50;
	wartoscLitery = liczba;
	document.getElementById("WylosowanaWartosc").innerText = wartoscLitery;
}

window.onload = start;

var litery = new Array(26);


litery[0] = "B";
litery[1] = "C";
litery[2] = "Ć";
litery[3] = "D";
litery[4] = "F";
litery[5] = "G";
litery[6] = "H";
litery[7] = "J";
litery[8] = "K";
litery[9] = "L";
litery[10] = "Ł";
litery[11] = "M";
litery[12] = "N";
litery[13] = "Ń";
litery[14] = "P";
litery[15] = "Q";
litery[16] = "R";
litery[17] = "S";
litery[18] = "Ś";
litery[19] = "T";
litery[20] = "V";
litery[21] = "W";
litery[22] = "Y";
litery[23] = "Z";
litery[24] = "Ż";
litery[25] = "Ź";

let samogloski =  new Array(34);
samogloski[26] = "A";
samogloski[27] = "Ą";
samogloski[28] = "E";
samogloski[29] = "Ę";
samogloski[30] = "I";
samogloski[31] = "O";
samogloski[32] = "Ó";
samogloski[33] = "U";
samogloski[34] = "Y";
 


function start()
{
	losujWartoscLitery();
	document.getElementById("stanKonta").innerText = stanKonta;
	var tresc_diva ="";
	var tresc_diva2 ="";
	
	for (i=0; i<=25; i++)
	{
		var element = "lit" + i;
		tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>';
		if ((i+1) % 7 ==0) tresc_diva = tresc_diva + '<div style="clear:both;"></div>';
	}
	for (i=26; i<=34; i++)
	{
		var elementy = "lit" + i;
		tresc_diva2 = tresc_diva2 + '<div class="literas" onclick="sprawdz('+i+')" id="'+elementy+'">'+samogloski[i]+'</div>';
		if ((i-25) % 7 ==0) tresc_diva2 = tresc_diva2 + '<div style="clear:both;"></div>';
	}
	document.getElementById("alfabet").innerHTML = tresc_diva;
	document.getElementById("samogloski").innerHTML = tresc_diva2;
	
	
	wypisz_haslo();
}

String.prototype.ustawZnak = function(miejsce, znak)
{
	if (miejsce > this.length - 1) return this.toString();
	else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
}

function wyslijOdpowiedz(){
	let wyslanaOdpowiedz = document.getElementById("Odpowiedz").value;
	wyslanaOdpowiedz = wyslanaOdpowiedz.toUpperCase();
	if(wyslanaOdpowiedz == haslo){
		document.getElementById("alfabet").innerHTML  = "ROZBROIŁEŚ BOMBĘ! Podano prawidłowe hasło: "+haslo+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
		document.getElementById("ileHajsu").innerHTML = " ";
		document.getElementById("samogloski").innerHTML = " ";
		sukces.play();
	}
	else{
		document.getElementById("alfabet").innerHTML  = "JUŻ PO NAS! Prawidłowe hasło: "+haslo+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
		document.getElementById("ileHajsu").innerHTML = " ";
		document.getElementById("samogloski").innerHTML = " ";
		var obraz = "img/bomba9.jpg";
		document.getElementById("bomba").innerHTML = '<img src="'+obraz+'" alt="xx" />';
		eksplozja.play();
	}
}

//ilość trafiionych liczb
let iloscTrafien = 0;
let cenaSamogloski = 250;

function sprawdz(nr)
{
	
	var trafiona = false;
	for(i=0; i<dlugosc; i++)
	{
		if (haslo.charAt(i) == litery[nr] && nr <= 25) 
		{
			haslo1 = haslo1.ustawZnak(i,litery[nr]);
			trafiona = true;
			iloscTrafien++;
		}
		if(stanKonta >= cenaSamogloski){
			if (haslo.charAt(i) == samogloski[nr] ) 
			{
				haslo1 = haslo1.ustawZnak(i,samogloski[nr]);
				trafiona = true;
				iloscTrafien++;
				
			}
		}
	}
	//kod odpowiedzialny za zmiana stylu po kliknieciu w litery
	if(trafiona == true && nr <= 25)
	{
		yes.play();
		stanKonta = stanKonta + wartoscLitery*iloscTrafien;
		iloscTrafien - 0;
		document.getElementById("stanKonta").innerText = stanKonta;
		losujWartoscLitery();
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		console.log(nr);
		wypisz_haslo();
	}
	else if(trafiona == true && nr > 25 && stanKonta >= cenaSamogloski)
	{
		yes.play();
		stanKonta = stanKonta - cenaSamogloski;
		iloscTrafien - 0;
		document.getElementById("stanKonta").innerText = stanKonta;
		losujWartoscLitery();
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		console.log(nr);
		wypisz_haslo();
	}
	else if(trafiona == true && nr > 25 && stanKonta < cenaSamogloski){
		alert("Nie masz wystarczającej ilości Punktów :(");
	}

	else if(trafiona == false && nr <= 25)
	{
		no.play();
		stanKonta = stanKonta - wartoscLitery * 2;
		iloscTrafien = 0;
		document.getElementById("stanKonta").innerText = stanKonta;
		losujWartoscLitery();
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";	
		document.getElementById(element).setAttribute("onclick",";");	
			
		//skucha
		ile_skuch++;
		var obraz = "img/bomba"+ ile_skuch + ".jpg";
		document.getElementById("bomba").innerHTML = '<img src="'+obraz+'" alt="xx" />';
	}
	else if(trafiona == false && nr > 25 && stanKonta >= cenaSamogloski )
	{
		no.play();
		stanKonta = stanKonta - cenaSamogloski
		iloscTrafien = 0;
		document.getElementById("stanKonta").innerText = stanKonta;
		losujWartoscLitery();
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";	
		document.getElementById(element).setAttribute("onclick",";");	
			
		//skucha
		ile_skuch++;
		var obraz = "img/bomba"+ ile_skuch + ".jpg";
		document.getElementById("bomba").innerHTML = '<img src="'+obraz+'" alt="xx" />';
	}
	else if(trafiona == false && nr > 25 && stanKonta < cenaSamogloski){
		alert("Nie masz wystarczającej ilości Punktów :(");
	}

	
	//wygrana
	if (haslo == haslo1){
	document.getElementById("alfabet").innerHTML  = "ROZBROIŁEŚ BOMBĘ! Podano prawidłowe hasło: "+haslo+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
	sukces.play();
	}
	//przegrana
	if (ile_skuch>=9)
	{
	document.getElementById("alfabet").innerHTML  = "JUŻ PO NAS! Prawidłowe hasło: "+haslo+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
	eksplozja.play();
	}
	iloscTrafien = 0;
	
}
