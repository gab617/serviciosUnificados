const fs = require("fs/promises");
const path = require("path");

let dataBW = null;
const urlServidor = "https://serviciosunificados.onrender.com"
/* const urlServidor = "http://localhost:3001" */

const loadData = async () => {
  console.log("Iniciando la carga de datos...");

  const directorio = path.join(__dirname, "public/images");

  try {
    // Lee el directorio principal
    const archivos = await fs.readdir(directorio);

    let id = 0;
    const promesasDeLectura = archivos.map(async (archivo) => {
      const rutaArchivo = path.join(directorio, archivo);

      try {
        // Lee los archivos dentro de cada directorio
        const archivosImgs = await fs.readdir(rutaArchivo);
        const arrayUrlsImgs = archivosImgs.map((nombreImagen) => {
          id++;
          let separacionDePartes = nombreImagen.split("_");
          let texto_español = separacionDePartes[1]?.split(".")[0];
          let texto_ingles = separacionDePartes[0];
          return {
            id: id,
            url: `${urlServidor}/bw/${archivo}/${nombreImagen}`,
            ing: `${
              texto_ingles.charAt(0).toUpperCase() +
              texto_ingles.slice(1).replace(/\.[^.]+$/, "")
            }`,
            esp: `${
              texto_español?.charAt(0).toUpperCase() +
              texto_español?.slice(1).replace(/\.[^.]+$/, "")
            }`,
            activo: false,
          };
        });

        return { [archivo]: arrayUrlsImgs };
      } catch (err) {
        console.error("Error al leer la carpeta:", err);
        throw err; // Propaga el error para ser manejado en la función principal
      }
    });

    const objetos = await Promise.all(promesasDeLectura);
    const objetoReturn = objetos.reduce((resultado, objeto) => {
      return { ...resultado, ...objeto };
    }, {});
    return objetoReturn;
  } catch (error) {
    console.error("Error general:", error);
    throw new Error("Error interno del servidor");
  }
};

function findElementById(data, id) {
  for (const category in data) {
    if (data.hasOwnProperty(category)) {
      const foundElement = data[category].find((element) => element.id === id);
      if (foundElement) {
        return foundElement;
      }
    }
  }
  return null;
}

const initializeData = async () => {
  try {
    dataBW = await loadData();
    console.log("BW Datos cargados con éxito");
    return dataBW;
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
};

module.exports = { initializeData, findElementById };
