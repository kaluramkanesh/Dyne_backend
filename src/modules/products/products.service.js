const repo = require("./products.repository");

exports.createProduct = repo.createProduct;

exports.getProducts = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    return await repo.getAllProducts(page, limit);
};


exports.getProduct = repo.getProductById;

exports.updateProduct = repo.updateProduct;

exports.deleteProduct = repo.deleteProduct;

exports.deleteAllProducts = repo.deleteAllProduct;