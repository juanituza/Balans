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


const actualizarConsulta = async (req, res) => {
  try {
    const { cid } = req.params;
    
    const editarConsutla = req.body;
  
    const resultado = await consultaService.actualizarConsulta(cid,editarConsutla);
    console.log(resultado);
    res.sendSuccessWithPayload('Consulta editada con éxito', resultado);
    
  } catch (error) {
    res.sendInternalError(error);    
  }


};

const eliminarConsulta = async (req,res) => {
  try {
    const { cid } = req.params;
    const result = await consultaService.eliminarConsulta({_id: cid});
    res.sendSuccess("Consulta eliminada")  
  
  } catch (error) {
    res.sendInternalError(error);   
  }



}


export default {
  guardarConsulta,
  actualizarConsulta,
  eliminarConsulta,
};