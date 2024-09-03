require("dotenv").config();
const nodemailer = require("nodemailer");
exports.pingContact = (req, res) => {
  try {
    res.status(200).send("Ping Contat service");
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor CNT" });
  }
};

exports.enviarCorreo = (req, res) => {
  const { addresse, subject, message } = req.body;
  const from = addresse;

  // Configura el transporter de nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Configura los datos del correo electrónico
  const mailOptions = {
    from: from,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: message + "\n" + from,
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error al enviar el correo electrónico");
    } else {
      console.log("Correo electrónico enviado: " + info.response);
      res.status(200).send("Correo electrónico enviado con éxito");
    }
  });
};
