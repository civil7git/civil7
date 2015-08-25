function getURLParameter(name,source) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(source)||[,null])[1]
    );
}



function getParameterByName( name, source )
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(source);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
	





function cis_gird_old(xml,kp,SourceHeaderControlID,SourceRowControlID, HostControlID_1,HostControlID_2) 
{
    var cissplit = "|||";
			
    if(jQuery("status",xml).text() == "2") return;
			
    jQuery("row",xml).each(function(singlerow) 
    {
        var targethtml_1 =  jQuery(SourceHeaderControlID).html().toString();
        var targethtml_2 =  jQuery(SourceRowControlID).html().toString();				
        var targethtml = targethtml_2; 
        message = jQuery("row",xml).get(singlerow);
				
        if( jQuery("spathlink",message).text().toString().length	== 0 ) 
        {
            targethtml = targethtml_1; 
        }
        //				alert( targethtml );
				
        for (var i = 0; i < kp.length; i++) 
        {		
            var keyvals = kp[i].split(cissplit);			
            var str = jQuery(keyvals[0],message).text().toString();
            if( str.length > 0 ) 
                targethtml = replaceAll(  targethtml,keyvals[1],str);
        }
					
        var col = parseInt( jQuery("ncol",message).text() );	

        if( col == 1 )
        {
            jQuery(HostControlID_2).append( targethtml );
        }
        else
        {
            jQuery(HostControlID_1).append( targethtml );				
        }
    });
}


function addPager_new(aPageId,aLimit,xml,HostControlID) 
{		
	
    var result = "";
    //    var PageSize = jQuery("pagesize",xml).text();
    var Step = aLimit;
	var PageCount = 0;
    PageCount = parseInt( jQuery("records",xml).text() / Step );
	PageCount = PageCount + 1;
    var CurrentPage = jQuery("page",xml).text();
	CurrentPage = CurrentPage + 1;
	
	CurrentPage = aPageId / aLimit;
	
	jQuery(HostControlID).html( "" );
		
    var ItemTemplate = "<a href=\"javascript:render_locallist({#page})\" >{#title}</a> &nbsp; ";
    var SelectedItemTemplate = "{#title} &nbsp; ";

	//		alert( PageCount );
    if(PageCount > 1)
	{
        var startPoint = Math.floor((CurrentPage/Step)) * Step;
        if((CurrentPage % Step) == 0) {
            startPoint -= Step;
        }
//        alert( startPoint );
		
        if(startPoint >= Step){
            result += ItemTemplate.replace("{#page}",startPoint).replace("{#title}"," < ");
        }
        
        for(var i=startPoint +1;i<=PageCount && i<=(startPoint + Step);i++){
            if(i != CurrentPage){
                result += ItemTemplate.replace("{#page}",(startPoint + i*Step)).replace("{#title}",i);
            }else{
                result += SelectedItemTemplate.replace("{#title}",i);
            }
        //			alert( i );
        }
        
        if(startPoint < (PageCount - Step)){
            result += ItemTemplate.replace("{#page}",(startPoint + Step +1)).replace("{#title}"," >");
        }
    }
	else
	{
		result += "1";
	}

    jQuery(HostControlID).html( result );
}


function addPager(xml,HostControlID) 
{		
	
    var result = "";
    //    var PageSize = jQuery("pagesize",xml).text();
    var Step = 5;
    var PageCount = jQuery("total",xml).text();
    var CurrentPage = jQuery("page",xml).text();

		
    var ItemTemplate = "<a href=\"javascript:render_locallist({#page})\" >{#title}</a> &nbsp; ";
    var SelectedItemTemplate = "{#title} &nbsp; ";

			
    if(PageCount > 1)
	{
        var startPoint = Math.floor((CurrentPage/Step)) * Step;
        if((CurrentPage % Step) == 0) {
            startPoint -= Step;
        }
        
        if(startPoint >= Step){
            result += ItemTemplate.replace("{#page}",startPoint).replace("{#title}"," < ");
        }
        
        for(var i=startPoint +1;i<=PageCount && i<=(startPoint + Step);i++){
            if(i != CurrentPage){
                result += ItemTemplate.replace("{#page}",i).replace("{#title}",i);
            }else{
                result += SelectedItemTemplate.replace("{#title}",i);
            }
        //			alert( i );
        }
        
        if(startPoint < (PageCount - Step)){
            result += ItemTemplate.replace("{#page}",(startPoint + Step +1)).replace("{#title}"," >");
        }
    }
	else
	{
		result += "1";
	}

    jQuery(HostControlID).html( result );
}



function objstorage( )
{
	var targethtml ;
}
		
