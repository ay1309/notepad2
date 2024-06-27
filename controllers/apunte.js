import express from 'express';
import mongoose from 'mongoose';
import Apunte from '../models/apunte.js'; // Importa el modelo de Apunte

const router = express.Router();

// Crear un nuevo apunte
router.post('/create', async (req, res) => {
    const { nombre_apunte, formato_apunte, carpeta } = req.body;

    try {
        // Convertir el valor de carpeta a ObjectId
        const carpetaId = new mongoose.Types.ObjectId(carpeta);

        const newApunte = new Apunte({ nombre_apunte, formato_apunte, carpeta: carpetaId });
        await newApunte.save();

        res.status(201).json({
            message: 'Apunte creado exitosamente',
            apunte: newApunte
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el apunte',
            error: error.message
        });
    }
});

// Obtener todos los apuntes
router.get('/all', async (req, res) => {
    try {
        const apuntes = await Apunte.find().populate('carpeta');
        res.status(200).json(apuntes);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los apuntes',
            error: error.message
        });
    }
});

// Obtener un apunte por ID
router.get('/:id', async (req, res) => {
    try {
        const apunte = await Apunte.findById(req.params.id).populate('carpeta');
        if (!apunte) {
            return res.status(404).json({ message: 'Apunte no encontrado' });
        }
        res.status(200).json(apunte);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el apunte',
            error: error.message
        });
    }
});

// Actualizar un apunte
router.put('/:id', async (req, res) => {
    const { nombre_apunte, formato_apunte, carpeta } = req.body;

    try {
        // Convertir el valor de carpeta a ObjectId
        const carpetaId = new mongoose.Types.ObjectId(carpeta);

        const updatedApunte = await Apunte.findByIdAndUpdate(req.params.id, { nombre_apunte, formato_apunte, carpeta: carpetaId }, { new: true });
        if (!updatedApunte) {
            return res.status(404).json({ message: 'Apunte no encontrado' });
        }
        res.status(200).json({
            message: 'Apunte actualizado exitosamente',
            apunte: updatedApunte
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el apunte',
            error: error.message
        });
    }
});

// Eliminar un apunte
router.delete('/:id', async (req, res) => {
    try {
        const deletedApunte = await Apunte.findByIdAndDelete(req.params.id);
        if (!deletedApunte) {
            return res.status(404).json({ message: 'Apunte no encontrado' });
        }
        res.status(200).json({
            message: 'Apunte eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el apunte',
            error: error.message
        });
    }
});

export default router;
