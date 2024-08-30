const dataHeros = require("./data/dataHeros.json");
const herosDetail = require("./data/herosDetail.json");
const { searchHeroDetail } = require("./utils");

exports.pingD2 = (req, res) => {
  try {
    res.status(200).send("ping D2");
  } catch (error) {
    console.error("Error en pingD2:", error);
    res.status(500).json({ message: "Error interno del servidor d2" });
  }
};

exports.dataListHeros = (req, res) => {
  try {
    res.status(200).json(dataHeros);
  } catch (error) {
    console.error("Error en pingD2:", error);
    res.status(500).json({ message: "Error interno del servidor d2" });
  }
};

exports.findHeroId = (req, res) => {
    const id = +req.params.id
    const heroDetailSearch = searchHeroDetail(herosDetail, id)
  try {
    if (heroDetailSearch){
        res.status(200).json(heroDetailSearch)
    }
  } catch (error) {
    console.error("Error en pingD2:", error);
    res.status(500).json({ message: "Error interno del servidor d2" });
  }
};
