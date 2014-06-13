/**
 * Defines a camera state object that contains the view and projection matrix
 * @param translation Vector to position the camera
 * @returns {Viewstate}
 */
Viewstate = function(translation) {
    /**
     * Reference to the Viewstate object itself
     * @type Viewstate
     */
    var that = this;
    
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
    Initialize = function(translationVec) {
        // Calculate initial ViewMatrix        
        var rotX = x3dom.fields.SFMatrix4f.rotationY(1.57);
        var rotY = x3dom.fields.SFMatrix4f.rotationX(0.0);
        var pos = x3dom.fields.SFMatrix4f.translation(translationVec);
        that.ViewMatrix = pos.mult(rotX.mult(rotY)).inverse();
        
        var aspect = window.innerWidth / window.innerHeight;
        that.ProjectionMatrix = x3dom.fields.SFMatrix4f.perspective(
            1.22, aspect, 0.1, 10000.0
        );
    };
    
    this.ChangeView = function(translation) {    
        var rotX = x3dom.fields.SFMatrix4f.rotationY(1.57);
        var rotY = x3dom.fields.SFMatrix4f.rotationX(0.0);
        var pos = x3dom.fields.SFMatrix4f.translation(translation);
        that.ViewMatrix = pos.mult(rotX.mult(rotY)).inverse();
    };
    
    // Initializes the Viewstate
    Initialize(translation);
}

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