var mongo = require('./models/todo');
var mongoose = require('mongoose');
var fs = require('fs');
var uuid = require('node-uuid');
var multiparty = require('multiparty');
var gm = require('gm');
//
//
module.exports = function(app) {
	//
	// Authenticate User for Login
	app.post('/api/login', function(req, res) {
		mongo.auth.find(req.body,
		   function(err,obj) { 
			 if (err)
				res.send(err)

				res.json(obj);
		   });
	});
	//
	// Add and Update Users
	app.post('/api/addCustomer', function(req, res) {
		var id = (req.body._id) ? req.body._id : mongoose.Types.ObjectId(0) ;
		var data = {
			'name':req.body.name,
			'email':req.body.email,
			'username':req.body.username,
			'address':req.body.address,
			'image': req.body.image	
		};
		mongo.customer.findOneAndUpdate({'_id': id}, data, {upsert: true}, function(err, response) {
			if (err)
			 res.send(err);
			 res.json(response);
		 });
	});
	//
	// Add and Update Product
	app.post('/api/addProduct', function(req, res) {
		var id = (req.body._id) ? req.body._id : mongoose.Types.ObjectId(0) ;
		var data = {
			'product_name':req.body.product_name,
			'price':req.body.price,
			'category':req.body.category,
			'status':req.body.status,
			'image': req.body.image,	
			'description': req.body.description,	
			'quantity': req.body.quantity,	
			'category_id': req.body.category_id ,	
			'subCategory_id': req.body.subCategory_id,
			'brand': req.body.brand	
		};
		console.log(data);
		mongo.product.findOneAndUpdate({'_id': id}, data, {upsert: true}, function(err, response) {
			if (err)
			 res.send(err);
			 res.json(response);
		 });
	});
	
	
	//
	// Get customers
	app.post('/api/customers', function(req, res) {
		var skip = parseInt(req.body.pageNumber) - 1;
		var customersPerPage = parseInt(req.body.customersPerPage)
		skip = skip * customersPerPage ;
		var searchData = "";
		if(req.body.search){
			var searchData = req.body.search;
		}
		mongo.customer.find({username: new RegExp(searchData, 'i')}).skip(skip).limit(customersPerPage).exec(function(err, users) {
			if (err)
				res.send(err);
				 console.log(err);
			var customerData = {};
			customerData.customers = users;
			mongo.customer.count(function(err, count){
			    customerData.count = {'totalCount':count};	
			    res.json(customerData);
			   
			});
		});
	});
	
	//
	//
	app.post('/api/products', function(req, res) {
		var skip = parseInt(req.body.pageNumber) - 1;
		var customersPerPage = parseInt(req.body.customersPerPage)
		skip = skip * customersPerPage ;
		var searchData = "";
		if(req.body.search){
			var searchData = req.body.search;
		}
		console.log(searchData +'/'+ skip);	
		mongo.product.find({product_name: new RegExp(searchData, 'i')}).skip(skip).limit(customersPerPage).exec(function(err, users) {
			if (err)
			res.send(err);
			console.log(err);
			var customerData = {};
			customerData.customers = users;
			mongo.product.count(function(err, count){
			    customerData.count = {'totalCount':count};	
			    res.json(customerData);
			   
			});
		});
	});
	//
	// Delete customer
	app.post('/api/delete', function(req, res) {
		mongo.customer.remove({
			_id : req.body.id
		}, function(err, todo) {
			if (err)
				res.send(err);
					
				var skip = parseInt(req.body.pageNumber) - 1;
				skip = skip * parseInt(req.body.customersPerPage);	
				mongo.customer.find().skip(skip).limit(req.body.customersPerPage).exec(function(err, users) {
					if (err)
					res.send(err)
					res.json(users);
				});
		});
	});
	
	// 
	// Get customer on the basis of user Id
	app.get('/api/getCustomer/:id', function(req, res) {
		mongo.customer.findOne({_id: req.params.id},function(err, user) {
				if (err)
				res.send(err);
				res.json(user);
			});
	});
	
	// 
	// Get product on the basis of user Id
	app.get('/api/getProduct/:id', function(req, res) {
		mongo.product.findOne({_id: req.params.id},function(err, user) {
				if (err)
				res.send(err);
				res.json(user);
		});
	});
	//
	// Add Dynamic Pages Content
	app.post('/api/addPageContent', function(req, res) {
		var id = (req.body._id) ? req.body._id : mongoose.Types.ObjectId(0) ;
		var data = {
			'pageTitle':req.body.pageTitle,
			'metaDescription':req.body.metaDescription,
			'metaKey':req.body.metaKey,
			'pageUrl':req.body.pageUrl,
			'htmlContent':req.body.htmlContent
		};
		mongo.managePage.findOneAndUpdate({'_id': id}, data, {upsert: true}, function(err, response) {
			if (err)
			 res.send(err);
			 res.json(response);
		 });	
	
	});
	//
	app.post('/api/pages', function(req, res) {
		var skip = parseInt(req.body.pageNumber) - 1;
		var PagesPerPage = parseInt(req.body.PagesPerPage)
		skip = skip * PagesPerPage ;
		var searchData = "";
		if(req.body.search){
			var searchData = req.body.search;
		}
		console.log(searchData +'/'+ skip);	
		mongo.managePage.find({pageTitle: new RegExp(searchData, 'i')}).skip(skip).limit(PagesPerPage).exec(function(err, users) {
			if (err)
				res.send(err);
				 console.log(err);
			var customerData = {};
			customerData.customers = users;
			mongo.managePage.count(function(err, count){
			    customerData.count = {'totalCount':count};	
			    res.json(customerData);
			   
			});
		});
	});
	//
	// Delete page
	app.post('/api/page/delete', function(req, res) {
		mongo.managePage.remove({
			_id : req.body.id
		}, function(err, todo) {
			if (err)
				res.send(err);
					
				var skip = parseInt(req.body.pageNumber) - 1;
				skip = skip * parseInt(req.body.customersPerPage);	
				mongo.managePage.find().skip(skip).limit(req.body.customersPerPage).exec(function(err, pages) {
					if (err)
					res.send(err)
					res.json(pages);
				});
		});
	});
	//
	// Delete product
	app.post('/api/product/delete', function(req, res) {
		mongo.product.remove({
			_id : req.body.id
		}, function(err, todo) {
			if (err)
				res.send(err);
					
				var skip = parseInt(req.body.pageNumber) - 1;
				skip = skip * parseInt(req.body.customersPerPage);	
				mongo.product.find().skip(skip).limit(req.body.customersPerPage).exec(function(err, pages) {
					if (err)
					res.send(err)
					res.json(pages);
				});
		});
	});
	// 
	// Get Page on the basis of page Id
	app.get('/api/getPage/:id', function(req, res) {
		mongo.managePage.findOne({_id: req.params.id},function(err, page) {
				if (err)
				res.send(err);
				res.json(page);
			});
	});
	
	//
	// Upload image
	app.post('/api/uploadImage/:path', function(req, res) {
		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {
			var file = files.file[0];
			var contentType = file.headers['content-type'];
			var tmpPath = file.path;
			var extIndex = tmpPath.lastIndexOf('.');
			var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
			// uuid is for generating unique filenames. 
			var fileName = uuid.v4() + extension;
			var destPath = 'public/images/'+ req.params.path +'/org/' + fileName;
			var imagename = fileName;
			// Server side file type checker.
			if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
				fs.unlink(tmpPath);
				return res.status(400).send('Unsupported file type.');
			}
			fs.rename(tmpPath, destPath, function(err) {
				if (err) {
					return res.status(400).send('Image is not saved:');
				} else {
					//First install either GraphicsMagick or ImageMagick. Then:
					gm(destPath)
					.contrast(-2)
					.resize(70, 70)
					.write('public/images/'+ req.params.path +'/thumbnail/' + fileName, function (err) {
						if (!err) console.log(' hooray! ');
						return res.json({'destPath': destPath, 'imagename': imagename});
					});
				}
			});
		});
	});
	//
	// Get categories
	app.post('/api/categories', function(req, res) {
		var skip = parseInt(req.body.pageNumber) - 1;
		var customersPerPage = parseInt(req.body.customersPerPage)
		skip = skip * customersPerPage ;
		var searchData = "";
		if(req.body.search){
			var searchData = req.body.search;
		}
		mongo.category.find({name: new RegExp(searchData, 'i')}).skip(skip).limit(customersPerPage).exec(function(err, categories) {
			if (err)
			res.send(err);
			var customerData = {};
			customerData.customers = categories;
			mongo.category.count({parent_id: 0},function(err, count){
			    customerData.count = {'totalCount':count};	
			    res.json(customerData);
			});	
		});
	});
	//
	// Add and Update category
	app.post('/api/addCategory', function(req, res) {
		var insertUpdate = function() {
			var id = (req.body._id) ? req.body._id : mongoose.Types.ObjectId(0) ;
			var data = {
				'name':req.body.name.toLowerCase()
			};
			mongo.category.findOneAndUpdate({'_id': id}, data, {upsert: true}, function(err, response) {
				if (err)
				res.send(err);
				res.json({status:'success', message: 'Category inserted successfully', data:''});
			});
		}
		if(req.body.edit == "true") {	
			insertUpdate();
		} else {
			mongo.category.find({name: req.body.name.toLowerCase()},function(err, category) {
				if (err)
				res.send(err);
				if(category.length) {
					res.json({status:'failure', message: 'Category name already exist', data: ''});
				} else{
					insertUpdate();
				}
			});	
		}
	});
	app.post('/api/addSubCategory', function(req, res) {
		var insertUpdate = function() {
			var id = (req.body._id) ? req.body._id : mongoose.Types.ObjectId(0);
			var parent_id = (req.body.parent_id) ? req.body.parent_id : 0 ;
			var data = {
				'name':req.body.name.toLowerCase(),
				'parent_id' : parent_id
			};
			mongo.subCategory.findOneAndUpdate({'_id': id}, data, {upsert: true}, function(err, response) {
				if (err)
				res.send(err);
				res.json({status:'success', message: 'Category inserted successfully', data:''});	
			});
		}
		if(req.body.edit == "true") {	
			insertUpdate();
		} else {
			mongo.subCategory.find({name: req.body.name.toLowerCase(), parent_id: req.body.parent_id},function(err, category) {
				if (err)
				res.send(err);
				if(category.length) {
					res.json({status:'failure', message: 'Category name already exist', data: ''});
				} else{
					insertUpdate();
				}
			});	
		}
	});
	//
	// 
	// Get Page on the basis of page Id
	app.get('/api/getAllCategoriesAndBrands', function(req, res) {
		mongo.category.find({},function(err, categories) {
			if (err)
			res.send(err);
			var data = {};
			data.categories = categories;
			mongo.brands.find({},function(err, brands) {
				data.brands = brands;
				res.json(data);
			});
		});
	});
	//
	// 
	// Get Page on the basis of page Id
	app.get('/api/getAllCategories', function(req, res) {
		mongo.category.find({},function(err, categories) {
			if (err)
			res.send(err);
			res.json(categories);
		});
	});
	// 
	// Get Category on the basis of Id
	app.get('/api/getCategory/:id', function(req, res) {
		mongo.category.findOne({_id: req.params.id},function(err, user) {
			if (err)
			res.send(err);
			res.json(user);
		});
	});
	// 
	// Get Sub Category on the basis of Id
	app.post('/api/getSubCategoriesById', function(req, res) {
		var id = req.body.id;
		mongo.subCategory.find({parent_id: id},function(err, categories) {
			if (err)
			res.send(err);
			var data = {};
			data.subCat = categories
			mongo.brands.find({category_id: id},function(err, brand) {
				if (err)
				res.send(err);
				console.log(brand);
				data.brands = brand;
				res.json(data);
			});
		});
	});
	//
	// Delete Category
	app.post('/api/category/delete', function(req, res) {
		mongo.category.remove({ '_id' : req.body.id }, function(err, todo) {
			if (err)
				res.send(err);	
				var skip = parseInt(req.body.pageNumber) - 1;
				skip = skip * parseInt(req.body.customersPerPage);	
				mongo.category.find().skip(skip).limit(req.body.customersPerPage).exec(function(err, users) {
					if (err)
					res.send(err)
					res.json(users);
				});
		});
	});
	//
	// Delete Category
	app.post('/api/removeBrand', function(req, res) {
		mongo.brands.remove({ '_id' : req.body.id }, function(err, todo) {
			if (err)
				res.send(err);	
				var skip = parseInt(req.body.pageNumber) - 1;
				skip = skip * parseInt(req.body.customersPerPage);	
				mongo.brands.find().skip(skip).limit(req.body.customersPerPage).exec(function(err, brands) {
					if (err)
					res.send(err)
					res.json(brands);
				});
		});
	});
	//
	// Delete Category
	app.post('/api/removeSubCategory', function(req, res) {
		mongo.subCategory.remove({
			_id : req.body.id
		}, function(err, todo) {
			if (err)
				res.send(err);		
				mongo.subCategory.find({parent_id: req.body.parent_id},function(err, category) {
					if (err)
					res.send(err)
					res.json(category);
				});
			});
	});
	// Get all brands
	//
	//
	//
	app.post('/api/brands', function(req, res) {
		var skip = parseInt(req.body.pageNumber) - 1;
		var brandsPerPage = parseInt(req.body.brandsPerPage)
		skip = skip * brandsPerPage ;
		var searchData = "";
		if(req.body.search){
			var searchData = req.body.search;
		}
		mongo.brands.find({brandName: new RegExp(searchData, 'i')}).skip(skip).limit(brandsPerPage).exec(function(err, brands) {
			if (err)
			res.send(err);
			var brandsData = {};
			brandsData.brands = brands;
			mongo.brands.count(function(err, count){
			    brandsData.count = count ;	
			    res.json(brandsData); 
			});
		});
	});
	//
	// Add and Update Brand
	app.post('/api/addBrand', function(req, res) {
		var insertUpdate = function() {
			var id = (req.body._id) ? req.body._id : mongoose.Types.ObjectId(0) ;
			var data = {
				'brandName':req.body.brandName.toLowerCase(),
				'category_id':req.body.category_id
			};
			mongo.brands.findOneAndUpdate({'_id': id}, data, {upsert: true}, function(err, response) {
				if (err)
				res.send(err);
				res.json({status:'success', message: 'Brand inserted successfully', data:''});
			});
		}
		if(req.body.edit == "true") {	
			insertUpdate();
		} else {
			mongo.brands.find({brandName: req.body.brandName.toLowerCase()},function(err, brand) {
				if (err)
				res.send(err);
				if(brand.length) {
					res.json({status:'failure', message: 'Brand name already exist', data: ''});
				} else{
					insertUpdate();
				}
			});	
		}
	});
	//~ // application -------------------------------------------------------------
	app.get('*', function(req, res) {
		console.log('abcd');
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
