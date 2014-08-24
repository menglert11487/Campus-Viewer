Collision = {};
Collision.Plane;
Collision.Gbuild;
Collision.Ebuild;
Collision.Cbuild;
Collision.OldMensa;
Collision.Ssc;
Collision.Mensa;
Collision.Bib;
Collision.Denkmal;
Collision.CurrentCameraPos;
oldCameraPosition =  null;
Collision.BuildingList = [];


Collision.onLoad = function(){
    Collision.Plane = document.getElementById("plane");
	Collision.Gbuild = document.getElementById("gbuild");
	// Collision.Ebuild = document.getElementById("ebuild");
	// Collision.Cbuild = document.getElementById("cbuild");
	// Collision.OldMensa = document.getElementById("oldMensa");
	// Collision.Ssc = document.getElementById("ssc");
	// Collision.Mensa = document.getElementById("mensa");
	// Collision.Bib = document.getElementById("bib");
	// Collision.Denkmal = document.getElementById("denkmal");
	Collision.BuildingList.push(Collision.Gbuild);
	// Collision.BuildingList.push(Collision.Ebuild);
	// Collision.BuildingList.push(Collision.Cbuild);
	// Collision.BuildingList.push(Collision.OldMensa);
	// Collision.BuildingList.push(Collision.Ssc);
	// Collision.BuildingList.push(Collision.Mensa);
	// Collision.BuildingList.push(Collision.Bib);
	// Collision.BuildingList.push(Collision.Denkmal);
//    Collision.HighlightBBox(Collision.Plane, false);
//	Collision.HighlightBBox(Collision.Gbuild, true);
//	Collision.HighlightBBox(Collision.Ebuild, false);
};


Collision.CalculateCameraPosition = function() {
    var highlightNode = document.getElementById("camera");
    var cameraMatrix = highlightNode._x3domNode._nameSpace.doc._viewarea._last_mat_view.inverse();

    return cameraMatrix.e3();
};

Collision.CalculateObjectBBox = function(highlightNode) {
	var volume = highlightNode._x3domNode.getVolume();
	var transform = highlightNode._x3domNode._graph.globalMatrix;
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


Collision.Render = function(object){
	for (var i = 0; i < Collision.BuildingList.length; i++) { 
		if (Collision.RenderObj(Collision.BuildingList[i])) {
			// document.getElementById("camera").setAttribute('position', (Collision.CurrentCameraPos.x + 5) + " " + Collision.CurrentCameraPos.y + " " + (Collision.CurrentCameraPos.z));
			document.getElementById("camera").setAttribute('position', (oldCameraPosition.x) + " " + oldCameraPosition.y + " " + (oldCameraPosition.z));
			break;
		}
	}
	oldCameraPosition = Collision.CurrentCameraPos;
};

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