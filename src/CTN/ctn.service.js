const { resendApiKey, emailUser } = require("../config/env");

const enviarCorreo = async ({ name, addresse, subject, message }) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Contacto Portfolio <onboarding@resend.dev>",
      to: [emailUser],
      reply_to: addresse,
      subject,
      text: `${message}\n\nDe: ${name} — ${addresse}`,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Resend error: ${response.status} — ${errBody}`);
  }
};

module.exports = { enviarCorreo };
