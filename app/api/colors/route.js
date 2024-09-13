// app/api/colors/route.js
import connectMongoDB from '@/lib/mongodb';
import Color from '@/models/colors';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json();
    console.log('Received data:', JSON.stringify(body, null, 2));

    const { paletteName, colors, tags } = body;
    await connectMongoDB();

    if (!colors || colors.length < 1) {
        return NextResponse.json({ error: 'At least one color is required' }, { status: 400 });
    }

    try {
        const newPalette = await Color.create({
            paletteName,
            colors,
            tags
        });

        console.log('Saved palette:', JSON.stringify(newPalette, null, 2));

        return NextResponse.json({ message: 'Color palette added successfully', palette: newPalette }, { status: 201 });
    } catch (error) {
        console.error('Error saving palette:', error);
        return NextResponse.json({ error: 'Failed to save color palette' }, { status: 500 });
    }
}

export async function GET() {
    await connectMongoDB();
    const palettes = await Color.find().sort({ createdAt: -1 }).limit(10);
    console.log('Retrieved palettes:', JSON.stringify(palettes, null, 2));
    return NextResponse.json({ colors: palettes });
}
// DELETE
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Color.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Color deleted successfully' }, { status: 200 });

}