import passport from "passport";
import config from "../src/config.js";
import local from "passport-local";

import GithubStrategy from "passport-github2";
import { usuarioService} from "../src/services/repositorios/index.js";
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
          const { nombre, apellido, nacimiento, telefono, role } = req.body;
          const exist = await usuarioService.obtenerUsuarioPor({ email });
          if (exist)
            return done(
              null,
              false,
              { message: "Usuario existente" },
              LoggerService.error("Usuario existente")
            );

          // Accede a la información del archivo cargado
         
          const hashedPassword = await createHash(password);
          const usuario = {
            nombre,
            apellido,
            email,
            nacimiento,
            role,
            telefono,
            password: hashedPassword,
          
          };

          // const result = await usuarioModel.create(usuario);
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
        };
        
     
        
        return done(null, usuario);
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.fd6853e95ce4c8a5",
        clientSecret: "aff259b7114a590e0c5c51ffb71f7ac4f868bbb2",
        callbackURL:"https://backend-project-q2nk.onrender.com/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          //tomo los datos del profile que me sirvan.
          const { name, email } = profile._json;
          const usuario = await usuarioService.obtenerUsuarioPor({ email });
          // const cart = await cartService.createCart();
          //Gestiono ambas logicas
          if (!usuario) {
            //si no existe usuario lo creo
            const nuevoUsuario = {
              nombre: name,
              email,
              // cart: cart._id,
              password: "",
            };
            const result = await usuarioService.crearUsuario(nuevoUsuario);
            done(null, result);
          }
          // si ya existe el usuario
          done(null, usuario);
        } catch (error) {
          done(error);
        }
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
