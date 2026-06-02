const path = require("path");
const bwService = require("./bw.service");

exports.pingBW = (req, res) => {
  res.status(200).send("ping BW");
};

exports.dataBW = (req, res) => {
  const data = bwService.getData();
  if (!data) {
    return res.status(503).json({ message: "Datos no disponibles" });
  }
  res.status(200).json(data);
};

exports.findObjId = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const element = bwService.findById(id);
    if (element) {
      res.json(element);
    } else {
      res.status(404).send("Elemento no encontrado");
    }
  } catch (error) {
    console.error("Error en findObjId:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.getKeys = (req, res) => {
  try {
    const keywords = bwService.getKeys();
    res.status(200).json(keywords);
  } catch (error) {
    console.error("Error en getKeys:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.getImageId = (req, res) => {
  try {
    const { categoria, imageName } = req.params;
    const imagePath = path.join(
      __dirname,
      `./public/images/${categoria}/${imageName}`
    );
    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error en getImageId:", error);
    res.status(500).json({ message: "Error al obtener la imagen" });
  }
};

exports.completedImg = (req, res) => {
  try {
    const imagePath = path.join(__dirname, "./public/completed.jpg");
    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error en completedImg:", error);
    res.status(500).json({ message: "Error al obtener la imagen" });
  }
};
