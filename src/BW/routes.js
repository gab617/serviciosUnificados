const express = require("express");
const router = express.Router();
const controllerBW = require("./controller");

router.get("/ping", controllerBW.pingBW);
router.get("/databw", controllerBW.dataBW);
router.get("/element/:id", controllerBW.findObjId);
router.get("/:categoria/:imageName", controllerBW.getImageId);
router.get("/keywords", controllerBW.getKeys);
router.get("/completed", controllerBW.completedImg);

module.exports = router;
