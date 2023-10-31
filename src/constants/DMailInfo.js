import __dirname from "../utils.js"

export default {
  consulta: {
    subject: "¡Nueva consulta!",
    attachments: [
      {
        filename: "1_pilates-img.jpeg",
        path: `${__dirname}/public/imagenes/1_pilates-img.jpeg`,
        cid: "pilates-img",
      },
      {
        filename: "Email-Illustration.png",
        path: `${__dirname}/public/imagenes/Email-Illustration.png`,
        cid: "Email-Illustration",

      },
    ],
  },
};
   