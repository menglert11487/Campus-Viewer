Navigation = {};
Navigation.Activated = false;
Navigation.Camera;
Navigation.Control;
Navigation.Pointer;
Navigation.ViewState;
Navigation.Position = {
    x: 0,
    y: 0
};
Navigation.Rotation = {
	x: 0, 
	y: 0
};
Navigation.RotationActivated = false;


Navigation.onLoad = function() {
	
    Navigation.Camera = document.getElementById("camera");
    Navigation.Control = document.getElementById("control");
    Navigation.Pointer = document.getElementById("pointer");

								
	Navigation.x3d = document.getElementById("x3d_element");
	
	Navigation.x3d.addEventListener(
        "mousedown",
        function(event) {
			Navigation.RotationActivated = true;
			Navigation.Rotation.x = event.layerX;
			Navigation.Rotation.y = event.layerY;
			//event.stopPropagation();
        },
        true);
	
	Navigation.x3d.addEventListener(
        "mousemove",
        function(event) {
            if(Navigation.RotationActivated){
				
				var xChange = Navigation.Rotation.x - event.layerX;
				var yChange = Navigation.Rotation.y - event.layerY;
				
				var speedlimit = 0.001;
				Navigation.ViewState.RotateView(yChange * speedlimit,xChange * speedlimit);
				NavigationAPI.SetView(Navigation.ViewState.ViewMatrix);
				NavigationAPI.Render();
				Navigation.Rotation.x = event.layerX;
				Navigation.Rotation.y = event.layerY;
			
			} 
			//event.stopPropagation();
        },
        true);
		
	Navigation.x3d.addEventListener(
        "mouseup",
        function(event) {
            Navigation.RotationActivated = false;
        },
        true);
	
    Navigation.Middle = {
        top: (Navigation.Control.clientHeight / 2.0),			//Steuerknüppel wird zurück in die Mitte gesetzt
        left: (Navigation.Control.clientWidth / 2.0)
    }
	

    control.addEventListener(
        "mousedown",
        function(event) {
            Navigation.Activated = true;
            Navigation.Position.x = event.layerX;
            Navigation.Position.y = event.layerY;
            Navigation.Pointer.style.left = (event.layerX - 25) + "px";
            Navigation.Pointer.style.top = (event.layerY - 25) + "px";
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
			var speed = 0.025;
			var halfWidth = (control.clientWidth / 2.0);
			var halfHeight = (control.clientHeight / 2.0);
			var facX = -(0.3 / halfWidth * (-halfWidth + Navigation.Position.x));
			var facZ = -(0.3 / halfHeight * (-halfHeight + Navigation.Position.y));    
			Navigation.ViewState.TranslateView(new x3dom.fields.SFVec3f(facX, 0.0, facZ));
			//Navigation.Rotation.ViewState.RotateView(facY * speed, facX * speed);
			NavigationAPI.SetView(Navigation.ViewState.ViewMatrix);
			NavigationAPI.Render();
		}
};

	// Navigation.Render = function (){
		// if(Navigation.RotationActivated){
			// var speedlimit = 0.025;
			// var rotWidth = (Navigation.x3d.clientWidth / 2.0);
			// var rotHeight = (Navigation.x3d.clientHeight / 2.0);
			// var rotX = (1.0 / rotWidth * (rotWidth + Navigation.Rotation.x));
			// var rotY = (1.0 / rotHeight * (rotHeight + Navigation.Rotation.y));   
			// Navigation.ViewState.RotateView(rotY * speedlimit, rotX * speedlimit);
			// NavigationAPI.SetView(Navigation.ViewState.ViewMatrix);
			// NavigationAPI.Render();
		
		// }
	// }

               





