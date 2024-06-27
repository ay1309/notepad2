import express from 'express';
import mongoose from 'mongoose';
import Carpeta from '../models/carpeta.js'; // Importa el modelo de Carpeta

const router = express.Router();

// Crear una nueva carpeta
router.post('/create', async (req, res) => {
    const { nombre_carpeta, carpetaPadre, usuario } = req.body;

    try {
        // Convertir los valores a ObjectId
        const carpetaPadreId = carpetaPadre ? new mongoose.Types.ObjectId(carpetaPadre) : null;
        const usuarioId = new mongoose.Types.ObjectId(usuario);

        const newCarpeta = new Carpeta({ nombre_carpeta, carpetaPadre: carpetaPadreId, usuario: usuarioId });
        await newCarpeta.save();

        res.status(201).json({
            message: 'Carpeta creada exitosamente',
            carpeta: newCarpeta
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear la carpeta',
            error: error.message
        });
    }
});

// Obtener todas las carpetas
router.get('/all', async (req, res) => {
    try {
        const carpetas = await Carpeta.find().populate('carpetaPadre').populate('usuario');
        res.status(200).json(carpetas);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las carpetas',
            error: error.message
        });
    }
});

// Obtener una carpeta por ID
router.get('/:id', async (req, res) => {
    try {
        const carpeta = await Carpeta.findById(req.params.id).populate('carpetaPadre').populate('usuario');
        if (!carpeta) {
            return res.status(404).json({ message: 'Carpeta no encontrada' });
        }
        res.status(200).json(carpeta);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener la carpeta',
            error: error.message
        });
    }
});

// Actualizar una carpeta
router.put('/:id', async (req, res) => {
    const { nombre_carpeta, carpetaPadre, usuario } = req.body;

    try {
        // Convertir los valores a ObjectId
        const carpetaPadreId = carpetaPadre ? new mongoose.Types.ObjectId(carpetaPadre) : null;
        const usuarioId = new mongoose.Types.ObjectId(usuario);

        const updatedCarpeta = await Carpeta.findByIdAndUpdate(req.params.id, { nombre_carpeta, carpetaPadre: carpetaPadreId, usuario: usuarioId }, { new: true });
        if (!updatedCarpeta) {
            return res.status(404).json({ message: 'Carpeta no encontrada' });
        }
        res.status(200).json({
            message: 'Carpeta actualizada exitosamente',
            carpeta: updatedCarpeta
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar la carpeta',
            error: error.message
        });
    }
});

// Eliminar una carpeta
router.delete('/:id', async (req, res) => {
    try {
        const deletedCarpeta = await Carpeta.findByIdAndDelete(req.params.id);
        if (!deletedCarpeta) {
            return res.status(404).json({ message: 'Carpeta no encontrada' });
        }
        res.status(200).json({
            message: 'Carpeta eliminada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar la carpeta',
            error: error.message
        });
    }
});

export default router;
