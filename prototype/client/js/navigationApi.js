/**
 * Defines a camera state object that contains the view and projection matrix
 * @param translation Vector to position the camera
 * @returns {Viewstate}
 */
Viewstate = function(translation, rotation) {
    /**
     * Reference to the Viewstate object itself
     * @type Viewstate
     */
    var that = this;
    
    /**
     * Translation vector that represents the position of the view
     * @type x3dom.fields.SFVec3f
     */
    var translationVector = new x3dom.fields.SFVec3f(0, 0, 0);
    
    /**
     * Rotation of the camera in x and y direction
     * @type x3dom.fields.SFVec2f
     */
    var rotationXY = new x3dom.fields.SFVec2f(0.0, 0.0);
    
    /**
     * @param viewMatrix ViewMatrix that represents the camera's 
     * orientation and position
     */
    this.ViewMatrix;
    
    /**
     * @param projectionMatrix ProjectionMatrix that defines the 
     * projection of the camera
     */
    this.ProjectionMatrix;
    
    /**
     * Initializes the Viewstate object
     * @param translationVec Vector to position the camera
     * @returns {Viewstate.Initialize}
     */
    Initialize = function(translationVec, rotationVec) {
        // Calculate initial ViewMatrix        
        translationVector = translationVec;
        rotationXY = rotationVec;
        var rotX = x3dom.fields.SFMatrix4f.rotationY(rotationXY.y);
        var rotY = x3dom.fields.SFMatrix4f.rotationX(rotationXY.x);
        var pos = x3dom.fields.SFMatrix4f.translation(translationVector);
        //that.ViewMatrix = pos.mult(rotX.mult(rotY)).inverse();
		that.ViewMatrix = rotY.mult(rotX.mult(pos)).inverse();
        
        var aspect = window.innerWidth / window.innerHeight;
        that.ProjectionMatrix = x3dom.fields.SFMatrix4f.perspective(
            1.22, aspect, 0.1, 10000.0
        );
    };
    
    /**
     * Adds the given translation to the current ViewMatrix 
     * @param {x3dom.fields.SFVec3f} translation
     * @returns {void}
     */
    this.TranslateView = function(translation) { 
		var rotX = x3dom.fields.SFMatrix4f.rotationY(rotationXY.y);
        var rotY = x3dom.fields.SFMatrix4f.rotationX(rotationXY.x);
		translation = rotX.inverse().multMatrixPnt(translation);
        translationVector = translationVector.add(translation);
        var pos = x3dom.fields.SFMatrix4f.translation(translationVector);
        //that.ViewMatrix = pos.mult(rotX.mult(rotY)).inverse();
		that.ViewMatrix = rotY.mult(rotX.mult(pos)).inverse();
    };
    
    /**
     * Adds the given angles to the current ViewMatrix
     * @param {number} xAngle
     * @param {number} yAngle
     * @returns {void}
     */
    this.RotateView = function(xAngle, yAngle) {
        rotationXY.x += xAngle;
        rotationXY.y += yAngle;
        var rotX = x3dom.fields.SFMatrix4f.rotationY(rotationXY.y);
        var rotY = x3dom.fields.SFMatrix4f.rotationX(rotationXY.x);
        var pos = x3dom.fields.SFMatrix4f.translation(translationVector);
        //that.ViewMatrix = pos.mult(rotX.mult(rotY)).inverse();
		that.ViewMatrix = rotY.mult(rotX.mult(pos)).inverse();
    };
    
    // Initializes the Viewstate
    Initialize(translation, rotation);
};

/**
 * Functions to manipulate the x3dom camera  
 * @type type
 */
var NavigationAPI = {};

/**
 * Camera HTML Element that should be changed
 * @type String
 */
NavigationAPI.Camera; 

/**
 * Sets the camera using the CameraID
 * @param cameraID ID of the camera's HTML Element
 * @type String
 */
NavigationAPI.SetCamera = function(cameraID) {
    this.Camera = document.getElementById(cameraID);
};

/**
 * Sets the complete Viewstate including view and projection matrix
 * @param {type} viewState Viewstate object
 * @returns {void}
 */
NavigationAPI.SetViewState = function(viewState) {
    this.SetView(viewState.ViewMatrix);
    this.SetProjection(viewState.ProjectionMatrix);
};

/**
 * Sets a new view matrix to the camera
 * @param {type} view ViewMatrix that should be set
 * @returns {void}
 */
NavigationAPI.SetView = function(view) {
    this.Camera._x3domNode._viewMatrix = view.inverse();
};

/**
 * Sets a new projection matrix to the camera
 * @param {type} projection ProjectionMatrix that should be set
 * @returns {void}
 */
NavigationAPI.SetProjection = function(projection) {
    this.Camera._x3domNode._projMatrix = projection;
};

/**
 * Triggers a Rendering in the next frame. Should be utilized
 * if a rendering isn't done automatically
 * @returns void
 */
NavigationAPI.Render = function() {
    var x3d = document.getElementsByTagName("x3d")[0];
    x3d.children[0]._x3domNode._nameSpace.doc.needRender = true;
};