import moment from "moment";



const contactoView = async (req, res) => {
  const userData = req.user;
  res.render("contacto", {
    user: userData,
  });
};

const nosotrosView = async (req, res) => {
  const userData = req.user;
  res.render("nosotros", {
    user: userData,
  });
};

const perfilView = async (req, res) => {
  const userData = req.user;
 const fechaNacimiento = moment(userData.nacimiento).format("DD-MM-YYYY");
  res.render("perfil", {
    user: userData,
    nacimiento : fechaNacimiento,
  });
};

export default {
  contactoView,
  nosotrosView,
  perfilView,
};
