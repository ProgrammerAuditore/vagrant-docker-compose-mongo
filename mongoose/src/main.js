const express = require("express");
const mongoose = require('mongoose');

const app = express();

const mongoDB = "mongodb://user_vagrant:pass@localhost:27077/db_vagrant?authSource=admin";

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



