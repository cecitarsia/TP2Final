import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import productosRouter from "./routes/productos.js";
import historialRouter from "./routes/historial.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var app = express();

app.use(express.static(path.join(__dirname, "public"))); //sirve para servir archivos estaticos
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/productos", productosRouter);
app.use("/api/historial", historialRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "error" });
});

export default app;
