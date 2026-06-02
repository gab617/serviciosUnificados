const { initializeData, findElementById } = require("./utils");

let dataBW = null;

initializeData().then((res) => {
  dataBW = res;
});

const getData = () => dataBW;

const findById = (id) => findElementById(dataBW, id);

const getKeys = () => (dataBW ? Object.keys(dataBW) : []);

module.exports = { getData, findById, getKeys };
