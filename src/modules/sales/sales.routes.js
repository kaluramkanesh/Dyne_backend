const router = require("express").Router();

const controller = require("./sales.controller");   // ✅ check path

const upload = require("../../middlewares/upload");

router.post("/import", upload.single("file"), controller.importDataset);

module.exports = router;
