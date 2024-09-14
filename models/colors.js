import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
    hexValue: { type: String, required: true },
    rgbValue: { type: String, required: true }
});

const paletteSchema = new mongoose.Schema({
    paletteName: { type: String, required: true },
    colors: [colorSchema]
}, { timestamps: true });

const Color = mongoose.models.Color || mongoose.model('Color', paletteSchema);

export default Color;