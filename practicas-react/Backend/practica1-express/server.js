const express = require('express');
const app = express();
const port = 3002;

// Endpoint que responde "Hello World!!"
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// Endpoint que recibe name y lastName desde query params
app.get('/saludo', (req, res) => {
  const { name, lastName } = req.query;

  if (!name || !lastName) {
    return res.status(400).send('Faltan parámetros name y lastName');
  }

  res.send(`Hola ${name} ${lastName}`);
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


// http://localhost:3002/saludo?name=Maria&lastName=Lopez