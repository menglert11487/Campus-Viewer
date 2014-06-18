Navigation = {};
Navigation.Activated = false;
Navigation.Camera;
Navigation.Control;
Navigation.Pointer;
Navigation.Position = {
    x: 0,
    y: 0
};

Navigation.onLoad = function() {
    Navigation.Camera = document.getElementById("camera");
    Navigation.Control = document.getElementById("control");
    Navigation.Pointer = document.getElementById("pointer");
    Navigation.Position = {
        x: 0,
        y: 0
    };
    Navigation.Middle = {
        top: (Navigation.Control.clientHeight / 2.0),
        left: (Navigation.Control.clientWidth / 2.0)
    }

    Navigation.ChangeSpeed();

    control.addEventListener(
        "mousedown",
        function(event) {
            Navigation.Activated = true;
            Navigation.Position.x = event.layerX;
            Navigation.Position.y = event.layerY;
            Navigation.Pointer.style.left = event.layerX + "px";
            Navigation.Pointer.style.top = event.layerY + "px";
        },
        true);

    control.addEventListener(
        "mouseleave",
        function(event) {
            Navigation.Activated = false;
            Navigation.Position.x = 0;
            Navigation.Position.y = 0;
            Navigation.Pointer.style.left = (Navigation.Middle.left - (Navigation.Pointer.clientWidth / 2.0)) + "px";
            Navigation.Pointer.style.top = (Navigation.Middle.top - (Navigation.Pointer.clientHeight / 2.0)) + "px";
            event.stopPropagation();
        },
        true);

    control.addEventListener(
        "mouseup",
        function(event) {
            Navigation.Activated = false;
            Navigation.Position.x = 0;
            Navigation.Position.y = 0;
            Navigation.Pointer.style.left = (Navigation.Middle.left - (Navigation.Pointer.clientWidth / 2.0)) + "px";
            Navigation.Pointer.style.top = (Navigation.Middle.top - (Navigation.Pointer.clientHeight / 2.0)) + "px";
            event.stopPropagation();
        },
        true);

    control.addEventListener(
        "mousemove",
        function(event) {
            if (Navigation.Activated) {
                Navigation.Position.x = event.layerX;
                Navigation.Position.y = event.layerY;
                Navigation.Pointer.style.left = (event.layerX - 25) + "px";
                Navigation.Pointer.style.top = (event.layerY - 25) + "px";
                event.stopPropagation();
            }
        },
        true);
};

Navigation.Render = function() {
    if (Navigation.Activated) {
        var currentPosition = x3dom.fields.SFVec3f.parse(Navigation.Camera.getAttribute("position"));
        var facX = -(1.0 / Navigation.Middle.left * (-Navigation.Middle.left + Navigation.Position.x));
        var facY = 1.0 / Navigation.Middle.top * (-Navigation.Middle.top + Navigation.Position.y);
        currentPosition.x += facX;
        currentPosition.y += facY;
        Navigation.Camera.setAttribute("position", currentPosition.toString());
    }
};

Navigation.ChangeSpeed = function() {
    var x = document.getElementById("x3d_element");
    var y = document.changeSpeed.speed.value;
    if (y === null) {
        y = 20;
    }
    x.runtime.speed(y);
};