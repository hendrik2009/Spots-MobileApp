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
		if (navigator.geolocation) {
		  var timeoutVal = 10 * 1000 * 1000;
		  navigator.geolocation.getCurrentPosition(
		    displayPosition, 
		    displayError,
		    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
		  );
		}
		else {
		  alert("Geolocation is not supported by this browser");
		}
		
		function displayPosition(position) {
		  alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
		}
		function displayError(error) {
		  var errors = { 
		    1: 'Permission denied',
		    2: 'Position unavailable',
		    3: 'Request timeout'
		  };
		  alert("Error: " + errors[error.code]);
		}
		
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
	}
	function clearDataBox(){
		dataBox.html('');
	}
	function clearContentBox(){
		content.html('');
	}
};
	

