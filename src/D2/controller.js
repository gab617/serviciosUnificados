const d2Service = require("./d2.service");

exports.pingD2 = (req, res) => {
  res.status(200).send("ping D2");
};

exports.dataListHeros = (req, res) => {
  try {
    res.status(200).json(d2Service.getAllHeros());
  } catch (error) {
    console.error("Error en dataListHeros:", error);
    res.status(500).json({ message: "Error interno del servidor d2" });
  }
};

exports.findHeroId = (req, res) => {
  try {
    const id = +req.params.id;
    const heroDetailSearch = d2Service.findById(id);
    if (heroDetailSearch) {
      res.status(200).json(heroDetailSearch);
    } else {
      res.status(404).json({ message: "Héroe no encontrado" });
    }
  } catch (error) {
    console.error("Error en findHeroId:", error);
    res.status(500).json({ message: "Error interno del servidor d2" });
  }
};
