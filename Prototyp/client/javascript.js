

var dragobjekt = null;
var dragx = 0;
var dragy = 0;
var posx = 0;
var posy = 0;
var start = null;


function draginit(){
    

    document.onmousemove = drag;
    document.onmouseup = dragstop;
    
    
}

function coords(){
    
    start = window.event.x && window.event.y;
    dragobjekt = start;
    
}


function dragstart(element){
    
    dragobjekt = element;
    dragx = posx - dragobjekt.offsetLeft;
    dragy = posy - dragobjekt.offsetTop;
    
}



function drag(ereignis){
    
     posx = document.onclick ? window.event.clientX : ereignis.pageX;
     posy = document.onclick ? window.event.clientY : ereignis.pageY;
        
    if(dragobjekt !== null) {
        dragobjekt.style.left = (posx - dragx) + "px";
        dragobjekt.style.top = (posy - dragy) + "px";
    }
    
}

function dragstop(e){
    
    
    posx = document.onclick ? window.event.clientX : e.pageX;
    posy = document.onclick ? window.event.clientY : e.pageY;
    
    if(dragobjekt !== null){
        
        dragobjekt = posx;
        dragobjekt = posy;
    }
    
    
}

function switchCamera(id){
	var vp = document.getElementById(id);
	var position = vp.position;
	var orientation = vp.orientation;
	//vp.setAttribute("set_bind","true");
	var camera = document.getElementById("camera");
	camera.setAttribute("position", position);
	camera.setAttribute("orientation", orientation);
}

function changeSpeed(){
	var x = document.getElementById("x3d_element");
	var y = document.changeSpeed.speed.value;
		if(y===null)
		{
			y=20;
		}
	x.runtime.speed(y);
}

function lookArround(){
	var x = document.getElementById("x3d_element");
	x.runtime.speed(0.00001);
}


