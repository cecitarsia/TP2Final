import { getConnection } from "./conexion.js";
const DATABASE = "Proyecto";
const COLLECTION_HISTORIAL = "Historial";
const COLLECTION_PRODUCTOS = "Productos";
import { ObjectId } from "mongodb";


// item = {
//     _id: id,
//     titulo: String,
//     cantidad: int,
//     precioUnitario,
// }

async function getHistorial(id) {
  const clientmongo = await getConnection();
  const historial = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_HISTORIAL)
    .find({ userId: id })
    .toArray();
  return historial;
}

async function addCarrito(productos, userId) {
  const clientmongo = await getConnection();

  const productosEnriched = await Promise.all(
    productos.map(async (item) => {
      const id = item._id || item.id;
      if (!id) {
        throw new Error("Cada producto debe incluir un id.");
      }
      let fullProduct;
      try {
        fullProduct = await clientmongo
          .db(DATABASE)
          .collection(COLLECTION_PRODUCTOS)
          .findOne({ _id: new ObjectId(String(id)) });
      } catch (err) {
        throw new Error(`Error al convertir el id ${id}: ${err.message}`);
      }
      if (!fullProduct) {
        throw new Error(`Producto con id ${id} no encontrado.`);
      }
      return {
        producto: fullProduct, // toda la información del producto
        cantidad: item.cantidad || 1,
      };
    })
  );

  const fecha = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  const carritoEnDb = {
    userId,
    productos: productosEnriched,
    fecha,
  };

  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_HISTORIAL)
    .insertOne(carritoEnDb);
  return result;
}


export default {
  addCarrito,
  getHistorial,
};
