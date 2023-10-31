import mongoose from "mongoose";

const collection = "Clases";

const clasesSchema = new mongoose.Schema(
  {
    Alumnos: [
      {
        quantity: {
          type: Number,
          default: 0,
          max: 3,
        },

        alumno: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Usuario",
        },
        turnos: [
          {
            dia: {
              type: String,
            },
            horario: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

clasesSchema.pre(/^find/, function () {
  this.populate("Usuarios.usuario");
});

const clasesModel = mongoose.model(collection, clasesSchema);

export default clasesModel;
