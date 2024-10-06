import mongoose from 'mongoose';
import colorSchema from './colors';

const paletteSchema = new mongoose.Schema({
    paletteName: { type: String, required: true },
    colors: [colorSchema],
    isSaved: { type: Boolean, default: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Palette = mongoose.models.Palette || mongoose.model('Palette', paletteSchema);

export default Palette;