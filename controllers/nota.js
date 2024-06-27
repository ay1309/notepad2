import express from 'express';
import mongoose from 'mongoose';
import Nota from '../models/nota.js'; // Importa el modelo de Nota

const router = express.Router();

// Crear una nueva nota
router.post('/create', async (req, res) => {
    const { contenido_nota, usuario } = req.body;

    try {
        // Convertir el valor de usuario a ObjectId
        const usuarioId = new mongoose.Types.ObjectId(usuario);

        const newNota = new Nota({ contenido_nota, usuario: usuarioId });
        await newNota.save();

        res.status(201).json({
            message: 'Nota creada exitosamente',
            nota: newNota
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear la nota',
            error: error.message
        });
    }
});

// Obtener todas las notas
router.get('/all', async (req, res) => {
    try {
        const notas = await Nota.find().populate('usuario');
        res.status(200).json(notas);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las notas',
            error: error.message
        });
    }
});

// Obtener una nota por ID
router.get('/:id', async (req, res) => {
    try {
        const nota = await Nota.findById(req.params.id).populate('usuario');
        if (!nota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.status(200).json(nota);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener la nota',
            error: error.message
        });
    }
});

// Actualizar una nota
router.put('/:id', async (req, res) => {
    const { contenido_nota, usuario } = req.body;

    try {
        // Convertir el valor de usuario a ObjectId
        const usuarioId = new mongoose.Types.ObjectId(usuario);

        const updatedNota = await Nota.findByIdAndUpdate(req.params.id, { contenido_nota, usuario: usuarioId }, { new: true });
        if (!updatedNota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.status(200).json({
            message: 'Nota actualizada exitosamente',
            nota: updatedNota
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar la nota',
            error: error.message
        });
    }
});

// Eliminar una nota
router.delete('/:id', async (req, res) => {
    try {
        const deletedNota = await Nota.findByIdAndDelete(req.params.id);
        if (!deletedNota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.status(200).json({
            message: 'Nota eliminada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar la nota',
            error: error.message
        });
    }
});

export default router;
