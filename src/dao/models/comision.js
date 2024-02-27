import mongoose from "mongoose";


const collection = "Comision";

const comisionSchema = new mongoose.Schema(
  {
    numero: Number,
    curso: {
      type: String,
      enum: ["pilates", "quiromasaje", "nutricion"],
    },
    alumnos: [
      {
        alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
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
