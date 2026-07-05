const userService = require("../services/userService");

const register = async (req, res) => {
  if (req.body.password !== req.body.passwordR) {
    return res.status(400).json({ error: "Contraseñas no coinciden" });
  }

  const nwUserCredentials = {
    user_handle: req.body.user_handle,
    password: req.body.password,
  };

  try {
    const resultRegister = await userService.registerUser(req.body);
    const resultLogin = await userService.authenticateUser(nwUserCredentials);
    res.status(200).json(resultLogin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await userService.authenticateUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const uploadPointsUser = async (req, res) => {
  try {
    await userService.updatePoints(req.body);
    res.status(200).json("Puntuacion actualizada");
  } catch (error) {
    res.status(400).json({ error: "ERROR EN CONTROLLER" });
  }
};

const uploadPointsMathUser = async (req, res) => {
  try {
    await userService.updateMathPoints(req.body);
    res.status(200).json("Puntuacion math actualizada");
  } catch (error) {
    res.status(400).json({ error: "ERROR EN CONTROLLER MATH" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.user_handle);
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  uploadPointsUser,
  uploadPointsMathUser,
  deleteUser,
};
