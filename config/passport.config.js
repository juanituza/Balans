import passport from "passport";
import config from "../config.js";
import local from "passport-local";
import mongoose from "mongoose";


import { usuarioService , cursoService} from "../src/services/repositorios/index.js";
import { Strategy, ExtractJwt } from "passport-jwt";
import { cookieExtractor, createHash, validatePassword } from "../src/utils.js";

import LoggerService from "../src/dao/managers/LoggerManager.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = Strategy;


const initializePassportStrategies = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        try {
          let {
            nombre,
            apellido,
            dni,
            domicilio,
            localidad,
            pais,
            cp,
            nacimiento,
            telefono,
            cursos = [],
            role,
          } = req.body;
          const exist = await usuarioService.obtenerUsuarioPor({ email });
          if (exist)
            return done(
              null,
              false,
              { message: "Usuario existente" },
              LoggerService.error("Usuario existente")
            );

          // Busca el curso por nombre
          const cursoNombre = req.body.curso;
          
          //Busca todos los cursos  
          const allCursos = await cursoService.obtenerCursos();
          //Busca el curso encontrado por el nombre
          const cursoEncontrado = allCursos.find(
            (curso) => curso.nombre === cursoNombre
          );       
          // Accede a la información del archivo cargado
          const hashedPassword = await createHash(password);
          const usuario = {
            nombre,
            apellido,
            dni,
            domicilio,
            localidad,
            pais,
            cp,
            cursos, // Asigna el _id del curso encontrado o null si no se encontró ningún curso
            email,
            nacimiento,
            role,
            telefono,
            password: hashedPassword,
          };
          const result = await usuarioService.crearUsuario(usuario);
          done(null, result);
        } catch (error) {
          done(error);
          
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //defino el admin
        if (email === config.admin.USER && password === config.admin.PASS) {
          const Usuario = {
            id: 0,
            nombre: 'ADMIN',
            apellido:'ADMIN',
            role: 'ADMIN',
            imagen: config.admin.IMG,
            email: config.admin.USER,
          };
          return done(null, Usuario);
        }
        let usuario;
        usuario = await usuarioService.obtenerUsuarioPor({ email });
        if (!usuario)
          return done(null, false, { message: "Incorrect credentials" });

        const isValidPassword = await validatePassword(password, usuario.password);

        if (!isValidPassword)
          return done(null, false, { message: "Wrong password" });

       
        //creo la sesión
        
        usuario = {
          _id: usuario._id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          nacimiento: usuario.nacimiento,
          telefono: usuario.telefono,
          role: usuario.role,
          cursos: usuario.cursos,
        };
        
     
        
        return done(null, usuario);
      }
    )
  );

  

  //passport se encarga de la verificacion del token
  passport.use(
    "jwt",
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwt.SECRET,
      },
      async (payload, done) => {
        try {
          return done(null, payload);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

export default initializePassportStrategies;
