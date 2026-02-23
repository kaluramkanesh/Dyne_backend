const asyncHandler = require("../../middlewares/asyncHandler");

const service = require("./sales.service");

exports.importDataset = asyncHandler(async (req, res) => {

    const result = await service.importDataset(req.file);

    res.json({ success: true, message: "CSV Imported Successfully", data: result });

});
