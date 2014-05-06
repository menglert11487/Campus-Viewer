window.onload = function() {
    var camera = document.getElementById("camera");
    var control = document.getElementById("control");
    var pointer = document.getElementById("pointer");
    var activated = false;
    var position = {x: 0, y: 0};

    control.addEventListener(
        "mousedown", 
        function(event){
            activated = true;
            position.x = event.layerX;
            position.y = event.layerY;
            pointer.style.left = event.layerX + "px";
            pointer.style.top = event.layerY + "px";
        }, 
        true);

    control.addEventListener(
        "mouseleave", 
        function(event){
            activated = false;
            position.x = 0;
            position.y = 0;
            pointer.style.left = "100px";
            pointer.style.top = "100px";
            event.stopPropagation();
        }, 
        true);

    control.addEventListener(
        "mouseup", 
        function(event){
            activated = false;
            position.x = 0;
            position.y = 0;
            pointer.style.left = "100px";
            pointer.style.top = "100px";
            event.stopPropagation();
        }, 
        true);

    control.addEventListener(
        "mousemove", 
        function(event){
            if (activated) {
                console.log(event.target.parentNode.offsetLeft + " " + event.target.parentNode.offsetTop);
                position.x = event.layerX;
                position.y = event.layerY;
                pointer.style.left = (event.layerX - 25) + "px";
                pointer.style.top = (event.layerY - 25) + "px";
                event.stopPropagation();
            }
        }, 
        true);

    function tick() {
        if (activated) {
            var currentPosition = x3dom.fields.SFVec3f.parse(camera.getAttribute("position"));
            var halfWidth = (control.clientWidth / 2.0);
            var halfHeight = (control.clientHeight / 2.0);
            var facX = -(1.0 / halfWidth * (-halfWidth + position.x));
            var facY = 1.0 / halfHeight * (-halfHeight + position.y);
            currentPosition.x += facX;
            currentPosition.y += facY;
            camera.setAttribute("position", currentPosition.toString());
        }

        window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
};

function switchCamera(id){
	var vp = document.getElementById(id);
	vp.setAttribute("set_bind","true");
	
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

