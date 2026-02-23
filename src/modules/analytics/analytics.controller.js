const asyncHandler = require("../../middleware/asyncHandler");
const service = require("./analytics.service");

exports.reviewEngagement = asyncHandler(async (req, res) => {

    const data = await service.getReviewEngagement();

    res.json({ success: true, data });

});

exports.categoryRatings = asyncHandler(async (req, res) => {

    const data = await service.getCategoryRatings();

    res.json({ success: true, data });

});

exports.topProducts = asyncHandler(async (req, res) => {

    const data = await service.getTopProducts();

    res.json({ success: true, data });

});
