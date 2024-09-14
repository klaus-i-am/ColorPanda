// app/api/colors/route.js
import connectMongoDB from '@/lib/mongodb';
import Color from '@/models/colors';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request) {
    console.log('POST request received');
    let body;
    try {
        body = await request.json();
        console.log('Received data:', JSON.stringify(body, null, 2));
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    const { paletteName, colors } = body;

    if (!paletteName || !Array.isArray(colors) || colors.length === 0) {
        console.error('Invalid data structure:', JSON.stringify(body, null, 2));
        return NextResponse.json({ error: 'Invalid data structure. paletteName and non-empty colors array are required.' }, { status: 400 });
    }

    try {
        await connectMongoDB();
        console.log('Connected to MongoDB');

        const newPalette = new Color({
            paletteName,
            colors
        });

        console.log('New palette object created:', JSON.stringify(newPalette.toObject(), null, 2));

        const savedPalette = await newPalette.save();
        console.log('Palette saved successfully:', JSON.stringify(savedPalette.toObject(), null, 2));

        return NextResponse.json({ 
            message: 'Color palette added successfully', 
            palette: savedPalette.toObject() 
        }, { status: 201 });
    } catch (error) {
        console.error('Error saving palette:', error);
        if (error.name === 'ValidationError') {
            console.error('Validation error details:', JSON.stringify(error.errors, null, 2));
        }
        return NextResponse.json({ error: 'Failed to save color palette', details: error.message }, { status: 500 });
    }
}
export async function GET() {
    try {
        await connectMongoDB();
        const palettes = await Color.find().sort({ createdAt: -1 }).limit(10).lean();
        return NextResponse.json({ colors: palettes });
    } catch (error) {
        console.error('Error retrieving palettes:', error);
        return NextResponse.json({ error: 'Failed to retrieve color palettes' }, { status: 500 });
    }
}
// DELETE
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Color.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Color deleted successfully' }, { status: 200 });

}