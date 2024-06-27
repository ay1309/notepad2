import mongoose from 'mongoose';

const NotaSchema = new mongoose.Schema({
    contenido_nota: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

const Nota = mongoose.model('Nota', NotaSchema);

export default Nota;
