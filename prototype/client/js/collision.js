Collision = {};
Collision.CurrentCameraPos;
oldCameraPosition =  null;
Collision.BuildingList = [];
Collision.DoorList = [];

//Inhalte dieser Funktion werden bei onLoad ausgeführt
Collision.onLoad = function(){	
};

// Diese Funktion füllt das Array für um Kollision mit Objekten abzufragen
Collision.AddCollisionObject = function(object){
	Collision.BuildingList.push(object);
}
// Diese Funktion füllt das Array für um Kollision mit Türen abzufragen
Collision.AddCollisionDoor = function(object){
	Collision.DoorList.push(object);
}

// Funktion berechnet die Position der Kamera
Collision.CalculateCameraPosition = function() {
    return Navigation.ViewState.ViewMatrix.e3();
};

// Funktion berechnet die BoundingBox eines Objektes
Collision.CalculateObjectBBox = function(highlightNode) {
	var volume = highlightNode._x3domNode.getVolume();
	var transform = highlightNode._x3domNode._graph.globalMatrix;
	var bbox = {};
	bbox.min = transform.multMatrixPnt(volume.min);
	bbox.max = transform.multMatrixPnt(volume.max);
    return bbox;
};

// Funktion berechnet die Größe der BBox eines Objektes
Collision.HighlightBBox = function(highlightNode, bool) {
    var highlightBox = document.getElementById('bbox_transform');
    var transformNode = highlightNode.parentNode;
    var currentHighlightParent = highlightBox.parentNode;
    var volume;
    var min;
    var max;
    var box;

    if (highlightNode) {
        volume = highlightNode._x3domNode.getVolume();

        if (volume) {
            min = x3dom.fields.SFVec3f.copy(volume.min);
            max = x3dom.fields.SFVec3f.copy(volume.max);

            box = document.getElementById('bbox_points');
            box.setAttribute('point', min.x + ' ' + min.y + ' ' + min.z + ', ' +
                    min.x + ' ' + min.y + ' ' + max.z + ', ' +
                    max.x + ' ' + min.y + ' ' + max.z + ', ' +
                    max.x + ' ' + min.y + ' ' + min.z + ', ' +
                    min.x + ' ' + max.y + ' ' + min.z + ', ' +
                    min.x + ' ' + max.y + ' ' + max.z + ', ' +
                    max.x + ' ' + max.y + ' ' + max.z + ', ' +
                    max.x + ' ' + max.y + ' ' + min.z);
        }
    }
    currentHighlightParent.removeChild(highlightBox);
    transformNode.appendChild(highlightBox);

    highlightBox.setAttribute("render", "" + bool);
};

// Funktion prüft welches Gebäude/Objekt gerade mit der Kamera kollidiert und setzt die Kamera dementsprechend zurück
Collision.Render = function(object){
	//Kollision Check mit Türen um reinzulaufen
	for (var i = 0; i < Collision.DoorList.length; i++) { 
		if (Collision.RenderObj(Collision.DoorList[i])) {
			window.location = Collision.DoorList[i].getAttribute("url");
			break;
		}
	}
	for (var i = 0; i < Collision.BuildingList.length; i++) { 
		if (Collision.RenderObj(Collision.BuildingList[i])) {
			var speed = 0.025;
			var halfWidth = (control.clientWidth / 2.0);
			var halfHeight = (control.clientHeight / 2.0);
			var facX = -(1.0 / halfWidth * (-halfWidth + Navigation.Position.x));
			var facZ = -(1.0 / halfHeight * (-halfHeight + Navigation.Position.y));    
			Navigation.ViewState.TranslateView(new x3dom.fields.SFVec3f(-2.0*facX, 0.0, -2.0*facZ));
			NavigationAPI.SetView(Navigation.ViewState.ViewMatrix);
			NavigationAPI.Render();
			break;
		}
	}
	oldCameraPosition = Collision.CurrentCameraPos;
};

// Funktion prüft von welcher Seite eine Kollision mit einem Objekt entsteht entsteht
Collision.RenderObj = function(object)
{
	var objectBBox = Collision.CalculateObjectBBox(object);
	
	if((Collision.CurrentCameraPos.x < objectBBox.max.x && Collision.CurrentCameraPos.x > objectBBox.min.x) &&
		(Collision.CurrentCameraPos.y < objectBBox.max.y && Collision.CurrentCameraPos.y > objectBBox.min.y) &&
		(Collision.CurrentCameraPos.z < objectBBox.max.z && Collision.CurrentCameraPos.z > objectBBox.min.z))
	{
		return true;
	}
	return false;
};