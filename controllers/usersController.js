import createJWT from "../helpers/createJWT.js";
import User from "../models/Users.js";

const registerClients = async (req, res) => {
  const { email, isAdmin, isClient } = req.body;

  const UserExist = await User.findOne({ email: email });

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    if (isAdmin || !isClient) {
      const error = new Error("El usuario debe ser un Cliente");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      const user = new User(req.body);
      user.token = "";
      await user.save();
    }
    res.status(200).json({ msg: "Usuario creado Correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const registerAdmin = async (req, res) => {
  const { email, isAdmin, isClient } = req.body;

  const UserExist = await User.findOne({ email: email });

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    if (isClient || !isAdmin) {
      const error = new Error("El usuario debe ser un Administrador");
      return res.status(400).json({ msg: error.message, status: false });
    } else {
      const user = new User(req.body);
      user.token = "";
      await user.save();
    }
    res.status(200).json({ msg: "Usuario creado Correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("El usuario no existe");
      return res.status(400).json({ msg: error.message, status: false });
    }

    if (user.email != email) {
      const error = new Error("El email es incorrecto");
      return res.status(400).json({ msg: error.message, status: false });
    }

    if ((await user.comprobarPassword(password)) && user.email != email) {
      const error = new Error("El email y contraseña son incorrectos");
      return res.status(400).json({ msg: error.message, status: false });
    }

    if (await user.comprobarPassword(password)) {
      res.json({
        _id: user._id,
        token: createJWT(user._id),
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        isClient: user.isClient,
        isAdmin: user.isAdmin,
      });
      user.save();
    } else {
      const error = new Error("El password es incorrecto");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error);
  }
};

export { registerAdmin, registerClients, login };
