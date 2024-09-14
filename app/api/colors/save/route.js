import connectMongoDB from '@/lib/mongodb';
import Color from '@/models/colors';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        console.log('Received data in API:', JSON.stringify(body, null, 2));

        const { paletteName, colors } = body;
        await connectMongoDB();

        const newPalette = new Color({
            paletteName,
            colors,
            isSaved: true
        });

        console.log('New palette object:', JSON.stringify(newPalette, null, 2));

        const savedPalette = await newPalette.save();
        console.log('Saved palette:', JSON.stringify(savedPalette, null, 2));

        return NextResponse.json({ message: 'Palette saved successfully', palette: savedPalette }, { status: 201 });
    } catch (error) {
        console.error('Error saving palette:', error);
        return NextResponse.json({ error: 'Failed to save palette', details: error.message }, { status: 500 });
    }
}