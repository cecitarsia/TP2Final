import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB;

if (!uri) {
  console.error("❌ ERROR: La variable de entorno MONGODB no está definida.");
  process.exit(1);
}

const client = new MongoClient(uri);
let instance = null;

export async function getConnection() {
  if (instance == null) {
    try {
      instance = await client.connect();
      console.log("✅ Conectado a MongoDB Atlas");
    } catch (error) {
      console.error("❌ Error de conexión a MongoDB:", error);
      process.exit(1); // Detener la app si falla la conexión
    }
  }
  return instance;
}