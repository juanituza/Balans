import mongoose from "mongoose";

const collection = "Cursos";

const cursosSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      
    },
    texto: {
      type: mongoose.Schema.Types.Mixed,
    },
    precio: Number,
    imagen: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// cursosSchema.pre(/^find/, function () {
//   this.populate("Usuarios.usuario");
// });

const cursosModel = mongoose.model(collection, cursosSchema);

export default cursosModel;
