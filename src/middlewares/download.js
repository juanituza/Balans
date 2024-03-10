// Importa las dependencias necesarias
import path from "path";
import fsPromises from "fs/promises";
import __dirname from "../utils.js";

import { determineFolder } from "./upload.js";
import { comisionService } from "../services/repositorios/index.js";

// Método para descargar archivos
// Método para descargar archivos
const downloadFile = async (req, res) => {
  try {
    const { cid, documentId } = req.params;
    // const comisionId = req.params.cid;
  
    // console.log(documentId);
    const comision = await comisionService.obtenerComisionPor(cid);
   
    if (!comision) {
      throw new Error("Comisión no encontrada");
    }

    const document = comision.documents.find(
      (doc) => doc._id.toString() === documentId
    );
    
    if (!document) {
      throw new Error("Documento no encontrado en la comisión");
    }

    // const originalFileName = document.originalFileName;
    // console.log(originalFileName);
    const fileName = document.name;

    const filePath = path.join(
      __dirname,
      "public",
      "uploads",
      determineFolder("others"),
      fileName
    );

    const fileData = await fsPromises.readFile(filePath);

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(fileData);
  } catch (error) {
    console.error(`Error al descargar el archivo: ${error.message}`);
    res.status(500).send({ error: "Error al descargar el archivo" });
  }
};

export default downloadFile;
