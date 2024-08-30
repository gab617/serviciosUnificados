const { initializeData, findElementById } = require("./utils");
const path = require("path");

let dataBW = null;

initializeData().then((res) => {
  dataBW = res;
});

exports.pingBW = (req, res) => {
  try {
    res.status(200).send("ping BW");
  } catch (error) {
    console.error("Error en pingBW:", error);
    res.status(500).json({ message: "Error interno del servidor bw" });
  }
};

exports.dataBW = (req, res) => {
  try {
    if (!dataBW) {
      throw new Error("Datos no disponibles");
    }
    res.status(200).json(dataBW);
  } catch (error) {
    console.error("Error al obtener datos en dataBW:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.findObjId = (req, res) => {
  const id = parseInt(req.params.id);
  const element = findElementById(dataBW, id);
  try {
    if (element) {
      res.json(element);
    } else {
      res.status(404).send("Elemento no encontrado");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getKeys = (req, res) => {
  try {
    const keywords = Object.keys(dataBW);
    res.status(200).json(keywords);
  } catch (error) {
    console.log(error);
  }
};

exports.getImageId = (req, res) => {
  console.log(req.params);
  const imageName = req.params?.imageName; // Obtiene el valor del parámetro de ruta
  const categoria = req.params?.categoria;
  const imagePath = path.join(
    __dirname,
    `./public/images/${categoria}/${imageName}`
  ); // RUTA API
  console.log(imagePath);
  res.sendFile(imagePath);
};

exports.completedImg = (req, res) => {
  try {
    const imagePath = path.join(__dirname, `./public/completed.jpg`); // RUTA API
    console.log(imagePath);
    res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
  }
};
