var mongoose = require('mongoose'),
    Schema = mongoose.Schema ;

var loginSchema = new mongoose.Schema({
	username: String ,
	password: String 	
});

var pageContentSchema = new mongoose.Schema({
	pageTitle: String ,
	metaDescription: String,
	metaKey: String,
	pageUrl: String,
	htmlContent: String
});

var customerSchema = new mongoose.Schema({
	username: String ,
	name: String,
	email: String,
	address: String,
	image: String
});

var productSchema = new mongoose.Schema({
	product_name: String ,
	image: String,
	price: String,
	category: String,
	status: String,
	description: String,
	quantity: String,
	category_id: String,
	subCategory_id: String,
	brand: String,
	product_datetime: {
		type: Date,
		default: Date.now
	},
});

var categorySchema = new mongoose.Schema({
	name: String
});

var subCategorySchema = new mongoose.Schema({
	name: String ,
	parent_id: [{ type: Schema.ObjectId, ref: 'Category' }]
});

var brandsSchema = new mongoose.Schema({
	brandName: String,
	category_id: [{ type: Schema.ObjectId, ref: 'Category' }]
});
 	
 	
module.exports.auth = mongoose.model('User',loginSchema);
module.exports.managePage = mongoose.model('Managepage',pageContentSchema);
module.exports.customer = mongoose.model('Customer',customerSchema);
module.exports.product = mongoose.model('Product',productSchema);
module.exports.category = mongoose.model('Category',categorySchema);
module.exports.subCategory = mongoose.model('Subcategory',subCategorySchema);
module.exports.brands = mongoose.model('Brand',brandsSchema);

