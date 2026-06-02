require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3001,
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "mi_base_de_datos",
  },
  resendApiKey: process.env.RESEND_API_KEY,
  emailUser: process.env.EMAIL_USER,
};