function cis_lists(xml,kp,SourceControlID, HostControlID, rowstr,extraProcArg,extraProcArg2) 
{
    var cissplit = "|||";
	var row = "row";
	
	


    if(jQuery("status",xml).text() == "2") return;
	if( rowstr != null ) row = rowstr;

	//jQuery(HostControlID).html( "" );
	
    jQuery(row,xml).each(function(singlerow) 
    {

		var myobj = new objstorage();


		
		myobj.targethtml = jQuery("#targetlocal").html(); //.toString();"#targetlocal" SourceControlID

//		alert( jQuery("#euappboxitemtemplate").toString() );

        message = jQuery(row,xml).get(singlerow);
		
		var consumed = false;
		if( extraProcArg2 != null ) 
		{
				 consumed = extraProcArg2( message,kp,myobj );				 
		}
		//alert( HostControlID+ myobj.targethtml );		
		if( !consumed )
		{
        for (var i = 0; i < kp.length; i++) 
        {		
            var keyvals = kp[i].split(cissplit);						


            if( keyvals[0] == "CIS_GUN_IMGS" )
            {
                var nu = parseInt( jQuery("nweighty",message).text() );	
                var imgs = cis_item_multiplier(nu, 20 );
//				alert ( imgs );
                myobj.targethtml = replaceAll(  myobj.targethtml,keyvals[1],imgs ); 					
            }
            else
            {
				var consumed = false;
				if( extraProcArg != null ) 
				{
						consumed = extraProcArg( 		keyvals[1],(keyvals[0],message).text().toString(),keyvals[0]);
				}

				
				if( jQuery(keyvals[0],message).text().toString().length > 0 && !consumed ) 
				{
                	myobj.targethtml = replaceAll(  myobj.targethtml,keyvals[1],jQuery(keyvals[0],message).text().toString());
				}
            }
        }
		
        jQuery(HostControlID).append( myobj.targethtml );		
		}

    });
}


		
function cis_lists_new(aPageId,aLimit,xml,kp,SourceControlID, HostControlID, rowstr,extraProcArg,extraProcArg2) 
{
    var cissplit = "|||";
	var row = "row";
	
	


    if(jQuery("status",xml).text() == "2") return;
	if( rowstr != null ) row = rowstr;

	jQuery(HostControlID).html( "" );
	
    jQuery(row,xml).each(function(singlerow) 
    {
		if( (aPageId >  singlerow && aPageId-aLimit <= singlerow) || aPageId == -1 ) 
		{
		var myobj = new objstorage();		
		myobj.targethtml = SourceControlID.html(); //.toString();"#targetlocal" SourceControlID


        message = jQuery(row,xml).get(singlerow);
		
		var consumed = false;
		if( extraProcArg2 != null ) 
		{
				 consumed = extraProcArg2( message,kp,myobj );				 
		}
		
		if( !consumed )
		{
        for (var i = 0; i < kp.length; i++) 
        {		
            var keyvals = kp[i].split(cissplit);						


            if( keyvals[0] == "CIS_GUN_IMGS" )
            {
                var nu = parseInt( jQuery("nweighty",message).text() );	
                var imgs = cis_item_multiplier(nu, 20 );
//				alert ( imgs );
                myobj.targethtml = replaceAll(  myobj.targethtml,keyvals[1],imgs ); 					
            }
            else
            {
				var consumed = false;
				if( extraProcArg != null ) 
				{
						consumed = extraProcArg( 		keyvals[1],(keyvals[0],message).text().toString(),keyvals[0]);
				}

				
				if( jQuery(keyvals[0],message).text().toString().length > 0 && !consumed ) 
				{
                	myobj.targethtml = replaceAll(  myobj.targethtml,keyvals[1],jQuery(keyvals[0],message).text().toString());
				}
            }
        }
		
        HostControlID.append( myobj.targethtml );		
		}

		}
    });
}




function cis_gird( aParent, xml,kp,SourceHeaderControlID,SourceRowControlID, HostControlID_1,HostControlID_2) 
{
    var cissplit = "|||";
	    var targethtml_1 =  jQuery(SourceHeaderControlID).html(); //.toString();
        var targethtml_2 =  jQuery(SourceRowControlID).html();//.toString();				

 	   if(jQuery("status",xml).text() == "2") return;
	   
    jQuery("row",xml).each(function(singlerow) 
    {	
	
	var targethtml = null; 
        message = jQuery("row",xml).get(singlerow);
if( singlerow == 0 && aParent  != 0 ) 
{
/*alert( 'cis_tools.js:328');*/
	targethtml = targethtml_1; 
	targethtml = replaceAll(  targethtml,"cis_maintitle","<<<");
	targethtml = replaceAll(  targethtml,"cis_mainid",0);
	
		for (var i = 0; i < kp.length; i++) 
			{		
				var keyvals = kp[i].split(cissplit);			
				var str = jQuery(keyvals[0],message).text().toString();
				if( str.length > 0 ) 
					targethtml = replaceAll(  targethtml,keyvals[1],str);
			}
			
		
	jQuery(HostControlID_1).append( targethtml );				

}

		
		targethtml = targethtml_2; 
		if( parseInt( jQuery("nparentid",message).text().toString() ) == aParent || jQuery("nparentid",message).text().toString().length	== 0 ) 
		{		
			if( jQuery("spathlink",message).text().toString().length	== 0 ) 
			{
				targethtml = targethtml_1; 
			}
			//				alert( targethtml );
					
			for (var i = 0; i < kp.length; i++) 
			{		
				var keyvals = kp[i].split(cissplit);			
				var str = jQuery(keyvals[0],message).text().toString();
				if( str.length > 0 ) 
					targethtml = replaceAll(  targethtml,keyvals[1],str);
			}
						
			var col = parseInt( jQuery("ncol",message).text() );	

			if( col == 1 )
			{
			jQuery(HostControlID_2).append( targethtml );
			}
			else
			{
				jQuery(HostControlID_1).append( targethtml );				
			}
		}
    });
}







