import mongoose, { Schema } from 'mongoose';

const colorSchema = new Schema(
    {
        colorName: String,
        hexValue: String,
        rgbValue: String
    },
    { timestamps: true }
);

const Color = mongoose.models.Color || mongoose.model("Color", colorSchema);

export default Color;