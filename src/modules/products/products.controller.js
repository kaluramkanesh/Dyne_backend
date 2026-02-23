const asyncHandler = require("../../middlewares/asyncHandler");
const service = require("./products.service");


// CREATE
exports.create = asyncHandler(async (req, res) => {

    const product = await service.createProduct(req.body);

    res.json({ success: true, data: product });

});


// GET ALL
exports.getAll = asyncHandler(async (req, res) => {

    const products = await service.getProducts(req.query);


    res.json({ success: true, data: products });

});


// GET SINGLE
exports.getOne = asyncHandler(async (req, res) => {

    const product = await service.getProduct(req.params.id);

    res.json({ success: true, data: product });

});


// UPDATE
exports.update = asyncHandler(async (req, res) => {

    const product = await service.updateProduct(req.params.id, req.body);

    res.json({ success: true, data: product });

});


// DELETE
exports.remove = asyncHandler(async (req, res) => {

    await service.deleteProduct(req.params.id);

    res.json({ success: true, message: "Deleted" });

});
// DELETE All
exports.removeAll = asyncHandler(async (req, res) => {

    await service.deleteAllProducts();

    res.json({
        success: true,
        message: "All products deleted successfully"
    });

});
