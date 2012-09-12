

//---------- Globals -----------------

// Basic layout Elements
	var content = $('#mainframe');
	var header  = $('#topbanner');
	var dataBox = $('#dataBox');
	
	// Filesystem
	var fsystemOnline = false;
	var froot = null;
	var approot = null;



function init(){
	document.removeEventListener('deviceready', init, false);
	
	
	
	startApp();
/*	
	// setting up filesystem Contection
	initFilesystem();
	
	
	// Checking for ready to go
	if(navigator.geolocation && fsystemOnline){
		
		// starting app
		startApp();
	}
	else{
		content.append('Starting App failed please restart');
		if(!navigator.geolocation){
			content.append('-Geolocation is not available');
		}
		if(!fsystemOnline){
			content.append('-Filesystem is not available');
		}
	}
*/	
}	
	function startApp(){
		console.log('was los?');
		$('a').click(changeView);
	}
	
//-- App is ready to go  --------------------------------------------------


	
// Fail MSG
	function failCB (msg) {
		return function () {
	    	content.append('[FAIL] ' + msg +'<br />');
		}
	}
	
	
	
	/*
	* 			Viewcontrolers
	* 
	* 
	*/
	
	function basicUi(){
		$('a').click(changeView);
	}
	
	function changeView(event){
		
		// kills standard behaviour
		event.preventDefault();
		var elem = (event.target) ? $(event.target) : $(event.srcElement);	
		var url  = elem.attr('href');
		
		// parsing href to action
		if(url!='' && url != null){
			// there is an URL
			if(url.indexOf('!')>=0){
				//exec script function
				url = url.replace('!','');
				var fn = window[url];
				try{
					fn.call();
				}
				catch(error){
					console.log('Not existing function:'+url);
				}	
			}
			else{
				// its a view
				clearDataBox();
				console.log('changeView to: '+url);
				$(document).unbind();
				try{
					exitView();
				}
				catch(error){
					console.log('No Exit View');
				}	
				dataBox.load(url,renderTrigger);	
			}
		}
		else{
			console.log('dead link');
		}
		
		return false;
	}
	
	function renderTrigger(){
		clearTemplate();
		$(document).trigger('renderview');
	}
	
	// cleans the visible Template from all content
	function clearTemplate(){
		clearContentBox();
		header.find('header_title').html('');
		header.find('header_button').html('');
	}
	
	// deletes all data in Databox
	function clearDataBox(){
		dataBox.html('');
	}
	// deletes all data in Contentbox
	function clearContentBox(){
		content.html('');
	}
	 
	 
	 
	 /*
	 * 			Geolocation get current Location and provide formated
	 * 
	 * 
	 */

	// call geolocation
	function callGeolocation(){
		var timeoutVal = 10 * 1000 * 1000;
		var fail = failCB('geolocation failed')
		navigator.geolocation.getCurrentPosition(
			gelocation, 
			fail,
			{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
		  );
	}  
	
	// parse geodata
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
	
	
	
	/*
	 * 			File System functionality
	 * 
	 * 		For loading / saving data on local filesystem
	 * 
	 */

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
		fsystemOnline = true;
		//save App Root
		approot = dirEntry;
		updateSpots();
	}
//--- END ---------- setting up filesystem Contection	
	
	
// --- General Filesystem Functions
	//get list of Spotfiles
	function updateSpots(){
		var dirReader = approot.createReader();
		var fail =failCB('Read de.s1-e01.spots Directory for parsing');
		dirReader.readEntries(parseSpots,fail);
		databox.trigger('spotsupdated');
	}
	//parse Spotfiles
	function parseSpots(entries){
	    var i;
	    for (i=0; i<entries.length; i++) {
	    	
	    	
	    	/*Todo 
	    	 *Parse each file for 
	    	 * Must haves:  Name
	    	 * 				Timestamp
	    	 * 				Long
	    	 * 				Lat
	    	 * 
	    	 * Can Haves:	Icon Url
	    	 * 				Tag[]
	    	 * 				Adress/ additional info
	    	 * 
	    	 * */
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
       
       
       
       
       
	/*
	 * 			Camera
	 * 
	 * 		Provides adapter to camsystem and filedata of images
	 * 
	 */
// Camera
	
	function onSuccess(imageURI) {
	    var image = document.getElementById('myImage');
	    image.src = imageURI;
	}
	
	function onFail(message) {
	    alert('Failed because: ' + message);
	}


	/*
	 * 
	 *  View functionallity
	 * 
	 */
		function addSpot(){
		alert('works');
	}
	



	/*
	 * 			Trash that could be usefull at one point 
	 * 
	 * 
	 */
	
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