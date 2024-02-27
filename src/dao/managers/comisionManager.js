import comisionModel from "../models/comision.js";

export default class ComisionManager {
  obtenerComision = async () => {
    return await comisionModel.find().lean();
  };
  obtenerComisionPorId = (id) => {
    return comisionModel.findById(id);
  };
  obtenerComisionPor = async (id) => {
    return await comisionModel.findOne({ _id: id }).lean()
  };
  crearComision = async (comision) => {
    return await comisionModel.create(comision);
  };
  actualizarComision = async (cid, comision) => {
    return await comisionModel.updateOne({ _id: cid }, { $set: comision });
  };

  eliminarComision = async (id) => {
    return await comisionModel.findByIdAndDelete(id);
  };
}
