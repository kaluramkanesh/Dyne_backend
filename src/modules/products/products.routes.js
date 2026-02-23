const router = require("express").Router();

const controller = require("./products.controller");

router.post("/", controller.create);

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.put("/:id", controller.update);

router.delete("/all", controller.removeAll)

router.delete("/:id", controller.remove);


module.exports = router;
