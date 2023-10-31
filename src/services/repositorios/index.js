import UsuarioManager from "../../dao/managers/usuarioManager.js";
import UsuarioRepositorio from "./usuarioRepositorio.js";
import ConsultaManager from "../../dao/managers/consultaManager.js";
import ConsultaRepositorio from "./consultaRepositorio.js";


export const usuarioService = new UsuarioRepositorio(new UsuarioManager());
export const consultaService = new ConsultaRepositorio(new ConsultaManager());
