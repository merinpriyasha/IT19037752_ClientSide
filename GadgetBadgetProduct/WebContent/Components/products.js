$(document).ready(function()
{ 
	if ($("#alertSuccess").text().trim() == "") 
 	{ 
 	$("#alertSuccess").hide(); 
 	} 
 	$("#alertError").hide(); 
});

 // SAVE BUTTON ============================================
$(document).on("click", "#btnSave", function(event) 
{ 
	// Clear alerts---------------------
 	$("#alertSuccess").text(""); 
 	$("#alertSuccess").hide(); 
 	$("#alertError").text(""); 
 	$("#alertError").hide(); 
	// Form validation-------------------
	var status = validateProductForm(); 
	if (status != true) 
 	{ 
 		$("#alertError").text(status); 
 		$("#alertError").show(); 
 		return; 
	} 
	// If valid------------------------
 		var type = ($("#hidProductIDSave").val() == "") ? "POST" : "PUT"; 
 		
 		$.ajax( 
 	{ 
 		url : "ProductsAPI", 
	 	type : type, 
 		data : $("#formProduct").serialize(), 
 		dataType : "text", 
 		complete : function(response, status) 
 	{ 
 	
 	onProductSaveComplete(response.responseText, status); 
 	} 
 	});
});

// UPDATE BUTTON==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
 	$("#hidProductIDSave").val($(this).data("pid")); 
 	$("#pName").val($(this).closest("tr").find('td:eq(0)').text()); 
	$("#pDate").val($(this).closest("tr").find('td:eq(1)').text()); 
 	$("#pPrice").val($(this).closest("tr").find('td:eq(2)').text()); 
 	$("#pDes").val($(this).closest("tr").find('td:eq(3)').text());
});

// DELETE BUTTON=====================================================
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
 onProductDeleteComplete(response.responseText, status); 
 } 
 }); 
});


// FORM VALIDATION================================================================
function validateProductForm() 
{ 
	// PRODUCT NAME
	if ($("#pName").val().trim() == "") 
 	{ 
 		return "Insert Product Name."; 
 	} 
	// DATE------------------------------
	if ($("#pDate").val().trim() == "") 
 	{ 
 		return "Insert Product Date."; 
 	}
 	// PRODUCT PRICE---------------------------
	if ($("#pPrice").val().trim() == "") 
 	{ 
 		return "Insert Product Price."; 
 	} 
 	
 	// is numerical value
	var tmpPrice = $("#pPrice").val().trim(); 
	if (!$.isNumeric(tmpPrice)) 
 	{ 
 		return "Insert a numerical value for Product Price."; 
	 } 
	 
	// convert to decimal price
 	$("#pPrice").val(parseFloat(tmpPrice).toFixed(2)); 
	
	
	// DESCRIPTION------------------------
	if ($("#pDes").val().trim() == "") 
 	{ 
 		return "Insert Product Description."; 
 	}
 	  
return true; 
}

// SAVE FUNCTION==========
function onProductSaveComplete(response, status)
{ 
	if (status == "success") 
 	{ 
 		var resultSet = JSON.parse(response); 
 		if (resultSet.status.trim() == "success") 
 		{ 
 			$("#alertSuccess").text("Successfully saved."); 
 			$("#alertSuccess").show(); 
 			$("#divProductsGrid").html(resultSet.data); 
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
 		
 		
 		$("#hidProductIDSave").val(""); 
 		$("#formProduct")[0].reset(); 
}

// DELETE FUNCTION====================

function onProductDeleteComplete(response, status)
{ 
	if (status == "success") 
 	{ 
 		var resultSet = JSON.parse(response); 
 		if (resultSet.status.trim() == "success") 
 		{ 
 			$("#alertSuccess").text("Successfully deleted."); 
 			$("#alertSuccess").show(); 
 			$("#divProductsGrid").html(resultSet.data); 
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



