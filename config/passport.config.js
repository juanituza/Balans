import passport from "passport";
import config from "../src/config.js";
import local from "passport-local";

import GithubStrategy from "passport-github2";
import {
 
  usuarioService,
} from "../src/services/repositorios/index.js";
import { Strategy, ExtractJwt } from "passport-jwt";
import { cookieExtractor, createHash, validatePassword } from "../src/utils.js";

import LoggerService from "../src/dao/managers/LoggerManager.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = Strategy;


const initializePassportStrategies = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usuarionameField: "email" },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name,age, role } = req.body;
          const exist = await usuarioService.obtenerUsuarios({ email });
          // const exist = await usuarioModel.findOne({ email });

          if (exist) return done(
            null,
            false,
            { message: "Usuario existente" },
            LoggerService.error("Usuario existente")
          );
          // done(null, false, { message: "User exist" },LoggerService.error("Role not exist"));
          const hashedPassword = await createHash(password);
          // const cart = await cartService.createCart();
          const usuario = {
            first_name,
            last_name,
            age,
            email,
            // cart: cart._id,
            password: hashedPassword,
            role,
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
      { usuarionameField: "email" },
      async (email, password, done) => {
        //defino el admin
        if (email === config.admin.USER && password === config.admin.PASS) {
          const Usuario = {
            id: 0,
            name: `ADMIN`,
            role: "ADMIN",
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
          first_name: usuario.first_name,
          last_name: usuario.last_name,
          email: usuario.email,
          cart: usuario.cart,
          role: usuario.role,
          status: usuario.status,
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
              first_name: name,
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
