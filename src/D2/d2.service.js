const dataHeros = require("./data/dataHeros.json");
const herosDetail = require("./data/herosDetail.json");
const { searchHeroDetail } = require("./utils");

const getAllHeros = () => dataHeros;

const findById = (id) => searchHeroDetail(herosDetail, id);

module.exports = { getAllHeros, findById };
