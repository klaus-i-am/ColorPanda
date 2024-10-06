import connectMongoDB from '@/lib/mongodb';
import Color from '@/models/colors';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        console.log('Received data in API:', JSON.stringify(body, null, 2));

        const { paletteName, colors, userId } = body;
        await connectMongoDB();

        // Validate and transform colors array
        if (!Array.isArray(colors) || colors.some(color => !color.rgbValue || !color.hexValue || !color.colorName)) {
            return NextResponse.json({ error: 'Invalid color data' }, { status: 400 });
        }

        const transformedColors = colors.map(color => ({
            colorName: color.colorName,
            hexValue: color.hexValue,
            rgbValue: color.rgbValue
        }));

        const newPalette = new Color({
            paletteName,
            colors: transformedColors,
            isSaved: true,
            user: userId
        });

        console.log('New palette object:', JSON.stringify(newPalette, null, 2));

        const savedPalette = await newPalette.save();
        console.log('Saved palette:', JSON.stringify(savedPalette, null, 2));

        // Update the user's document to include the new palette ID
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        user.palettes.push(savedPalette._id);
        await user.save();

        return NextResponse.json({ message: 'Palette saved successfully', palette: savedPalette }, { status: 201 });
    } catch (error) {
        console.error('Error saving palette:', error);
        return NextResponse.json({ error: 'Failed to save palette', details: error.message }, { status: 500 });
    }
}