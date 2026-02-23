const repo = require("./products.repository");

exports.createProduct = repo.createProduct;

exports.getProducts = repo.getAllProducts;

exports.getProduct = repo.getProductById;

exports.updateProduct = repo.updateProduct;

exports.deleteProduct = repo.deleteProduct;

exports.deleteAllProducts = repo.deleteAllProduct;