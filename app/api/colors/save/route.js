import connectMongoDB from '@/lib/mongodb';
import Color from '@/models/colors';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        console.log('Received data in API:', body);

        const { paletteName, colors } = body;
        await connectMongoDB();

        // Validate the data
        if (!paletteName || !Array.isArray(colors) || colors.length === 0) {
            console.log('Invalid data structure:', { paletteName, colors });
            return NextResponse.json({ error: 'Invalid palette data' }, { status: 400 });
        }

        // Ensure each color has hexValue and rgbValue
        const validColors = colors.every(color => color.hexValue && color.rgbValue);
        if (!validColors) {
            console.log('Invalid color data:', colors);
            return NextResponse.json({ error: 'Invalid color data' }, { status: 400 });
        }

        const newPalette = new Color({
            paletteName,
            colors
        });

        const savedPalette = await newPalette.save();
        console.log('Saved palette:', savedPalette);

        return NextResponse.json({ message: 'Palette saved successfully', palette: savedPalette }, { status: 201 });
    } catch (error) {
        console.error('Error saving palette:', error);
        return NextResponse.json({ error: 'Failed to save palette', details: error.message }, { status: 500 });
    }
}