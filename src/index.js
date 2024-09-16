const express = require("express");
require("dotenv").config();
const cors = require("cors");


const app = express();

app.use(express.json())
app.use(
    cors({
      origin: "*",
    })
  );;

/* BASIC WORDS ----------------------------------------------------------------------------------------------------------------------------------------*/
const appBW = require("./BW/routes");
const dataBW = require("./BW/routes");
const findObjId = require("./BW/routes");
const getKeys = require("./BW/routes");
const completedImg = require("./BW/routes");
const getImageId = require("./BW/routes");

app.use("/bw", appBW); /* /ping */
app.use("/bw", dataBW); /* /databw */
app.use("/bw", findObjId); /* /element/:id */
app.use("/bw", getKeys); /* /keywords*/
app.use("/bw", completedImg); /* /completed*/
app.use("/bw", getImageId); /* /:categoria/:imageName*/

/* DOTA2APP ----------------------------------------------------------------------------------------------------------------------------------------*/
const appD2 = require("./D2/routes")
const listHeros = require("./D2/routes")
const heroDetail = require("./D2/routes")

app.use("/d2", appD2) /* /ping */
app.use("/d2", listHeros) /* /heros-list */
app.use("/d2", heroDetail) /* /detail/:id */

/* CONTACTO ----------------------------------------------------------------------------------------------------------------------------------------*/
const appCtn = require("./CTN/routes")
const enviarCorreo = require("./CTN/routes")

app.use("/cnt", appCtn) /* /ping */
app.use("/cnt", enviarCorreo) /* /enviar-correo */


/* 
app.use("/ghy", app3);
*/

// Ruta principal
app.get("/", (req, res) => {
  res.send("Welcome to the Unified Project");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server on port ${port}`); // mensaje en consola luego de levantar el servidor
});
