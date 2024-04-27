import {
  usuarioService,
  comisionService,
  cursoService,
} from "../services/repositorios/index.js";
import __dirname from "../utils.js";
import usuariosDTO from "../dto/usuarioDTO.js";
import config from "../config.js";
import { MercadoPagoConfig, Preference, Payment, MerchantOrder } from "mercadopago";

const client = new MercadoPagoConfig({
  // accessToken: config.mercado_pago.TOKEN,
  accessToken:
    "APP_USR-2015520622823350-041413-f72d45a88c013437c6673c14c6cf8fdd-1771312530",
});

const createPreference = async (req, res) => {
  try {
    //  const cursoNombre = req.body.title;
    // console.log(cursoNombre);
    const userId = req.user._id; // ID del usuario en tu base de datos
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        // success: "https://www.institutobalans.com.ar/success",
        success: "http://localhost:3000/quiromasaje",
        failure: "https://www.institutobalans.com.ar/",
        pending: "https://www.institutobalans.com.ar/",
      },
      auto_return: "approved",
      notification_url:
        "https://33ee-200-114-201-139.ngrok-free.app/api/usuarios/webhook",
      metadata: {
        userId: userId, // Incluir el ID del usuario en la metadata
      },
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    // console.log(result);

    res.status(200).json({ id: result.id });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};
