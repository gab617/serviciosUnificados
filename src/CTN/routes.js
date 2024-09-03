const express = require("express");
const router = express.Router();
const controllerCNT = require("./controller");

router.get("/ping", controllerCNT.pingContact)
router.get("/enviar-correo", controllerCNT.enviarCorreo)

module.exports = router