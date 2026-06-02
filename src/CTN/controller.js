const ctnService = require("./ctn.service");

exports.pingContact = (req, res) => {
  res.status(200).send("Ping Contact service");
};

exports.enviarCorreo = async (req, res) => {
  try {
    const { name, addresse, subject, message } = req.body;
    await ctnService.enviarCorreo({ name, addresse, subject, message });
    res.status(200).send("Correo enviado");
  } catch (error) {
    console.error("ERROR MAIL:", error);
    res.status(500).send("Error al enviar el correo");
  }
};
