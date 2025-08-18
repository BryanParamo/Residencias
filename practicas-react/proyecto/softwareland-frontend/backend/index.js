const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Joi = require('joi');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const dbPath = path.join(__dirname, 'db.json');

// --- Lectura/Escritura de la Base de Datos ---
const readDB = async () => JSON.parse(await fs.readFile(dbPath, 'utf-8'));
const writeDB = async (data) => fs.writeFile(dbPath, JSON.stringify(data, null, 2));

// --- Configuración de Multer para la subida de archivos ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// --- Esquema de Validación con Joi ---
const residenteSchema = Joi.object({
  nombre: Joi.string().min(1).required(),
  apellido: Joi.string().min(1).required(),
  genero: Joi.string().valid('Masculino', 'Femenino').required(),
  fecha_nacimiento: Joi.date().max('now').required(),
  telefono: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  correo: Joi.string().email().required(),
  instituto: Joi.string().min(1).required(),
  carrera: Joi.string().valid(
    'Ingenieria en Sistemas Computacionales',
    'Ingenieria en Tecnologias de la Informacion',
    'Ingenieria en Informatica',
    'Ingenieria en Gestion Empresarial'
  ).required(),
  lenguajes: Joi.object().pattern(Joi.string(), Joi.boolean()).required(),
  notas: Joi.string().allow('').optional()
});

// --- Endpoints de la API ---

// GET /api/residentes - Obtener todos
app.get('/api/residentes', async (req, res) => {
  const residentes = await readDB();
  res.json(residentes);
});

// GET /api/residentes/:id - Obtener uno
app.get('/api/residentes/:id', async (req, res) => {
  const residentes = await readDB();
  const residente = residentes.find(r => r.id === parseInt(req.params.id));
  if (!residente) return res.status(404).json({ message: 'Residente no encontrado' });
  res.json(residente);
});

// POST /api/residentes - Crear
app.post('/api/residentes', upload.single('foto'), async (req, res) => {
  try {
    const { body, file } = req;
    body.lenguajes = JSON.parse(body.lenguajes); // Convertir string a objeto
    const { error, value } = residenteSchema.validate(body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const residentes = await readDB();
    const newId = (residentes[residentes.length - 1]?.id || 0) + 1;
    const nuevoResidente = {
      ...value,
      id: newId,
      foto: file ? `/uploads/${file.filename}` : null
    };
    residentes.push(nuevoResidente);
    await writeDB(residentes);
    res.status(201).json(nuevoResidente);
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// PUT /api/residentes/:id - Actualizar
app.put('/api/residentes/:id', upload.single('foto'), async (req, res) => {
  try {
    const { body, file } = req;

    // --- LÓGICA MEJORADA ---
    // Si 'lenguajes' es un arreglo, tomamos el último elemento.
    if (Array.isArray(body.lenguajes)) {
      body.lenguajes = body.lenguajes[body.lenguajes.length - 1];
    }
    
    // Si 'lenguajes' es un string, lo convertimos a objeto.
    if (body.lenguajes && typeof body.lenguajes === 'string') {
      body.lenguajes = JSON.parse(body.lenguajes);
    }

    const { error, value } = residenteSchema.validate(body);
    if (error) {
      console.error('Error de validación de Joi:', error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    const residentes = await readDB();
    const index = residentes.findIndex(r => r.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'Residente no encontrado' });
    }

    const residenteActualizado = { ...residentes[index], ...value };
    if (file) {
      residenteActualizado.foto = `/uploads/${file.filename}`;
    }

    residentes[index] = residenteActualizado;
    await writeDB(residentes);
    res.json(residenteActualizado);
  } catch (err) {
    console.error('¡ERROR EN EL ENDPOINT PUT!:', err); 
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// DELETE /api/residentes/:id - Eliminar
app.delete('/api/residentes/:id', async (req, res) => {
  const residentes = await readDB();
  const nuevosResidentes = residentes.filter(r => r.id !== parseInt(req.params.id));
  if (residentes.length === nuevosResidentes.length) {
    return res.status(404).json({ message: 'Residente no encontrado' });
  }
  await writeDB(nuevosResidentes);
  res.json({ message: 'Residente eliminado' });
});

// --- Iniciar Servidor ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));