import connectMongoDB from '@/lib/mongodb';
import Color from '@/models/colors';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectMongoDB();
        console.log('Connected to MongoDB');

        const allPalettes = await Color.find();
        console.log('All palettes:', JSON.stringify(allPalettes, null, 2));

        const savedPalettes = await Color.find({ isSaved: true }).sort({ createdAt: -1 });
        console.log('Saved palettes:', JSON.stringify(savedPalettes, null, 2));

        return NextResponse.json({ colors: savedPalettes });
    } catch (error) {
        console.error('Error fetching saved palettes:', error);
        return NextResponse.json({ error: 'Failed to fetch saved palettes' }, { status: 500 });
    }
}