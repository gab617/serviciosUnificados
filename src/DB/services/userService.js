const db = require("../models/db");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = async (userData) => {
  const saltRounds = 10;

  if (!userData.password) {
    throw new Error("La contraseña es obligatoria");
  }

  try {
    const user = new User(userData);
    const password_hash = await bcrypt.hash(userData.password, saltRounds);
    user.password_hash = password_hash;

    delete user.password;

    const query = "INSERT INTO users SET ?";
    return new Promise((resolve, reject) => {
      db.query(query, user, (err, result) => {
        if (err) {
          console.error("Error al insertar el usuario en la base de datos:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw new Error("No se pudo registrar el usuario");
  }
};

const authenticateUser = async (userData) => {
  const query = "SELECT * FROM users WHERE user_handle = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [userData.user_handle], async (err, results) => {
      if (err) return reject(err);

      if (results.length === 0) {
        return reject(new Error("Usuario no encontrado"));
      }

      const storedHash = results[0].password_hash;

      try {
        const passwordMatch = await bcrypt.compare(
          userData.password,
          storedHash
        );

        if (!passwordMatch) {
          return reject(new Error("Credenciales inválidas"));
        }

        resolve({
          user: userData.user_handle,
          points: results[0].points,
          points_math: results[0].points_math,
          id_user: results[0].user_id,
          best_racha: results[0].best_racha,
          best_racha_math: results[0].best_racha_math,
        });
      } catch (compareError) {
        return reject(new Error("Error al verificar la contraseña"));
      }
    });
  });
};

const getAllUsers = async () => {
  const query = "SELECT user_id, user_handle, best_racha, best_racha_math, points, points_math FROM users";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const updatePoints = async (userData) => {
  const { id_user, best_racha } = userData.userData;
  const points = userData.newPunt;
  const id = id_user;
  const newRacha = userData.rachaSession;
  const newPointsUser = userData.userData.points + points;

  const query = `
  UPDATE users
  SET
    points = ?,
    best_racha = CASE
      WHEN ? > best_racha THEN ?
      ELSE best_racha
    END
  WHERE user_id = ?;
`;

  return new Promise((resolve, reject) => {
    db.query(query, [newPointsUser, newRacha, newRacha, id], (err, results) => {
      if (err) return reject(err);
      if (results.affectedRows === 0) {
        return reject(new Error("Usuario no encontrado"));
      }
      resolve(results);
    });
  });
};

const updateMathPoints = async (userData) => {
  const { id_user, best_racha_math } = userData.userData;
  const points = userData.newPunt;
  const id = id_user;
  const newRacha = userData.rachaSession;
  const newPointsUser = userData.userData.points_math + points;

  const query = `
  UPDATE users
  SET
    points_math = ?,
    best_racha_math = CASE
      WHEN ? > best_racha_math THEN ?
      ELSE best_racha_math
    END
  WHERE user_id = ?;
`;

  return new Promise((resolve, reject) => {
    db.query(query, [newPointsUser, newRacha, newRacha, id], (err, results) => {
      if (err) return reject(err);
      if (results.affectedRows === 0) {
        return reject(new Error("Usuario no encontrado"));
      }
      resolve(results);
    });
  });
};

const deleteUser = async (userHandle) => {
  const query = "DELETE FROM users WHERE user_handle = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [userHandle], (err, result) => {
      if (err) return reject(err);
      if (result.affectedRows === 0) {
        return reject(new Error("Usuario no encontrado"));
      }
      resolve(result);
    });
  });
};

module.exports = {
  registerUser,
  authenticateUser,
  getAllUsers,
  updatePoints,
  updateMathPoints,
  deleteUser,
};
