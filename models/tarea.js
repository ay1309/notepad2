import mongoose from 'mongoose';

const TareaSchema = new mongoose.Schema({
    nombre_tarea: { type: String, required: true },
    descripcion: { type: String },
    fecha_limite: { type: Date },
    completado: { type: Boolean, default: false },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    carpeta: { type: mongoose.Schema.Types.ObjectId, ref: 'Carpeta' }
});

const Tarea = mongoose.model('Tarea', TareaSchema);

export default Tarea;
