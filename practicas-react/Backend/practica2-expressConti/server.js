const express = require('express');
const app = express();
const port = 3002;

// Middleware para leer JSON en POST/PUT
app.use(express.json());

// GET básico
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// GET con parámetros en query
app.get('/saludo', (req, res) => {
  const { name, lastName } = req.query;

  if (!name || !lastName) {
    return res.status(400).send('Faltan parámetros name y lastName');
  }

  res.send(`Hola ${name} ${lastName}`);
});

// Rutas /users para CRUD básico
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'María', lastName: 'López' },
    { id: 2, name: 'Juan', lastName: 'Pérez' },
    { id: 3, name: 'Ana', lastName: 'García' }
  ];
  
  res.json(users);
});


app.post('/users', (req, res) => {
  res.send('POST: Crear un nuevo usuario');
});

app.put('/users', (req, res) => {
  res.send('PUT: Actualizar un usuario');
});

app.delete('/users', (req, res) => {
  res.send('DELETE: Eliminar un usuario');
});

// Middleware 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).send('Error 404: Ruta no encontrada');
});

// Un solo app.listen
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


//http://localhost:3002/saludo?name=Maria&lastName=Lopez
//http://localhost:3002/
//http://localhost:3002/users