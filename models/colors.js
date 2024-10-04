import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
    colorName: { type: String, required: true },
    hexValue: { type: String, required: true },
    rgbValue: { type: String, required: true }
});

const paletteSchema = new mongoose.Schema({
    paletteName: { type: String, required: true },
    colors: [colorSchema],
    isSaved: { type: Boolean, default: true }
}, { timestamps: true });
// Test
const Color = mongoose.models.Color || mongoose.model('Color', paletteSchema);

export default Color;