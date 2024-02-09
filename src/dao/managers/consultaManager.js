import consultaModel from "../models/consultas.js";

export default class ConsultaManager {
  obtenerConsultas = async () => {
    return await consultaModel.find().lean();
  };
  obtenerConsultasPorId = (id) => {
    return consultaModel.findById(id);
  };
  obtenerConsultaPor = async (params) => {
    return await consultaModel.findOne(params).lean();
  };
  crearConsulta = async (user) => {
    return await consultaModel.create(user);
  };
  actualizarConsulta = async (id, consulta) => {
    return await consultaModel.updateOne({ _id: id }, { $set: consulta });
  };

  eliminarConsulta = async (id) => {
    return await consultaModel.findByIdAndDelete(id);
  };
}

