require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');

const app = express();

let mongoDB = process.env.APP_DB_URI;

if(!mongoDB)
  mongoDB = `mongodb+srv://${user}:${password}@redesplus.guu0o.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

app.set('port', process.env.PORT || process.env.APP_PORT || 3077);

app.use(express.json());

app.get("/", async (req, res) => {
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('Conexión exitosa a MongoDB');
        return res.json({ message: "Conexion exitosa ✌️"  });
      }).catch((error) => {
        console.error('Error al conectar a MongoDB', error);
        return res.json({ message: "Conexion sin exito 😪" });
      });
});

// * Aplicación
app.listen(app.get('port'), 
() => console.log('Server on ', app.get('port')));



