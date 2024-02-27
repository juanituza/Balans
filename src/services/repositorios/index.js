import UsuarioManager from "../../dao/managers/usuarioManager.js";
import UsuarioRepositorio from "./usuarioRepositorio.js";
import ConsultaManager from "../../dao/managers/consultaManager.js";
import ConsultaRepositorio from "./consultaRepositorio.js";
import ComisionManager from "../../dao/managers/comisionManager.js";
import ComisionRepositorio from "./comisionRepositorio.js";
import CursoRepositorio from "./cursoRepositorio.js";
import CursosManager from "../../dao/managers/cursoManager.js";


export const usuarioService = new UsuarioRepositorio(new UsuarioManager());
export const consultaService = new ConsultaRepositorio(new ConsultaManager());
export const comisionService = new ComisionRepositorio(new ComisionManager());
export const cursoService = new CursoRepositorio(new CursosManager());
