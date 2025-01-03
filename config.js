import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();
<<<<<<< HEAD:src/config.js
program.option("-m, --mode <mode>", "Modo de ejecución", "prod");
program.parse();
=======
// program.option("-m, --mode <mode>", "Modo de ejecución", "prod");
// program.parse();
>>>>>>> 59f6ff81885b59567077a535129750c87957458f:config.js

dotenv.config({ path: "./.env" });

export default {
  app: {
    PORT: process.env.PORT || 80,
  },
  mongo: {
    URL: process.env.MONGO_URL || "localhost:27017",
  },
  admin: {
    USER: process.env.ADMIN_EMAIL,
    PASS: process.env.ADMIN_PWD,
    IMG: process.env.ADMIN_IMG,
  },
  mailer: {
    USER: process.env.MAILER_USER,
    PASS: process.env.MAILER_PASSWORD,
  },
  jwt: {
    COOKIE: process.env.JWT_COOKIE,
    SECRET: process.env.JWT_SECRET,
  },
  mercado_pago: {
    CREDENCIALES: process.env.CREDENCIALES_MP,
    TOKEN: process.env.TOKEN_MP,
  },
};
