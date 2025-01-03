import { consultaService } from "../services/repositorios/index.js";
import MailingService from "../services/mailingService.js";
import DTemplates from "../constants/DTemplates.js";

const guardarConsulta = async (req, res) => {
  const mailingService = new MailingService();
  try {
    const { nombre, apellido, telefono, email, curso, mensaje } = req.body;

    const user = { nombre, apellido, telefono, email, curso, mensaje };
    console.log(user);
    await mailingService.sendMail(DTemplates.CONSULTA);
    const result = await consultaService.crearConsulta(user);
    console.log(result);
    res.sendSuccessWithPayload({ result });
  } catch (error) {
    console.log(error);
    res.sendInternalError("Internal error");
  }
};
<<<<<<< HEAD

const actualizarConsulta = async (req, res) => {
  try {
    const { cid } = req.params;

    const editarConsutla = req.body;

    const resultado = await consultaService.actualizarConsulta(
      cid,
      editarConsutla
    );
    console.log(resultado);
    res.sendSuccessWithPayload("Consulta editada con éxito", resultado);
  } catch (error) {
    res.sendInternalError(error);
=======
const actualizarConsulta = async (req, res) => {
  try {
    const { cid } = req.params;
    const editarConsulta = req.body;

    const resultado = await consultaService.actualizarConsulta(cid,editarConsulta);

    res.sendSuccessWithPayload("Consulta editada con éxito", resultado);
  } catch (error) {
    res.sendInternalError(error);
    console.log(error);
>>>>>>> 59f6ff81885b59567077a535129750c87957458f
  }
};

const eliminarConsulta = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await consultaService.eliminarConsulta({ _id: cid });
    res.sendSuccess("Consulta eliminada");
  } catch (error) {
    res.sendInternalError(error);
  }
};

export default {
  guardarConsulta,
  actualizarConsulta,
  eliminarConsulta,
};
