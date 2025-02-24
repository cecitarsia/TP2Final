import dotenv from 'dotenv';
dotenv.config();
import pkg from 'jsonwebtoken';
const { verify } = pkg;

function auth(req, res, next) {

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = verify(token, process.env.CLAVEJWT);
    req.user = { id: decodedToken._id, rol: decodedToken.rol };
    next();
  } catch (error) { 
    res.status(401).send({ error: error.message });
  }
}

export default auth;
