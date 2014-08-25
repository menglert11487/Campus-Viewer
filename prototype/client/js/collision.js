Collision = {};
Collision.Plane;
Collision.Top;
Collision.Down;
Collision.Left;
Collision.Right;
Collision.Gbuild;
Collision.Gbuild2;
Collision.Gbuild3;
Collision.Ebuild;
Collision.Ebuild2;
Collision.Ebuild3;
Collision.Ebuild4;
Collision.Cbuild;
Collision.AlteMensa;
Collision.Pfosten1;
Collision.Pfosten2;
Collision.Pfosten3;
Collision.Pfosten4;
Collision.Pfosten5;
Collision.Pfosten6;
Collision.Pfosten7;
Collision.Pfosten8;
Collision.Ssc;
Collision.Mensa;
Collision.Bib;
Collision.Denkmal;
Collision.Baum1;
Collision.Baum2;
Collision.Baum3;
Collision.Baum4;
Collision.Baum5;
Collision.Baum6;
Collision.Baum7;
Collision.Baum8;
Collision.Baumbib1;
Collision.Baumbib2;
Collision.Baumbib3;
Collision.Baumbib4;
Collision.Baumbib5;
Collision.Baumbib6;
Collision.Baumbib7;
Collision.Baumbib8;
Collision.CurrentCameraPos;
oldCameraPosition =  null;
Collision.BuildingList = [];


Collision.onLoad = function(){
	//Objekte über ID holen aus der Index.
    Collision.Plane = document.getElementById("plane");
    Collision.Top = document.getElementById("top");
    Collision.Down = document.getElementById("down");
    Collision.Left = document.getElementById("left");
    Collision.Right = document.getElementById("right");
	Collision.Gbuild = document.getElementById("gbuild");
	Collision.Gbuild2 = document.getElementById("gbuild2");
	Collision.Gbuild3 = document.getElementById("gbuild3");
	Collision.Ebuild = document.getElementById("ebuild");
	Collision.Ebuild2 = document.getElementById("ebuild2");
	Collision.Ebuild3 = document.getElementById("ebuild3");
	Collision.Ebuild4 = document.getElementById("ebuild4");
	Collision.Cbuild = document.getElementById("cbuild");
	Collision.alteMensa = document.getElementById("alteMensa");
	Collision.Pfosten1 = document.getElementById("pfosten1");
	Collision.Pfosten2 = document.getElementById("pfosten2");
	Collision.Pfosten3 = document.getElementById("pfosten3");
	Collision.Pfosten4 = document.getElementById("pfosten4");
	Collision.Pfosten5 = document.getElementById("pfosten5");
	Collision.Pfosten6 = document.getElementById("pfosten6");
	Collision.Pfosten7 = document.getElementById("pfosten7");
	Collision.Pfosten8 = document.getElementById("pfosten8");
	Collision.Ssc = document.getElementById("ssc");
	Collision.Mensa = document.getElementById("mensa");
	Collision.Bib = document.getElementById("bib");
	Collision.Denkmal = document.getElementById("denkmal");
	Collision.Baum1 = document.getElementById("baum1");
	Collision.Baum2 = document.getElementById("baum2");
	Collision.Baum3 = document.getElementById("baum3");
	Collision.Baum4 = document.getElementById("baum4");
	Collision.Baum5 = document.getElementById("baum5");
	Collision.Baum6 = document.getElementById("baum6");
	Collision.Baum7 = document.getElementById("baum7");
	Collision.Baum8 = document.getElementById("baum8");
	Collision.Baumbib1 = document.getElementById("baumbib1");
	Collision.Baumbib2 = document.getElementById("baumbib2");
	Collision.Baumbib3 = document.getElementById("baumbib3");
	Collision.Baumbib4 = document.getElementById("baumbib4");
	Collision.Baumbib5 = document.getElementById("baumbib5");
	Collision.Baumbib6 = document.getElementById("baumbib6");
	Collision.Baumbib7 = document.getElementById("baumbib7");
	Collision.Baumbib8 = document.getElementById("baumbib8");
	
	// Objekte in Array pushen
	Collision.BuildingList.push(Collision.Top);
	Collision.BuildingList.push(Collision.Down);
	Collision.BuildingList.push(Collision.Left);
	Collision.BuildingList.push(Collision.Right);
	Collision.BuildingList.push(Collision.Gbuild);
	Collision.BuildingList.push(Collision.Gbuild2);
	Collision.BuildingList.push(Collision.Gbuild3);
	Collision.BuildingList.push(Collision.Ebuild);
	Collision.BuildingList.push(Collision.Ebuild2);
	Collision.BuildingList.push(Collision.Ebuild3);
	Collision.BuildingList.push(Collision.Ebuild4);
	Collision.BuildingList.push(Collision.Cbuild);
	Collision.BuildingList.push(Collision.alteMensa);
	Collision.BuildingList.push(Collision.Pfosten1);
	Collision.BuildingList.push(Collision.Pfosten2);
	Collision.BuildingList.push(Collision.Pfosten3);
	Collision.BuildingList.push(Collision.Pfosten4);
	Collision.BuildingList.push(Collision.Pfosten5);
	Collision.BuildingList.push(Collision.Pfosten6);
	Collision.BuildingList.push(Collision.Pfosten7);
	Collision.BuildingList.push(Collision.Pfosten8);
	Collision.BuildingList.push(Collision.Ssc);
	Collision.BuildingList.push(Collision.Mensa);
	Collision.BuildingList.push(Collision.Bib);
	Collision.BuildingList.push(Collision.Denkmal);
	Collision.BuildingList.push(Collision.Baum1);
	Collision.BuildingList.push(Collision.Baum2);
	Collision.BuildingList.push(Collision.Baum3);
	Collision.BuildingList.push(Collision.Baum4);
	Collision.BuildingList.push(Collision.Baum5);
	Collision.BuildingList.push(Collision.Baum6);
	Collision.BuildingList.push(Collision.Baum7);
	Collision.BuildingList.push(Collision.Baum8);
	Collision.BuildingList.push(Collision.Baumbib1);
	Collision.BuildingList.push(Collision.Baumbib2);
	Collision.BuildingList.push(Collision.Baumbib3);
	Collision.BuildingList.push(Collision.Baumbib4);
	Collision.BuildingList.push(Collision.Baumbib5);
	Collision.BuildingList.push(Collision.Baumbib6);
	Collision.BuildingList.push(Collision.Baumbib7);
	Collision.BuildingList.push(Collision.Baumbib8);
};

// Funktion berechnet die Position der Kamera
Collision.CalculateCameraPosition = function() {
    var highlightNode = document.getElementById("camera");
    var cameraMatrix = highlightNode._x3domNode._nameSpace.doc._viewarea._last_mat_view.inverse();

    return cameraMatrix.e3();
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

// Funktion prüft welches Gebäude/Objekt gerade mit der Kamera kollidiert
Collision.Render = function(object){
	
	for (var i = 0; i < Collision.BuildingList.length; i++) { 
		if (Collision.RenderObj(Collision.BuildingList[i])) {
			document.getElementById("camera").setAttribute('position', (oldCameraPosition.x) + " " + oldCameraPosition.y + " " + (oldCameraPosition.z));
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