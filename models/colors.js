// models/colors.js
import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema(
    {
        paletteName: { type: String, required: true },
        colors: [{
            hexValue: { type: String, required: true },
            rgbValue: { type: String, required: true }
        }]
    },
    { timestamps: true }
);

colorSchema.pre('save', function(next) {
    console.log('Pre-save hook - Document to be saved:', JSON.stringify(this.toObject(), null, 2));
    next();
});

colorSchema.post('save', function(doc, next) {
    console.log('Post-save hook - Saved document:', JSON.stringify(doc.toObject(), null, 2));
    next();
});

const Color = mongoose.models.Color || mongoose.model("Color", colorSchema);

export default Color;