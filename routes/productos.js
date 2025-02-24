import { Router } from "express";
import { getConnection } from "../data/conexion.js";
const router = Router();
import productosController from "../controllers/productos.js";
import auth from "../midlewares/auth.js";
import authadministrator from "../midlewares/authadministrator.js";


router.get("/", async function (req, res, next) {
  const productos = await productosController.getProductos();
  res.json(productos);
});

router.get("/filter", async (req, res) => {
  const productos = await productosController.getProductosPorTipo(req.query.tipo);
  res.json(productos);
});


router.post("/", auth, authadministrator, async (req, res) => {
  const result = await productosController.addProducto(req.body);
  res.json(result);
});

router.put("/:id", auth, authadministrator, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productosController.updateProducto(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", auth, authadministrator, async (req, res) => {
  const result = await productosController.deleteProducto(req.params.id);
  res.json(result);
});

// router.post("/comprar", auth, async (req, res) => {
//   const result = await productosController.comprarProductos(
//     req.body.productos,
//     req.body._id
//   );
//   res.json(result);
// });

router.get("/:id", async (req, res) => {
  const producto = await productosController.getProducto(req.params.id);
  res.json(producto);
});

export default router;
