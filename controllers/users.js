import users from "../data/users.js";

async function getAllUsers() {
  return users.getAllUsers();
}

async function addUser(user) {
  return users.addUser(user);
}

async function addAdmin(user) {
  return users.addAdmin(user);
}

async function findByCredentials(email, password) {
  const user = await users.findByCredentials(email, password);
  const token = users.generateToken(user);
  return { token };
}

function generateToken(user) {
  return users.generateToken(user);
}

async function updateUser(id, user) {
  return users.updateUser(id, user);
}

async function deleteUser(id) {
  return users.deleteUser(id);
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
