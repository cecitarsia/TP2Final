import historial from "../data/historial.js";

async function getHistorial(id) {
  return historial.getHistorial(id);
}

async function addCarrito(productos, userId) {
  return historial.addCarrito(productos, userId);
}

export default {
  getHistorial,
  addCarrito,
};