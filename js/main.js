function init(){
	
	var content =$('#mainframe');
	var header =$('topbanner');
	var dataBox =$('#dataBox');
	
	/* views */
	var view_spot_object = null;
	var view_add_form	= null;


	var testData =[ ['a',12] , ['b',14] ];

	/* load views and save for parsing */
	dataBox.load('views.html',parseViews)
	
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
		  navigator.geolocation.getCurrentPosition(
		    displayPosition, 
		    displayError,
		    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
		  );
		}
		else {
		 msgObj.append("Geolocation is not supported by this browser");
		}
		
		
	}
	function displayPosition(position) {
		 msgObj.append(		'Latitude: '+ position.coords.latitude								+ '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          +                                   position.timestamp          + '<br />'
                            );

		}
		function displayError(error) {
		  var errors = { 
		    1: 'Permission denied',
		    2: 'Position unavailable',
		    3: 'Request timeout'
		  };	  
		  navigator.notification.alert("Error: " + errors[error.code]);
		}
	
};
	

