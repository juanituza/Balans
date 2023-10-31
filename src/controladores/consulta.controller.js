import { consultaService } from "../services/repositorios/index.js";

const guardarConsulta = async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, curso, mensaje } = req.body;
    
    const user = { nombre, apellido, telefono, email, curso, mensaje };
    console.log(user);
    const result = await consultaService.crearConsulta(user);
    res.sendSuccessWithPayload({ result });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};



export default {
  guardarConsulta,
};