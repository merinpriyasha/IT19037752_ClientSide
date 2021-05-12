<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ page import="model.GadgetProduct"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Product Management</title>

<!-- Css and boostrap Files -->
<link rel="stylesheet" href="View/bootstrap.min.css">
<link rel="stylesheet" href="View/products.css">
<link href="https://fonts.googleapis.com/css?family=Oleo+Script:400,700"
	rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Teko:400,700"
	rel="stylesheet">
<link
	href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
	rel="stylesheet">

<!-- Js Files -->
<script src="Components/bootstrap.min.js"></script>
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/products.js"></script>
</head>

<body>

	<section id="contact">
		<div class="container">
			<div class="contact-section">
				<div class="row">

					<div class="section-content">
						<h1 class="section-header">
							Products in <span class="content-header wow fadeIn "
								data-wow-delay="0.2s" data-wow-duration="2s"> Gadget
								Badget System</span>
						</h1>
						<h3>New technological products from us</h3>
					</div>

					<div class="col-6">
						<div class="leftside">
							<form id="formProduct" name="formProduct">

								<div class="col-md-6 form-line">

									<div class="form-group">
										<label for="ProductName">Product Name</label> <input
											id="pName" name="pName" type="text"
											class="form-control form-control-sm"> <br>
									</div>

									<div class="form-group">
										<label for="ProductDate">Date Of Product</label> <input id="pDate"
											name="pDate" type="text" class="form-control form-control-sm">
										<br>
									</div>


									<div class="form-group">
										<label for="ProductPrice">Product Price</label> <input
											id="pPrice" name="pPrice" type="text"
											class="form-control form-control-sm"> <br>
									</div>


									<div class="form-group">
										<label for="ProductDes">Product Description</label> <input
											id="pDes" name="pDes" type="text"
											class="form-control form-control-sm"> <br>
									</div>

									<div id="savedBu">
										<input id="btnSave" name="btnSave" type="button" value="Save"
											class="btn btn-outline-warning">
									</div>

									<input type="hidden" id="hidProductIDSave"
										name="hidProductIDSave" value="">

								</div>
							</form>


							<div id="alertSuccess" class="alert alert-success"></div>
							<div id="alertError" class="alert alert-danger"></div>
							<br>

						</div>
					</div>

					<div class="col-6">
						<div class="rightside">
							<div id="divProductsGrid">
								<%
								GadgetProduct productObj = new GadgetProduct();
								out.print(productObj.readProducts());
								%>
							</div>

						</div>
					</div>

				</div>
			</div>
		</div>
	</section>

</body>
</html>