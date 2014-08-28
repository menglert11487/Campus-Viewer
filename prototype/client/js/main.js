function switchCamera(id) {
    var vp = document.getElementById(id);
	var resPos = vp.position.split(" ");
	var resOri = vp.orientation.split(" ");
	var camPosition = new x3dom.fields.SFVec3f(-1*resPos[0], -1*resPos[1], -1*resPos[2]);
	var camOrientation = new x3dom.fields.SFVec2f(parseFloat(resOri[0]), parseFloat(resOri[1]));
	Navigation.ViewState = new Viewstate(camPosition, camOrientation);
	NavigationAPI.SetCamera("camera");								
	NavigationAPI.SetViewState(Navigation.ViewState);
	NavigationAPI.Render();
}

function openDoor(door){
	console.log(NavigationAPI.getPosition());
}