function switchCamera(id) {
    var vp = document.getElementById(id);
    var position = vp.position;
    var orientation = vp.orientation;
    //vp.setAttribute("set_bind","true");
    var camera = document.getElementById("camera");
    camera.setAttribute("position", position);
    camera.setAttribute("orientation", orientation);
}

function changeSpeed() {
    var x = document.getElementById("x3d_element");
    var y = document.changeSpeed.speed.value;
    if (y === null) {
        y = 20;
    }
    x.runtime.speed(y);
}

function lookArround() {
    var x = document.getElementById("x3d_element");
    x.runtime.speed(0.00001);
}