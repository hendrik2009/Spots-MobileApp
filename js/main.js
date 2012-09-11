function init(){
	
	
	
	
	// Basic layout Elements
	var content =$('#mainframe');
	var header =$('#topbanner');
	var dataBox =$('#dataBox');
	
	// Filesystem
	var fsystemOnline = false;
	var froot = null;
	var approot = null;
	
	// setting up filesystem Contection
	initFilesystem();
	
	// setting up geolocation
    var geoOnline = false;


	if(geoOnline && fsystemOnline){
		startApp();
	}
	else{
		content.append('Starting App failed please restart')
	}
	
	
	
	function startApp(){
		
	}
	
//-- App is ready to go  --------------------------------------------------


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
	

	
	function checkAbilities(){
				
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
		}
		
		
		
		

	}
// Fail MSG
	function failCB (msg) {
		    return function () {
	         content.append('[FAIL] ' + msg +'<br />');
	  		}
	 }
	 
//Geofunctions
	function gelocation(position) {
	 /*	msgObj.append(	'Latitude: '+ position.coords.latitude								+ '<br />' +
                        'Longitude: '          + position.coords.longitude             + '<br />' +
                        'Altitude: '           + position.coords.altitude              + '<br />' +
                        'Accuracy: '           + position.coords.accuracy              + '<br />' +
                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                        'Heading: '            + position.coords.heading               + '<br />' +
                        'Speed: '              + position.coords.speed                 + '<br />' +
                        'Timestamp: '          + position.timestamp          + '<br />'
                        );*/

	}
	
	
//------------------ setting up filesystem Contection
    //try to get Root
    function initFilesystem() {
    	var fail = failCB('OpenFileSystem')
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
    	
    }
    //save root and go to appFolder
    function onFileSystemSuccess(fileSystem){	
		froot = fileSystem.root;
		 var fail = failCB('GetAppDir');
		 
		 //starting in root directory
	    fileSystem.root.getDirectory('applications', {create: true, exclusive: false},
	                    goToAppDirectory, fail);
	}
	function goToAppDirectory(dirEntry){
		//starting in root/applications
		var fail = failCB('Get de.s1-e01.spots');
	    dirEntry.getDirectory('de.s1-e01.spots', {create: true, exclusive: false},
	                    goToSpotsDirectory, fail);
	}
	//save appFolder and start first file-parsing
	function goToSpotsDirectory(dirEntry){
		//starting in root/applications/de.s1-e01.spots
		approot = dirEntry;
		updateSpots();
	}
//---END ---------- setting up filesystem Contection	
	
	
// --- General Filesystem Functions
	//get list of Spotfiles
	function updateSpots(){
		var dirReader = approot.createReader();
		var fail =failCB('Read de.s1-e01.spots Directory for parsing');
		dirReader.readEntries(parseSpots,fail);
	}
	//parse Spotfiles
	function parseSpots(entries){
	    var i;
	    for (i=0; i<entries.length; i++) {
	        console.log(entries[i].name);
	    }
	    content.append('<br/>counted:'+i+'files');
	}
	
	
	
	
/*	
	var fileObj = null;
	var fReader = null;
	var fwriter = null;
	
	function gotFileEntry(fileEntry) {
		msgObj.append('Got File <br />');
		var fail = failCB('Failed in creating writer');
	    fileObj = fileEntry;
		fileEntry.createWriter(gotFileWriter, fail);
	}

	function gotFileWriter(fileWriter) {
		msgObj.append('start writing <br />');
	    fwriter = fileWriter;
	    fwriter.onwriteend= function(){
	    	readFile(fileObj);
	    };
	    fwriter.write('some Text that is soooo nice to read');
	     
	}
	
	function readFile(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            content.append(evt.target.result);
        };
        reader.readAsText(file);
    }*/
//--- END------------ General Filesystem Functions
       

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