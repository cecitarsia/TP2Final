import productos from "../data/productos.js";

async function getProductos() {
  return productos.getProductos();
}

async function getProducto(id) {
  return productos.getProducto(id);
}

async function getProductosPorTipo(type) {
  return productos.getProductosPorTipo(type);
}

async function addProducto(producto) {
  return productos.addProducto(producto);
}

async function updateProducto(id, data) {
  return productos.updateProducto(id, data);
}

async function deleteProducto(id) {
  return productos.deleteProducto(id);
}

async function comprarProductos(data, id) {
  return productos.comprarProductos(data, id);
}

export default {
  getProductos,
  getProducto,
  getProductosPorTipo,
  addProducto,
  updateProducto,
  deleteProducto,
  comprarProductos
};
