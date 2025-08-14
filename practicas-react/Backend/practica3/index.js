const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json()); // para leer JSON en el body

const FILE_PATH = './users.json';

// Función para leer el archivo JSON
function readUsers() {
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
}

// Función para escribir en el archivo JSON
function writeUsers(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// GET /users → todos los usuarios
app.get('/users', (req, res) => {
    const users = readUsers();
    res.json(users);
});

// GET /users/:id → un usuario por ID
app.get('/users/:id', (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id == req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
});

// POST /users → agregar usuario
app.post('/users', (req, res) => {
    const users = readUsers();
    const newUser = req.body;

    // Generar ID automático si no se envía
    newUser.id = newUser.id || (users.length ? Math.max(...users.map(u => u.id)) + 1 : 1);

    users.push(newUser);
    writeUsers(users);
    res.status(201).json({ message: 'Usuario agregado', user: newUser });
});

// DELETE /users/:id → eliminar usuario
app.delete('/users/:id', (req, res) => {
    let users = readUsers();
    const index = users.findIndex(u => u.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const deletedUser = users.splice(index, 1);
    writeUsers(users);
    res.json({ message: 'Usuario eliminado', user: deletedUser[0] });
});

// PUT /users/:id → editar usuario
app.put('/users/:id', (req, res) => {
    let users = readUsers();
    const index = users.findIndex(u => u.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Mantener el mismo ID
    const updatedUser = { ...users[index], ...req.body, id: users[index].id };
    users[index] = updatedUser;

    writeUsers(users);
    res.json({ message: 'Usuario actualizado', user: updatedUser });
});

// Servidor en puerto 3002
app.listen(3002, () => {
    console.log('Servidor corriendo en http://localhost:3002');
});


/*
GET http://localhost:3002/users

GET http://localhost:3002/users/2

POST http://localhost:3002/users (enviar JSON en body)

DELETE http://localhost:3002/users/4

PUT http://localhost:3002/users/1 (enviar JSON en body)
*/