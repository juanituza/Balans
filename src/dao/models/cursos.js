import mongoose from "mongoose";

const collection = "Cursos";

const cursosSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,      
      enum: ["pilates", "quiromasaje", "nutricion"],
    },
    
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

cursosSchema.pre(/^find/, function () {
  this.populate("Usuarios.usuario");
});

const cursosModel = mongoose.model(collection, cursosSchema);

export default cursosModel;
