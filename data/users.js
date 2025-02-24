import { getConnection } from "./conexion.js";
import { hash, compare } from "bcrypt";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
const DATABASE = "Proyecto";
const COLLECTION_USERS = "Usuarios";
import parseObjectId from "../utils/parseObjectId.js";
import dotenv from 'dotenv';
dotenv.config();

async function getAllUsers() {
  const clientmongo = await getConnection();
  const users = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_USERS)
    .find()
    .toArray();
  return users;
}

async function addUser(user) {
  const clientmongo = await getConnection();

  const userExistente = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_USERS)
    .findOne({ email: user.email });
  
  if (userExistente) {
    throw new Error("El usuario con ese email ya existe.");
  }

  user.activo = true;
  if (!user.rol) {
    //si un usuario no tiene rol le asignamos el de usuario comun, cuando agregamos el admin con este metodo ya tiene su rol de admin
    user.rol = "usuario";
  }

  user.password = await hash(user.password, 8);

  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_USERS)
    .insertOne(user);
  return result;
}

async function addAdmin(user) {
  const clientmongo = await getConnection();
  const userExistente = await clientmongo
  .db(DATABASE)
  .collection(COLLECTION_USERS)
  .findOne({ email: user.email });

if (userExistente) {
  throw new Error("El usuario con ese email ya existe.");
}
  user.rol = "administrador";
  return addUser(user);
}


async function findByCredentials(email, password) {
  const clientmongo = await getConnection();
  const user = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_USERS)
    .findOne({ email: email });

  if (!user) {
    throw new Error("Credenciales invalidas");
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales invalidas");
  }

  return user;
}

function generateToken(user) {
  const token = sign(
    { _id: user._id, rol: user.rol },
    process.env.CLAVEJWT,
    {
      //agregamos el rol en el token para que en auth se pueda asignar
      expiresIn: "2h",
    }
  );
  return token;
}

//Solo para actualizar el mail
async function updateUser(id, user) {
  const clientmongo = await getConnection();

  const obId = parseObjectId(id);
  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_USERS)
    .updateOne({ _id: obId }, { $set: { email: user.email } });
  return result;
}

async function deleteUser(id) {
  const clientmongo = await getConnection();
  const obId = parseObjectId(id);
  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_USERS)
    .updateOne({ _id: obId }, { $set: { activo: false } });
  return result;
}

export default {
  addUser,
  addAdmin,
  getAllUsers,
  findByCredentials,
  generateToken,
  updateUser,
  deleteUser,
};