const webhook = async (req, res) => {
  const paymentId = req.body.data.id;

  // console.log(dataId);
//   try {
//     const { query } = req;
//     const topic = query.topic || query.type;
//     // console.log(topic);
    
//     switch(topic) {
//       case "payment":
//         const paymentId = query.id || query['data.id'];
//         // console.log(topic, 'getting payment', paymentId);
//         // Aquí es donde usarías findById para obtener la orden del comerciante asociada al pago
//         // const Payment = await Payment.findById(paymentId);
//         // console.log("MerchantOrder:", Payment);
//         res.sendStatus(200); // Respuesta OK enviada después de procesar el evento
//         break;
//       // Otros casos para manejar otros tipos de eventos si es necesario
//       default:
//         // console.log('Unhandled topic:', topic);
//         res.sendStatus(200); // Respuesta OK para otros tipos de eventos
//         break;
//     }
//   } catch (error) {
//     console.error('Error in webhook:', error);
//     res.sendStatus(500); // Enviar estado 500 en caso de error
//   }
// };


  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${client.accessToken}`,
        },
      }
    );
    // console.log(client);

    if (response.ok) {
      //paso la data a json
      const data = await response.json();
      // console.log(data);
      // console.log(data.description);
      // si el pago tiene como status aproved y accredited
      if (data.status === "approved" && data.status_detail === "accredited") {
        //Obtengo el curso que el usuario pago
        const cursoNombre = data.description;
        // console.log(data.id);
        //Obtengo el id del usuario
        const userId = data.metadata.user_id;
        //Obtengo el usuario con el userId
        const usuarioActual = await usuarioService.obtenerUsuarioPorId(userId);
        if (!usuarioActual) {
          return res.sendNotFound("Curso no encontrado");
        }
        // Buscar el curso por su nombre
        const cursoEncontrado = await cursoService.obtenerCursoPorNombre(
          cursoNombre
        );
        // Verificar si el curso existe
        if (!cursoEncontrado) {
          return res.sendNotFound("Curso no encontrado");
        }

        // Verificar si el curso ya está presente en el array de cursos del usuario
        const cursoExistente = usuarioActual.cursos.find(
          (curso) => curso._id.toString() === cursoEncontrado._id.toString()
        );

        // Si el curso no está presente, agregarlo al array de cursos del usuario
        if (!cursoExistente) {
          usuarioActual.cursos.push(cursoEncontrado);
          await usuarioService.actualizarUsuarioPorId(
            { _id: userId },
            { cursos: usuarioActual.cursos }
          );
        }

        // // Agregar el ID del curso al array cursos del usuario
        // usuarioActual.cursos.push(cursoEncontrado);
        // // console.log(req.user.cursos);
        // await usuarioService.actualizarUsuarioPorId(
        //   { _id: userId },
        //   { cursos: usuarioActual.cursos }
        // );
      } else {
        console.log("hubo un error");
      }
    }

    res.sendSuccess("ok");
      } catch (error) {
        res.sendInternalError(error);
      }
};


const obtenerUsuarios = async (req, res) => {
  const users = await usuarioService.obtenerUsuarios();
  res.sendSuccessWithPayload(users);
};

const guardarUsuario = async (req, res) => {
  try {
    const imagenRuta = req.files.map(
      (file) => `/uploads/perfil/${file.filename}`
    );
    const { nombre, apellido, email, password, nacimiento, telefono } =
      req.body;

    const user = {
      nombre,
      apellido,
      email,
      password,
      nacimiento,
      imagen: [imagenRuta],
      telefono,
    };
    if (
      !user.nombre ||
      !user.apellido ||
      !user.email ||
      !user.password ||
      !user.telefono ||
      !user.imagen
    )
      return res
        .status(400)
        .send({ status: "error", payload: "Incomplete value" });

    const result = await usersService.createUser(user);
    res.sendSuccessWithPayload({ result });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};

const editarImagen = async (req, res) => {
  const userId = req.user._id;
  
  const imagePath = req.files.map((file) => `/uploads/perfil/${file.filename}`);

  try {
    const userUpdate = await usuarioService.actualizarUsuario(
      { _id: userId },
      { imagen: imagePath }
    );
    res.sendSuccessWithPayload(userUpdate);
  } catch (error) {
    LoggerService.error;
    res.sendInternalError("Internal server error, contact the administrator");
  }
};
const adminEditarImagen = async (req, res) => {
  // obtengo el id del usuario
  const userId = req.params.uid;
  // obtengo la ruta de la imagen
  const imagePath = req.files.map((file) => `/uploads/perfil/${file.filename}`);

  try {
    // actualizo el usuario
    const userUpdate = await usuarioService.actualizarUsuario(
      { _id: userId },
      { imagen: imagePath }
    );

    res.sendSuccessWithPayload(userUpdate);
  } catch (error) {
    LoggerService.error;
    res.sendInternalError("Internal server error, contact the administrator");
  }
};

const editarUsuario = async (req, res) => {
  try {
    const userId = req.user._id;
    const userUpdate = req.body;
    const usuarioActual = await usuarioService.obtenerUsuarioPorId(userId);

    // Verifica si el campo "nombre" está presente y no es igual al valor actual
    if (userUpdate.nombre && userUpdate.nombre !== usuarioActual.nombre) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { nombre: userUpdate.nombre }
      );
    }
    if (userUpdate.apellido && userUpdate.apellido !== usuarioActual.apellido) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { apellido: userUpdate.apellido }
      );
    }
    if (userUpdate.apellido && userUpdate.apellido !== usuarioActual.apellido) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { apellido: userUpdate.apellido }
      );
    }
    if (userUpdate.telefono && userUpdate.telefono !== usuarioActual.telefono) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { telefono: userUpdate.telefono }
      );
    }
    if (userUpdate.email && userUpdate.email !== usuarioActual.email) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { email: userUpdate.email }
      );
    }
    if (userUpdate.role && userUpdate.role !== usuarioActual.role) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { role: userUpdate.role }
      );
    }
    if (
      userUpdate.nacimiento &&
      userUpdate.nacimiento !== usuarioActual.nacimiento
    ) {
      // Actualiza el nombre en la base de datos
      await usuarioService.actualizarUsuario(
        { _id: userId },
        { nacimiento: userUpdate.nacimiento }
      );
    }
    // Vuelve a obtener el usuario actualizado después de las actualizaciones
    const updatedUser = await usuarioService.obtenerUsuarioPorId(userId);

    res.sendSuccessWithPayload(updatedUser);
  } catch (error) {
    console.log(error);
    res.sendInternalError("Internal error");
  }
};

const adminEditarUsuario = async (req, res) => {
  try {
    const userId = req.params.uid;
    const userUpdate = req.body;
    const usuarioActual = await usuarioService.obtenerUsuarioPorId(userId);
    const actualizaciones = {};

    // Verificar si userUpdate es un objeto
    if (typeof userUpdate === "object" && userUpdate !== null) {
      // Iterar sobre las propiedades del objeto userUpdate
      for (let key in userUpdate) {
        // Verificar si la propiedad existe en userUpdate y es diferente de null o undefined
        if (
          Object.prototype.hasOwnProperty.call(userUpdate, key) && // Usar Object.prototype.hasOwnProperty.call para verificar la propiedad
          userUpdate[key] !== null &&
          userUpdate[key] !== undefined &&
          userUpdate[key] !== usuarioActual[key]
        ) {
          // Agregar la actualización al objeto actualizaciones
          actualizaciones[key] = userUpdate[key];
        }
      }
    }
    // Verificar si hay actualizaciones para realizar
    if (Object.keys(actualizaciones).length > 0) {
      // Realizar las actualizaciones en la base de datos
      await usuarioService.actualizarUsuario({ _id: userId }, actualizaciones);
    }
    // Vuelve a obtener el usuario actualizado después de las actualizaciones
    const updatedUser = await usuarioService.obtenerUsuarioPorId(userId);

    res.sendSuccessWithPayload(updatedUser);
  } catch (error) {
    console.log(error);
    res.sendInternalError("Internal error");
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    //obtengo el id del usuario
    const userId = req.params.uid;
    // con el userId obtengo el usuario
    const alumno = await usuarioService.obtenerUsuarioPorId(userId);

    // Verificar si el usuario está asociado a alguna comisión
    if (alumno.comisiones && alumno.comisiones.length > 0) {
      // El usuario está asociado a comisiones

      // Iterar sobre cada comisión del usuario y realizar las operaciones necesarias
      await Promise.all(
        alumno.comisiones.map(async (comisionId) => {
          // Obtener la comisión
          const comision = await comisionService.obtenerComisionPor(comisionId);

          // Buscar el índice del alumno en el array de la comisión
          const alumnoIndex = comision.alumnos.findIndex(
            (alumno) => alumno.alumno._id.toString() === userId
          );

          // Eliminar al alumno del array de alumnos de la comisión
          if (alumnoIndex !== -1) {
            comision.alumnos.splice(alumnoIndex, 1);
            // Actualizar la comisión en la base de datos
            await comisionService.actualizarComision(comisionId, comision);
          }
        })
      );
    }

    // Eliminar al usuario
    await usuarioService.eliminarUsuario({ _id: userId });

    res.sendSuccess("Usuario eliminado");
  } catch (error) {
    res.sendInternalError(
      "Error al eliminar el usuario, póngase en contacto con el administrador"
    );
  }
};

export default {
  createPreference,
  webhook,
  obtenerUsuarios,
  guardarUsuario,
  editarUsuario,
  editarImagen,
  eliminarUsuario,
  adminEditarImagen,
  adminEditarUsuario,
};
