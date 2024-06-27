import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './controllers/user.js'; // Importa las rutas de usuario
import apunteRoutes from './controllers/apunte.js'; // Importa las rutas de apunte
import carpetaRoutes from './controllers/carpeta.js'; // Importa las rutas de carpeta
import notaRoutes from './controllers/nota.js'; // Importa las rutas de nota

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 7000;

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1); // Exit the application
}

mongoose.connect(mongoUri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    });

app.use(cors()); // Añade el middleware de CORS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user; 
    }
    next();
});

// Archivos estáticos del build de React
app.use(express.static(path.join(__dirname, 'notepalace/build')));

// Usa las rutas de usuario
app.use('/api/user', userRoutes);

// Usa las rutas de apunte
app.use('/api/apunte', apunteRoutes);

// Usa las rutas de carpeta
app.use('/api/carpeta', carpetaRoutes);

// Usa las rutas de nota
app.use('/api/nota', notaRoutes);

app.get('/notas', (req, res) => {
    res.sendFile(path.join(__dirname, 'notepalace/build', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'notepalace/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
