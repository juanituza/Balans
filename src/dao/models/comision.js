import mongoose from "mongoose";


const collection = "Comision";

const comisionSchema = new mongoose.Schema(
  {
    numero: Number,
    curso: {
      type: String,
    },
    alumnos: [
      {
        alumno: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Usuario",
        },
      },
    ],
    documents: [
      {
        name: {
          type: String,
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
comisionSchema.pre(/^find/, function () {
  this.populate("alumnos.alumno", "nombre apellido email");
});

const comisionModel = mongoose.model(collection, comisionSchema);

export default comisionModel;
