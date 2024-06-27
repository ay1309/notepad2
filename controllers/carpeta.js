import express from 'express';
import Carpeta from '../models/carpeta.js';

const router = express.Router();

// Crear una nueva carpeta
router.post('/', async (req, res) => {
  const { nombre_carpeta } = req.body;
  const userId = req.session.user._id;

  try {
    const nuevaCarpeta = new Carpeta({
      nombre_carpeta,
      usuario: userId
    });

    await nuevaCarpeta.save();
    res.status(201).json(nuevaCarpeta);
  } catch (error) {
    console.error('Error al crear carpeta:', error);
    res.status(500).json({ message: 'Error al crear carpeta' });
  }
});

export default router;
