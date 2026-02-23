const router = require("express").Router();
const controller = require("./analytics.controller");

router.get("/review-engagement", controller.reviewEngagement);
router.get("/category-ratings", controller.categoryRatings);
router.get("/top-products", controller.topProducts);

module.exports = router;