function replaceAll(OldString, FindString, ReplaceString) {
    var SearchIndex = 0;
    var NewString = ""; 
	if( OldString != null ) 
	{
	
    while (OldString.indexOf(FindString,SearchIndex) != -1)    {
        NewString += OldString.substring(SearchIndex,OldString.indexOf(FindString,SearchIndex));
        NewString += ReplaceString;
        SearchIndex = (OldString.indexOf(FindString,SearchIndex) + FindString.length);         
    }
    NewString += OldString.substring(SearchIndex,OldString.length);
	
	}
    return NewString;
}

function cis_item_multiplier(nu,step) 

{
    var item_html = "<img id='cis_gun_img_temp' class='inline' src='/c7/sites/all/modules/community7/img/smallstar.jpg' alt='*' />";
			
    var gunshtml = "";
    for( var i = nu; i > 0 ; i-=step)
    {
        gunshtml = gunshtml + item_html;
    }
    return gunshtml;
}


function cis_add_to_map( aMap, loccord,locname, draggable2,location, location_cordinate )
{
return; ///!!!!!!!!!!!!!!!!NZS~~~~~~!!!!!!
	var keyvals;
	if( loccord != null && loccord != "" ) 
	{		
		keyvals = loccord.split(",");	
	//		alert( keyvals[0] );
	if (typeof PdMarker !== 'undefined') {		


		marker = new PdMarker(new GLatLng(keyvals[0],keyvals[1]),{draggable: draggable2});
		
		marker.setTooltip( locname );		
		var html = "Mozgass a megfelelő pozicióba!";
		
		if( draggable2 )
		{		
			GEvent.addListener(marker,'dragstart',function() 
			{
				Mapifies.Maps.Get( aMap ).closeInfoWindow();
			});
	
			GEvent.addListener(marker,'dragend',function() 
			{
			
		var map = Mapifies.MapObjects.Get( aMap );
		var marker_temp = map.getFirstMarker();

			while (marker_temp != null)
			{
			  if (!marker_temp.isHidden()) 
			  {
				marker = marker_temp;
			  }
		
			marker_temp = map.getNextMarker();
			}		
			

			
			
				marker.openInfoWindowHtml( marker.getTooltip() );
				jQuery(aMap).jmap('SearchAddress', {
				  'query': marker.getLatLng(), // new GLatLng( mapCenter.y, mapCenter.x),
				  'returnType':'getLocations'
			  }, function(result, options)
			  {
				  var valid = Mapifies.SearchCode(result.Status.code);
				  if (valid.success) 
				  {
//					  marker.setTooltip( result.Placemark[0].address );					
					  marker.openInfoWindowHtml(result.Placemark[0].address);
					  
					  if(  location_cordinate != null )
					  {
						  jQuery(location_cordinate).val( marker.getLatLng().y+','+ marker.getLatLng().x );
//						  jQuery(location_cordinate).text( marker.getLatLng().y+','+ marker.getLatLng().x );
					  }				  
					  if(  location != null )
					  {
						  jQuery(location).val(result.Placemark[0].address);
//						  jQuery(location).text(result.Placemark[0].address);
					  }				  
					  
	
				  }
			  });		
	
			}); 
		}
		Mapifies.MapObjects.Get( aMap ).addOverlay(marker);				

		if( draggable2 )
		{		
		marker.openInfoWindowHtml(html);
		}
		else
		{
			if( locname != null && locname != "" ) 
			{
				marker.openInfoWindowHtml(locname);
			}
		}


	}		
	}
}



function findLocation(location, marker) {
	jQuery('#map_canvas').gmap('search', {'location': location}, function(results, status) {
		if ( status === 'OK' ) {
			$.each(results[0].address_components, function(i,v) {
				if ( v.types[0] == "administrative_area_level_1" || 
					 v.types[0] == "administrative_area_level_2" ) {
					jQuery('#state'+marker.__gm_id).val(v.long_name);
				} else if ( v.types[0] == "country") {
					jQuery('#country'+marker.__gm_id).val(v.long_name);
				}
			});
			marker.setTitle(results[0].formatted_address);
			jQuery('#address'+marker.__gm_id).val(results[0].formatted_address);
			openDialog(marker);
		}
	});
}

function openDialog(marker) {
	jQuery('#dialog'+marker.__gm_id).dialog({'modal':true, 'title': 'Edit and save point', 'buttons': { 
		"Remove": function() {
			jQuery(this).dialog( "close" );
			marker.setMap(null);
		},
		"Save": function() {
			jQuery(this).dialog( "close" );
		}
	}});
}