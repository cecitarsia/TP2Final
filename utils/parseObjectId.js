import { ObjectId } from "mongodb";

//Esto le aplica un try catch la creación de un ObjectId para poder filtrar todo lo que no respete el formato
//evita la excepcion y en caso de que falle devuelve null 
function parseObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return;
  }
}

export default parseObjectId;