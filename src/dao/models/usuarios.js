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
    edad: Number,
    password: String,
    /*  cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carts",
    }, */
    role: {
      type: String,
      default: "alumno",
      enum: ["alumno", "profesor", "admin"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    documents: [
      {
        name: {
          type: String,
        },
        reference: {
          type: String,
          enum: ["identification", "address", "count"],
        },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Método para verificar si el usuario tiene el rol "premium"
// userSchema.methods.isPremium = function() {
//   return this.role === "premium";
// };

const usuarioModel = mongoose.model(collection, usuarioSchema);

export default usuarioModel;
