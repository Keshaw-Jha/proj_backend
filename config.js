const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// You can also export specific variables if you like
module.exports = {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  SECRET_KEY: process.env.SECRET_KEY,
  DATABASE: process.env.DATABASE,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  PORT: process.env.PORT,
};
