const router = require("express").Router();

router.use("/products", require("../modules/products/products.routes"));
// router.use("/reviews", require("../modules/reviews/reviews.routes"));
router.use("/sales", require("../modules/sales/sales.routes"));
// router.use("/analytics", require("../modules/analytics/analytics.routes"));

module.exports = router;
