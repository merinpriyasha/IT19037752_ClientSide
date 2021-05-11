$(document).ready(function()
{ 
	if ($("#alertSuccess").text().trim() == "") 
 	{ 
 	$("#alertSuccess").hide(); 
 	} 
 	$("#alertError").hide(); 
});

 // SAVE ============================================
$(document).on("click", "#btnSave", function(event) 
{ 
	// Clear alerts---------------------
 	$("#alertSuccess").text(""); 
 	$("#alertSuccess").hide(); 
 	$("#alertError").text(""); 
 	$("#alertError").hide(); 
	// Form validation-------------------
	var status = validateItemForm(); 
	if (status != true) 
 	{ 
 		$("#alertError").text(status); 
 		$("#alertError").show(); 
 		return; 
	} 
	// If valid------------------------
 		var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT"; 
 		
 		$.ajax( 
 	{ 
 		url : "ProductsAPI", 
	 	type : type, 
 		data : $("#formItem").serialize(), 
 		dataType : "text", 
 		complete : function(response, status) 
 	{ 
 	
 	onItemSaveComplete(response.responseText, status); 
 	} 
 	});
});

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
 	$("#hidItemIDSave").val($(this).data("pid")); 
 	$("#pName").val($(this).closest("tr").find('td:eq(0)').text()); 
	$("#pDate").val($(this).closest("tr").find('td:eq(1)').text()); 
 	$("#pPrice").val($(this).closest("tr").find('td:eq(2)').text()); 
 	$("#pDes").val($(this).closest("tr").find('td:eq(3)').text());
});

// DELETE=====================================================
$(document).on("click", ".btnRemove", function(event)
{ 
 $.ajax( 
 { 
 url : "ProductsAPI", 
 type : "DELETE", 
 data : "pId=" + $(this).data("pid"),
 dataType : "text", 
 complete : function(response, status) 
 { 
 onItemDeleteComplete(response.responseText, status); 
 } 
 }); 
});


// CLIENT-MODEL================================================================
function validateItemForm() 
{ 
	// CODE
	if ($("#pName").val().trim() == "") 
 	{ 
 		return "Insert Item Code."; 
 	} 
	// NAME
	if ($("#pDate").val().trim() == "") 
 	{ 
 		return "Insert Item Name."; 
 	}
 	// PRICE-------------------------------
	if ($("#pPrice").val().trim() == "") 
 	{ 
 		return "Insert Item Price."; 
 	} 
	
	// DESCRIPTION------------------------
	if ($("#pDes").val().trim() == "") 
 	{ 
 		return "Insert Item Description."; 
 	}
 	  
return true; 
}

// Function on items==========
function onItemSaveComplete(response, status)
{ 
	if (status == "success") 
 	{ 
 		var resultSet = JSON.parse(response); 
 		if (resultSet.status.trim() == "success") 
 		{ 
 			$("#alertSuccess").text("Successfully saved."); 
 			$("#alertSuccess").show(); 
 			$("#divItemsGrid").html(resultSet.data); 
 		} else if (resultSet.status.trim() == "error") 
 		{ 
 			$("#alertError").text(resultSet.data); 
 			$("#alertError").show(); 
 		} 
 	}else if (status == "error") 
 	{ 
 			$("#alertError").text("Error while saving."); 
 			$("#alertError").show(); 
 		} else
 		{ 
 			$("#alertError").text("Unknown error while saving.."); 
 			$("#alertError").show(); 
 		}
 		
 		
 		$("#hidItemIDSave").val(""); 
 		$("#formItem")[0].reset(); 
}

// function iems Delete====================

function onItemDeleteComplete(response, status)
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully deleted."); 
 $("#alertSuccess").show(); 
 $("#divItemsGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while deleting."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while deleting.."); 
 $("#alertError").show(); 
 } 
}

function decode_utf8( s ){
    return decodeURIComponent( escape( s ) );
}



