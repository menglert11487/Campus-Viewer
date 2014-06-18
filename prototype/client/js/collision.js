
Collision = {};
Collision.Plane;
//Collision.Gbuild;

Collision.onLoad = function(){
    Collision.Plane = document.getElementById("plane");
//	Collision.Gbuild = document.getElementById("gbuild");
    Collision.HighlightBBox(Collision.Plane, true);
//	Collision.HighlightBBox(Collision.Gbuild, true);
};


Collision.CalculateCameraPosition = function() {
    var highlightNode = document.getElementById("camera");
    var cameraMatrix = highlightNode._x3domNode._nameSpace.doc._viewarea._last_mat_view.inverse();

    return cameraMatrix.e3();
};

Collision.CalculateObjectBBox = function(highlightNode) {
	var volume = Collision.Plane._x3domNode.getVolume();
//	var volume = Collision.Gbuild._x3domNode.getVolume();
	var transform = Collision.Plane._x3domNode._graph.globalMatrix;
//	var transform = Collision.Gbuild._x3domNode._graph.globalMatrix;
	var bbox = {};
	bbox.min = transform.multMatrixPnt(volume.min);
	bbox.max = transform.multMatrixPnt(volume.max);
    return bbox;
};

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


Collision.Render = function(){
    var cameraPos = Collision.CalculateCameraPosition();
    var objectBBox = Collision.CalculateObjectBBox();


// 	Äquator -> y-Achse, alles drüber ist ok, drunter nein
	if(cameraPos.y < objectBBox.max.y)
		document.getElementById("camera").setAttribute('position', cameraPos.x + " " + (objectBBox.max.y + 1) + " " + cameraPos.z);
//		console.log("HIT AN OBJECT");
// 	x-Rand -> max
	else if(cameraPos.x > objectBBox.max.x)
		document.getElementById("camera").setAttribute('position', (objectBBox.max.x - 5) + " " + cameraPos.y + " " + cameraPos.z);
//	 x-Rand -> min
	else if(cameraPos.x < objectBBox.min.x)
		document.getElementById("camera").setAttribute('position', (objectBBox.min.x + 5) + " " + cameraPos.y + " " + cameraPos.z);
// z-oben -> max
	else if(cameraPos.z > objectBBox.max.z)
		document.getElementById("camera").setAttribute('position', cameraPos.x + " " + cameraPos.y + " " + (objectBBox.max.z - 5));
// z-unten -> min
	else if(cameraPos.z < objectBBox.min.z)
		document.getElementById("camera").setAttribute('position', cameraPos.x + " " + cameraPos.y + " " + (objectBBox.min.z + 5));
//Koordinaten Anzeige (zur Überprüfung)
		document.getElementById("counter").innerHTML = "BBox-X: " + objectBBox.max.x + "/" + objectBBox.min.x + " ||| Camera-X: " + cameraPos.x + "<br>" + "BBox-Y: " + objectBBox.max.y + "/" + objectBBox.min.y + " ||| Camera-Y: " + cameraPos.y + "<br>" + "BBox-Z: " + objectBBox.max.z + "/" + objectBBox.min.z + " ||| Camera-Z: " + cameraPos.z;
};

// //Collision.RenderObj = function(GBuild){
// //    var cameraPos = Collision.CalculateCameraPosition();
// //    var objectBBox = Collision.CalculateObjectBBox();


// //	if(cameraPos.x > objectBBox.max.x)
// //		document.getElementById("camera").setAttribute('position', (objectBBox.max.x - 5) + " " + cameraPos.y + " " + cameraPos.z);
// // //	 x-Rand -> min
// //		else if(cameraPos.x < objectBBox.min.x)
// //			document.getElementById("camera").setAttribute('position', (objectBBox.min.x + 5) + " " + cameraPos.y + " " + cameraPos.z);
// // // z-oben -> max
// //		else if(cameraPos.z > objectBBox.max.z)
// //			document.getElementById("camera").setAttribute('position', cameraPos.x + " " + cameraPos.y + " " + (objectBBox.max.z - 5));
// // // z-unten -> min
// //		else if(cameraPos.z < objectBBox.min.z)
// //			document.getElementById("camera").setAttribute('position', cameraPos.x + " " + cameraPos.y + " " + (objectBBox.min.z + 5));
// // //Koordinaten Anzeige (zur Überprüfung)
// //			document.getElementById("counter").innerHTML = "BBox-X: " + objectBBox.max.x + "/" + objectBBox.min.x + " ||| Camera-X: " + cameraPos.x + "<br>" + "BBox-Y: " + objectBBox.max.y + "/" + objectBBox.min.y + " ||| Camera-Y: " + cameraPos.y + "<br>" + "BBox-Z: " + objectBBox.max.z + "/" + objectBBox.min.z + " ||| Camera-Z: " + cameraPos.z;
// //};