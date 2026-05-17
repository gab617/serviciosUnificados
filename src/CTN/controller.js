require("dotenv").config();

exports.pingContact = (req, res) => {
  try {
    res.status(200).send("Ping Contact service");
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor CNT" });
  }
};

exports.enviarCorreo = async (req, res) => {
  try {
    const { addresse, subject, message } = req.body;

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: process.env.EMAIL_USER }],
        }],
        from: { email: process.env.EMAIL_USER },
        reply_to: { email: addresse },
        subject: subject,
        content: [{
          type: "text/plain",
          value: `${message}\n\nRemitente: ${addresse}`,
        }],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("SendGrid error:", response.status, errBody);
      return res.status(500).send("Error al enviar el correo");
    }

    res.status(200).send("Correo enviado");
  } catch (error) {
    console.error("ERROR MAIL:", error);
    res.status(500).send(error.message);
  }
};