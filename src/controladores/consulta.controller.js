import { consultaService } from "../services/repositorios/index.js";
import MailingService from "../services/mailingService.js";
import DTemplates from "../constants/DTemplates.js";

const guardarConsulta = async (req, res) => {
  const mailingService = new MailingService();
  try {
    const { nombre, apellido, telefono, email, curso, mensaje } = req.body;
    
    const user = { nombre, apellido, telefono, email, curso, mensaje };
    await mailingService.sendMail(DTemplates.CONSULTA);
    const result = await consultaService.crearConsulta(user);
    res.sendSuccessWithPayload({ result });
  } catch (error) {
    console.log(error);
    res.sendInternalError("Internal error");
  }
};



export default {
  guardarConsulta,
};