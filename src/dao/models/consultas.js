import mongoose from "mongoose";
import moment from "moment-timezone";

const collection = "Consultas";

const consultaSchema = new mongoose.Schema(
  {
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    curso: {
      type: String,
      enum: ["curso1", "curso2", "curso3"],
    },
    mensaje: String,
    estado: {
      type: String,
      default: "No leido",
      enum: ["No leido", "Pendiente", "Cerrado"],
    },
  },
  {
    timestamps: {
      createdAt: "fecha_creacion",
      updatedAt: "fecha_modificacion",
    },
  }
);

// Personaliza la representación de las fechas en el JSON
consultaSchema.set('toJSON', { getters: true, virtuals: false, transform: (doc, ret) => {
    ret.fecha_creacion = moment(doc.fecha_creacion).tz("America/Argentina/Buenos_Aires").format('DD-MM-YYYY HH:mm');
    ret.fecha_modificacion = moment(doc.fecha_modificacion).tz("America/Argentina/Buenos_Aires").format('DD-MM-YYYY HH:mm');
    return ret;
  }
});

const consultaModel = mongoose.model(collection, consultaSchema);

export default consultaModel;
