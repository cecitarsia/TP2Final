import { Router } from "express";
const router = Router();
import historialController from "../controllers/historial.js";
import productosController from "../controllers/productos.js";
import auth from "../midlewares/auth.js";

// Ruta GET para obtener historial usando el id del token
router.get("/", auth, async function (req, res, next) {
  try {
    const historial = await historialController.getHistorial(req.user.id);
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  // Comprar productos
  router.post("/", auth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productos } = req.body;
    
  // Llamamos a la función que procesa la compra completa:
  const stockSuficiente = await productosController.comprarProductos(productos, userId);
  if (stockSuficiente) {
    res.status(201).json({ message: "Compra exitosa" });
  } else {
    res.status(400).json({ error: "Stock insuficiente para la compra" });
  }
} catch (error) {
  res.status(500).json({ error: error.message });
}
});


//     const result = await historialController.addCarrito(productos, userId);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

export default router;
