const express = require("express");
const router = express.Router();
const controllerD2 = require("./controller")

router.get("/ping", controllerD2.pingD2)
router.get("/heros-list", controllerD2.dataListHeros)
router.get("/detail/:id", controllerD2.findHeroId)


module.exports = router;
