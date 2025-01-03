import mongoose from "mongoose";
import moment from "moment-timezone";

const collection = "Usuario";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: String,
    apellido: String,
    dni: {
      type: String,
      unique: true,
    },
    domicilio: String,
    localidad: String,
    cp: String,
    provincia: String,
    pais: String,
    telefono: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    imagen: [],
    nacimiento: Date,
    role: {
      type: String,
      default: "alumno",
      enum: ["alumno", "profesor", "admin"],
    },
    comisiones: [
      {
        comision: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comision",
        },
      },
    ],

    cursos:[
      { 
        curso:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cursos",
    },
    },
  ],
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

usuarioSchema.virtual("CursosCreate", {
  ref: "Cursos", //referencia a Users model
  localField: "curso", // campo local "purchaser"
  foreignField: "nombre", // campo que quiero traer de Users
  justOne: true, // solo ese campo
});

// Define un setter para "nacimiento" para convertir la fecha al formato deseado
// usuarioSchema.path("nacimiento").set(function(value) {
//   // Aquí puedes realizar la conversión de la fecha, asumiendo que "value" está en formato "DD-MM-AAAA"
//   const parts = value.split("-");
//   if (parts.length === 3) {
//     const [day, month, year] = parts;
//     return `${day}-${month}-${year}`;
//   }
//   return value;
// });

const usuarioModel = mongoose.model(collection, usuarioSchema);

export default usuarioModel;
