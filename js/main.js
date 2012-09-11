function init(){
	
	
	
	
	// Basic layout Elements
	var content =$('#mainframe');
	var header =$('#topbanner');
	var dataBox =$('#dataBox');
	
	/* views */
	var view_spot_object = null;
	var view_add_form	= null;


	var testData =[ ['a',12] , ['b',14] ];

	/* load views and save for parsing */
	dataBox.load('views.html',parseViews)
//------------------------


	
	function parseViews(){
		view_spot_object = $(this).find('#spot_object').clone();
		view_add_form = $(this).find('#add_form').clone();
		clearDataBox();
		
		buildFirst();	
	}

	function buildFirst(){
		var i= 0;
		
		var obj = null;

		try{

			while(testData[i]){
					obj = view_spot_object.clone();
					
					obj.find('.list_title').text(testData[i][0]);
					
					dataBox.append(obj.html());
					
					i++;
				}
			}
		catch(error){
					console.log('first build failed');
				}
		content.html(dataBox.html());
		
	//----- start testing capabilities
		checkAbilities();
	}
	function clearDataBox(){
		dataBox.html('');
	}
	function clearContentBox(){
		content.html('');
	}
	
	


	
	
	
//// -------------- TEST FUNCTIONS -------------------	
	
	var msgObj = null;
	
	function checkAbilities(){
		msgObj = $($('.spot_list_object')[0]);
				
		/// GeoLocation
		if (navigator.geolocation) {
		  var timeoutVal = 10 * 1000 * 1000;
		  var failgeo = failCB('geolocation failed')
		  navigator.geolocation.getCurrentPosition(
		    gelocation, 
		    failgeo,
		    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
		  );
		}
		else {
		 msgObj.append("Geolocation is not supported by this browser");
		}
		
		
		
		var fail = failCB('OpenFileSystem')
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);

	}
// Fail MSG
	var failCB = function (msg) {
		    return function () {
	         msgObj.append('[FAIL] ' + msg +'<br />');
	  		}
	 }
	 
//Geofunctions
	function gelocation(position) {
	 	msgObj.append(	'Latitude: '+ position.coords.latitude								+ '<br />' +
                        'Longitude: '          + position.coords.longitude             + '<br />' +
                        'Altitude: '           + position.coords.altitude              + '<br />' +
                        'Accuracy: '           + position.coords.accuracy              + '<br />' +
                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                        'Heading: '            + position.coords.heading               + '<br />' +
                        'Speed: '              + position.coords.speed                 + '<br />' +
                        'Timestamp: '          + position.timestamp          + '<br />'
                        );

	}
	
	
// access filesystem
    function onFileSystemSuccess(fileSystem) {
       msgObj.append('Filesystem Name:'+ fileSystem.name + '<br />' +
       		'Filesystem Root:'+ fileSystem.root.name+ '<br />' );

		// request file
	    var fail = failCB('getFile');
	    fs.root.getFile('henne.txt', {create: true, exclusive: false},
	                    gotFileEntry, fail);
	}
	
	var fileObj = null;
	var fReader = null;
	var fwriter = null;
	
	function gotFileEntry(fileEntry) {
		var fail = failCB('Failed in creating writer');
	    fileObj = fileEntry;
		fileEntry.createWriter(gotFileWriter, fail);
	}

	function gotFileWriter(fileWriter) {
	    fwriter = fileWriter;
	    fwriter.onwriteend= function(){
	    	readFile(fileObj);
	    };
	    fwriter.write('some Text that is soooo nice to read');
	    msgObj.append('text was written <br />');
	     
	}
	
	function readFile(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            msgObj.append("Read as data URL <br />");
            msgObj.append(evt.target.result);
        };
        reader.readAsDataURL(file);
    }

       
	// Camera
	
	function onSuccess(imageURI) {
	    var image = document.getElementById('myImage');
	    image.src = imageURI;
	}
	
	function onFail(message) {
	    alert('Failed because: ' + message);
	}

}	

	

///------- Create Object in JS
	function daObj() {
	    // Initialising code goes here:
	    //alert( 'Loaded!' );
	
	    // ...
	
	    // Private properties/methods:
	    var message = 'hello',
        sayHello = function() {
            alert(message);
        };
	
	    // Public properties/methods:
	    this.prop = function() {
	        sayHello();
	    };
	
	    // Encapsulation:
	    this.setMessage = function(newMessage) {
	        message = newMessage;
	    };
	}
///- END ------ Create Object in JS