require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');

const app = express();

const user = process.env.APP_DB_USER;
const password = process.env.APP_DB_PASSWORD;
const database = process.env.APP_DB_DATABASE;
let mongoDB = process.env.APP_DB_URI;

if (!mongoDB)
  mongoDB = `mongodb+srv://${user}:${password}@redesplus.guu0o.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

app.set('port', process.env.PORT || process.env.APP_PORT || 3055);

app.use(express.json());

app.get("/", async (req, res) => {
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((conn) => {
    console.log('Conexión exitosa a MongoDB');
    const datos  = {
      message: "Conexion exitosa ✌️",
      uri : mongoDB,
      nombre :  conn.connection.name,
      host :  conn.connection.host,
      puerto :  conn.connection.port,
      usuario :  conn.connection.user,
    }
    return res.json(datos);
  }).catch((conn, error) => {
    console.error('Error al conectar a MongoDB', error);
    const datos  = {
      message: "Conexion sin exito 😪",
      uri : mongoDB,
      conexion :  conn,
    }
    return res.json(datos);
  });
});

// * Aplicación
app.listen(app.get('port'),
  () => console.log('Server on ', app.get('port')));



