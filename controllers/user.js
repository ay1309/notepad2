import express from 'express';
import bcrypt from 'bcrypt';
import Usuario from '../models/user.js'; // Importación correcta del modelo

const router = express.Router();

router.post('/register', async (req, res) => {
    const { nombre_usuario, fecha_nacimiento, edad, email, contraseña } = req.body;

    try {
        const existingUser = await Usuario.findOne({ email }); // Uso correcto de findOne
        if (existingUser) {
            return res.status(400).send('El correo electrónico ya está registrado');
        }

        const passwordHash = bcrypt.hashSync(contraseña, 10);
        const newUser = new Usuario({ nombre_usuario, fecha_nacimiento, edad, email, contraseña: passwordHash });

        await newUser.save();

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(401).send('Usuario no encontrado');
        }
        if (!bcrypt.compareSync(contraseña, user.contraseña)) {
            return res.status(401).send('Contraseña incorrecta');
        }
        req.session.user = user;
        res.sendStatus(200);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error del servidor al iniciar sesión');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});

export default router;
