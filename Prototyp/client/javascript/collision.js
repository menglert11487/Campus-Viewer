
Collision = {};
Collision.Plane;

Collision.onLoad = function(){
    Collision.Plane = document.getElementById("plane");
    Collision.HighlightBBox(Collision.Plane, true);
};


Collision.CalculateCameraPosition = function() {
    var highlightNode = document.getElementById("camera");
    var cameraMatrix = highlightNode._x3domNode._nameSpace.doc._viewarea._last_mat_view.inverse();

    return cameraMatrix.e3();
};

Collision.CalculateObjectBBox = function(highlightNode) {
    return Collision.Plane._x3domNode.getVolume();
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
        //@todo: still open whether we should move "domNode" to the base class
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

    if ((cameraPos.x < objectBBox.max.x && cameraPos.x > objectBBox.min.x) &&
        (cameraPos.y < objectBBox.max.y && cameraPos.y > objectBBox.min.y) &&
        (cameraPos.z < objectBBox.max.z && cameraPos.z > objectBBox.min.z))
    {
        console.log("HIT AN OBJECT");
        //var cameraMatrix = highlightNode._x3domNode._nameSpace.doc._viewarea._last_mat_view.inverse();
        document.getElementById("counter").innerHTML = parseInt(document.getElementById("counter").innerHTML) + 1;

    }
};