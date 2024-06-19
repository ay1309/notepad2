import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 7000;

const mongoUri = 'mongodb+srv://plskyay1309:w8SEcKM5ghaEAJbB@cluster0.au9yjrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('strictQuery', false);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwordHash: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user; 
    }
    next();
});

//archivos estáticos del build de React
app.use(express.static(path.join(__dirname, 'notepalace/build')));

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Usuario no encontrado');
        }
        if (!bcrypt.compareSync(password, user.passwordHash)) {
            return res.status(401).send('Contraseña incorrecta');
        }
        req.session.user = user; 
        res.sendStatus(200);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error del servidor al iniciar sesión');
    }
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('El correo electrónico ya está registrado');
        }
        const passwordHash = bcrypt.hashSync(password, 10);
        const newUser = new User({ name, email, passwordHash });
        await newUser.save();
        res.sendStatus(200);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error al registrar usuario');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'notepalace/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
