import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    nombre_usuario: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;
