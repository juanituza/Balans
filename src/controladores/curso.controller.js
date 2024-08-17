import { cursoService } from "../services/repositorios/index.js";
import __dirname from "../utils.js";
import multer from "multer";
import upload, { determineFolder } from "../middlewares/upload.js";
import fs from "fs";
import path from "path";

const crearCurso = async (req, res) => {
  try {
    const { nombre, texto, precio } = req.body;

    const precioNumero = parseFloat(precio);

    const curso = { nombre, texto, precio: precioNumero };

    // Verificar si se ha enviado un archivo de imagen
    let imagenUrl = null;

    if (req.file) {
      imagenUrl = `/uploads/cursos/${req.file.filename}`;
    }

    curso.imagen = imagenUrl;

    const result = await cursoService.crearCurso(curso);
    res.sendSuccessWithPayload({ result });
  } catch (error) {
    console.log(error);

    res.sendInternalError("Internal error");
  }
};

const editarCurso = async (req, res) => {
  upload.single("imagen")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Error de multer:", err);
      return res
        .status(500)
        .json({ status: "error", error: "Error al cargar la imagen." });
    } else if (err) {
      console.error("Error al procesar la imagen:", err);
      return res.status(500).json({
        status: "error",
        error: "Ocurrió un error al procesar la imagen.",
      });
    }

    try {
      const cursoId = req.params.cursoId;
      const { nombre, texto, precio } = req.body;

      // Obtener el curso actual para encontrar la imagen antigua
      const cursoActual = await cursoService.obtenerCursoPorId(cursoId);

      // Verificar si se ha enviado un archivo de imagen
      let imagenUrl = null;
      if (req.file) {
        imagenUrl = `/uploads/cursos/${req.file.filename}`;

        // Eliminar la imagen antigua si existe
        if (cursoActual.imagen) {
          const imagenAntiguaFilename = cursoActual.imagen.replace(
            "/uploads/cursos/",
            ""
          );
          const imagenAntiguaPath = path.join(
            __dirname,
            "public",
            "uploads",
            "cursos",
            imagenAntiguaFilename
          );

          // Verificar si el archivo realmente existe antes de intentar eliminarlo
          fs.access(imagenAntiguaPath, fs.constants.F_OK, (err) => {
            if (err) {
              console.error(
                "La imagen antigua no existe o no se puede acceder:",
                imagenAntiguaPath
              );
            } else {
              fs.unlink(imagenAntiguaPath, (err) => {
                if (err) {
                  console.error("Error al eliminar la imagen antigua:", err);
                } else {
                  console.log("Imagen antigua eliminada:", imagenAntiguaPath);
                }
              });
            }
          });
        }
      }

      const cursoUpdate = {
        nombre,
        texto,
        precio,
        ...(imagenUrl && { imagen: imagenUrl }), // Solo agregar el campo imagen si se ha subido una nueva
      };

      await cursoService.actualizarCursoPorId({ _id: cursoId }, cursoUpdate);

      res.json({ status: "success", message: "Curso editado con éxito" });
    } catch (error) {
      console.error("Error interno al editar el curso:", error);
      res
        .status(500)
        .json({ status: "error", error: "Error interno al editar el curso" });
    }
  });
};

const eliminarCurso = async (req, res) => {
  try {
    const { cursoId } = req.params;
    await cursoService.eliminarCurso({ _id: cursoId });
    res.sendSuccess("Curso eliminado");
  } catch (error) {
    res.sendInternalError(error);
  }
};

export default {
  crearCurso,
  editarCurso,
  eliminarCurso,
};
