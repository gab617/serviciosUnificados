require("dotenv").config();

exports.pingContact = (req, res) => {
  res.status(200).send("Ping Contact service");
};

exports.enviarCorreo = async (req, res) => {
  try {
    const { name, addresse, subject, message } = req.body;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contacto Portfolio <onboarding@resend.dev>",
        to: [process.env.EMAIL_USER],
        reply_to: addresse,
        subject: subject,
        text: `${message}\n\nDe: ${name} — ${addresse}`,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Resend error:", response.status, errBody);
      return res.status(500).send("Error al enviar el correo");
    }

    res.status(200).send("Correo enviado");
  } catch (error) {
    console.error("ERROR MAIL:", error);
    res.status(500).send(error.message);
  }
};