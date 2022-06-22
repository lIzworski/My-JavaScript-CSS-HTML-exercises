		
var width = window.innerWidth,
	height = window.innerHeight,
	ratio = window.devicePixelRatio;
	
var x = width / 2;
	step = 0;
	vx = 10;
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-> OBAZY <-&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
var portal = new Image();
portal.src = "Portal-Sheet.png";
var stoje = new Image();
stoje.src = "stoje-Sheet.png";
var zLdoP = new Image();
zLdoP.src = "zLewejDoPrzodu-Sheet.png";
var zPdoL = new Image();
zPdoL.src = "zPrzoduDoLewej-Sheet.png";
var zPrdoP = new Image();
zPrdoP.src = "zPrawejDoPrzodu-Sheet.png";
var zPdoPr = new Image();
zPdoPr.src = "zPrzoduDoPrawej-Sheet.png";
var idePrawo = new Image();
idePrawo.src = "ZulPrawo.png";
var ideLewo = new Image();
ideLewo.src = "ZulLewo.png";

var sprites =  stoje
sprites.onload = animate;	

var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d");
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
canvas.width = width * ratio;
canvas.height = height * ratio;
canvas.style.width = width + "px";
canvas.style.height = height + "px";
context.scale(ratio, ratio);

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);
var leftKeyPress = false;
var rightKeyPress = false;

function keyPressed(evt){
	if(evt.keyCode == LEFT_KEY){
		leftKeyPress = true;
		//obrotZSrodkadoLewej();	
		movement();

	}
	if(evt.keyCode == RIGHT_KEY){
		rightKeyPress = true;
		//obrotZSrodkadoPrawej();
		movement();

	}
}
function keyReleased(evt){
	if(evt.keyCode == LEFT_KEY){
		leftKeyPress = false;
		//obrotZLewejdosrodka();
		movement();
		
	}
	if(evt.keyCode == RIGHT_KEY){
		rightKeyPress = false;
		//obrotZPrawejdosrodka();
		movement();

		
	}
}
function obrotZPrawejdosrodka(){
	sprites = zPrdoP;
}
function obrotZSrodkadoPrawej(){
	sprites = zPdoPr;
}
function obrotZLewejdosrodka(){
	sprites = zLdoP;
}
function obrotZSrodkadoLewej(){
	sprites = zPdoL;
}

function movement(){
	if(leftKeyPress == true){
		sprites = ideLewo;
		
	}
	if(rightKeyPress == true){
		sprites = idePrawo;
	}
	if(rightKeyPress == false && leftKeyPress == false){
		sprites = stoje;
		liczba = 0;
	}
}

function animate()
{
	draw();
	update();
	requestAnimationFrame(animate);
}

function draw()
{
	context.fillStyle = "#7F00FF";
	context.fillRect(0, 0, width, height);
	context.fillStyle = "#202020";
	context.fillRect(0, 300, width, height);
	context.fillStyle = "black";
	context.fillRect(0, 400, width, height);
	drawShell(x, height, Math.floor(step));				//!!!!
}		


function drawShell(x, y, step)
{
	context.drawImage(sprites, 64*step, 0, 64, 64, x, 150, 180, 180);
}


function update()
{
	
	if(sprites == stoje){
		step += 0.15;	
		if (step >= 10)
			step -= 10;
			x+= 0;
		if (x >= 1000 )
			x = 0;
	}
	if(sprites == zLdoP || sprites ==zPdoL || sprites == zPrdoP || sprites == zPdoPr)
	{
	    step += 0.15;	
		if (step >= 3)
			step -= 3;
		
		x+=0;
		if (x >= 1000)
			x = 0;	
	}
	if( sprites == ideLewo){
		step += 0.17;
		if (step >= 12 )
			step -= 12;
		
		x-=1.7;
		if (x >= 1000)
			x = 5;	
		if (x <= 0)
			x = 995
	}
	if(sprites == idePrawo ){
		step += 0.17;
		if (step >= 12)
			step -= 12;
		
		x+=1.7;
		if (x >= 1000)
			x = 0;	
		if (x <= 0)
			x = 1000
	}
}
	