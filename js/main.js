function actor(){
	
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
	}
	function clearDataBox(){
		dataBox.html('');
	}
	function clearContentBox(){
		content.html('');
	}
};
	

