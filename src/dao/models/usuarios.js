import mongoose from "mongoose";

const collection = "Usuario";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: String,
    apellido: String,
    email: {
      type: String,
      unique: true,
    },
    // nacimiento: Date,
    password: String,
    telefono: String,
    // role: {
    //   type: String,
    //   default: "alumno",
    //   enum: ["alumno", "profesor", "admin"],
    // },
    // status: {
    //   type: Boolean,
    //   default: false,
    // },
    // imagen: [],
    // documents: [
    //   {
    //     image: {
    //       type: String,
    //     },
    //     reference: {
    //       type: String,
    //       enum: ["identification", "address", "count"],
    //     },
    //   },
    // ],
  },
  {
    timestamps: {
      createdAt: "fecha_creacion",
      updatedAt: "fecha_modificacion",
    },
  }
);

// Personaliza la representación de las fechas en el JSON
usuarioSchema.set("toJSON", {
  getters: true,
  virtuals: false,
  transform: (doc, ret) => {
    ret.fecha_creacion = moment(doc.fecha_creacion)
      .tz("America/Argentina/Buenos_Aires")
      .format("DD-MM-YYYY HH:mm");
    ret.fecha_modificacion = moment(doc.fecha_modificacion)
      .tz("America/Argentina/Buenos_Aires")
      .format("DD-MM-YYYY HH:mm");
    return ret;
  },
});

const usuarioModel = mongoose.model(collection, usuarioSchema);

export default usuarioModel;
