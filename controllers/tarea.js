import express from 'express';
import Tarea from '../models/tarea.js';
import Carpeta from '../models/carpeta.js';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('No autenticado');
    }
};

// Obtener todas las tareas del usuario autenticado
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const tareas = await Tarea.find({ usuario: userId });
    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
});

// Crear una nueva tarea
router.post('/', isAuthenticated, async (req, res) => {
  const { nombre_tarea, descripcion, fecha_limite, carpetaId } = req.body;
  const userId = req.session.user._id;

  try {
    const nuevaTarea = new Tarea({
      nombre_tarea,
      descripcion,
      fecha_limite,
      usuario: userId,
      carpeta: carpetaId
    });

    await nuevaTarea.save();

    // Si se proporciona una carpeta, añade la tarea a esa carpeta
    if (carpetaId) {
      const carpeta = await Carpeta.findById(carpetaId);
      carpeta.tareas.push(nuevaTarea._id);
      await carpeta.save();
    }

    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ message: 'Error al crear tarea' });
  }
});

export default router;
