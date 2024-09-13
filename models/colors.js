import mongoose, { Schema } from 'mongoose';

const colorSchema = new Schema(
    {
        paletteName: { type: String, default: 'Unnamed Palette' },
        colors: [{
            hexValue: { type: String, required: true },
            rgbValue: String
        }],
        tags: [String]
    },
    { timestamps: true }
);

const Color = mongoose.models.Color || mongoose.model("Color", colorSchema);

export default Color;