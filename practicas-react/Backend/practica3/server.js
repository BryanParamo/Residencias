const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
// Middleware para interpretar el body de las peticiones como JSON
app.use(express.json());

// Ruta absoluta al archivo JSON para evitar problemas de ubicación
const USERS_FILE_PATH = path.join(__dirname, 'users.json');

// --- Funciones de Utilidad para Manejar el Archivo ---

/**
 * Lee y parsea el archivo de usuarios.
 * @returns {Array} Un array de usuarios. Si hay un error, devuelve un array vacío.
 */
function readUsersFromFile() {
    try {
        const data = fs.readFileSync(USERS_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo de usuarios:", error);
        // Si el archivo no existe o hay otro error, empezamos con una lista vacía.
        return [];
    }
}

/**
 * Escribe el array de usuarios en el archivo JSON.
 * @param {Array} usersData - El array de usuarios a guardar.
 */
function writeUsersToFile(usersData) {
    try {
        // Usamos null, 2 para formatear el JSON y que sea legible
        fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(usersData, null, 2), 'utf8');
    } catch (error) {
        console.error("Error al guardar en el archivo de usuarios:", error);
    }
}

// --- Definición de Rutas (Endpoints) ---

// [GET] /users -> Retorna todos los usuarios
app.get('/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

// [GET] /users/:id -> Retorna un usuario por su ID
app.get('/users/:id', (req, res) => {
    const users = readUsersFromFile();
    const userId = parseInt(req.params.id, 10); // Convertimos el parámetro a número
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
});

// [POST] /users -> Agrega un nuevo usuario
app.post('/users', (req, res) => {
    const users = readUsersFromFile();
    const newUser = req.body;

    // Validación simple del body
    if (!newUser.username || !newUser.password || !newUser.email) {
        return res.status(400).json({ error: 'Los campos username, password y email son requeridos.' });
    }

    // Generamos el nuevo ID en el servidor
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    const userToAdd = {
        id: newId,
        ...newUser
    };

    users.push(userToAdd);
    writeUsersToFile(users);

    res.status(201).json({ message: 'Usuario agregado correctamente', user: userToAdd });
});

// [PUT] /users/:id -> Actualiza un usuario existente
app.put('/users/:id', (req, res) => {
    const users = readUsersFromFile();
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const originalUser = users[userIndex];
    const updatedUser = {
        ...originalUser, // Mantenemos los datos originales
        ...req.body,       // Sobrescribimos con los datos nuevos
        id: originalUser.id // Nos aseguramos de que el ID no cambie
    };

    users[userIndex] = updatedUser;
    writeUsersToFile(users);

    res.json({ message: 'Usuario actualizado correctamente', user: updatedUser });
});

// [DELETE] /users/:id -> Elimina un usuario
app.delete('/users/:id', (req, res) => {
    let users = readUsersFromFile();
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // `splice` elimina el elemento y lo devuelve dentro de un array
    const [deletedUser] = users.splice(userIndex, 1);
    writeUsersToFile(users);

    res.json({ message: 'Usuario eliminado correctamente', user: deletedUser });
});


// Iniciar el servidor
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


/*
GET http://localhost:3002/users

GET http://localhost:3002/users/2

POST http://localhost:3002/users (enviar JSON en body)

DELETE http://localhost:3002/users/4

PUT http://localhost:3002/users/1 (enviar JSON en body)
*/