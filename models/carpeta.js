import mongoose from 'mongoose';

const CarpetaSchema = new mongoose.Schema({
    nombre_carpeta: { type: String, required: true },
    carpetaPadre: { type: mongoose.Schema.Types.ObjectId, ref: 'Carpeta' },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

const Carpeta = mongoose.model('Carpeta', CarpetaSchema);

export default Carpeta;
