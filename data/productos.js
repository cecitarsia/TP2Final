import { getConnection } from "./conexion.js";
import  addCarrito  from "./historial.js";
import historial from "./historial.js"; // Importa el objeto exportado desde historial.js
import { ObjectId } from "mongodb";
const DATABASE = "Proyecto";
const COLLECTION_PRODUCTS = "Productos";

async function getProductos() {
  const clientmongo = await getConnection();
  const productos = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS)
    .find()
    .toArray();
  return productos;
}

async function getProducto(id) {
  const clientmongo = await getConnection();
  const producto = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS)
    .find({ _id: new ObjectId(String(id)) })
    .toArray();
  return producto;
}

async function getProductosPorTipo(type) {
  const clientmongo = await getConnection();
  const productos = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS)
    .find({ tipo: type })
    .toArray();
  return productos;
}


async function addProducto(producto) {
  const clientmongo = await getConnection();
  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS)
    .insertOne(producto);
  return result;
}

async function updateProducto(id, data) {
  const clientmongo = await getConnection();

  const result = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS)
    .updateOne(
      { _id: new ObjectId(String(id)) },
      { $set: data }
    );
  return result;
}

  async function deleteProducto(id) {
    const clientmongo = await getConnection();
    const result = await clientmongo
      .db(DATABASE)
      .collection(COLLECTION_PRODUCTS)
      .deleteOne({ _id: new ObjectId(String(id)) });
    return result;
  }

async function comprarProductos(productos, userId) {
  //chequear stock, compara cant producto con stock actual
  const ids = productos.map((producto) => {
    return new ObjectId(String(producto._id));
  });
  const clientmongo = await getConnection();
  const coleccionProductos = await clientmongo
    .db(DATABASE)
    .collection(COLLECTION_PRODUCTS);
  const result = await coleccionProductos
    .find({ _id: { $in: ids } }, { projection: { stock: 1 } })
    .toArray();
  console.log(result);
  const stockSuficiente = chequearStock(productos, result);
  if (stockSuficiente) {
    restarStock(productos, coleccionProductos);
    await historial.addCarrito(productos, userId);
  }
  return stockSuficiente;
}

function chequearStock(prodReq, prodDb) {
  //si hay todos los productos en su cantidad-> suma al historial
  let stockSuficiente = true;
  let i = 0;
  while (stockSuficiente && i < prodReq.length) {
    let idProdReq = prodReq[i]._id;
    let indexProdDb = prodDb.findIndex((producto) => producto._id == idProdReq);
    if (prodReq[i].cantidad > prodDb[indexProdDb].stock) {
      stockSuficiente = false;
    }
    i++;
  }
  return stockSuficiente;
}

function restarStock(prodReq, coleccionProductos) {
  prodReq.forEach((element) => {
    coleccionProductos.updateOne(
      {
        _id: new  ObjectId(String(element._id)),
      },
      {
        $inc: { stock: -element.cantidad },
      }
    );
  });
}

export default {
  getProductos,
  getProducto,
  getProductosPorTipo,
  addProducto,
  updateProducto,
  deleteProducto,
  comprarProductos,
};
