import mongoose from 'mongoose';

const ApunteSchema = new mongoose.Schema({
    nombre_apunte: { type: String, required: true },
    formato_apunte: { type: String, required: true },
    carpeta: { type: mongoose.Schema.Types.ObjectId, ref: 'Carpeta', required: true }
});

const Apunte = mongoose.model('Apunte', ApunteSchema);

export default Apunte;
