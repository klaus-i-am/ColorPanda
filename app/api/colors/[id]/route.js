import connectMongoDB from '@/lib/mongodb';
import Color from '@/models/colors';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        await connectMongoDB();
        const palette = await Color.findById(params.id);

        if (!palette) {
            return NextResponse.json({ error: 'Palette not found' }, { status: 404 });
        }

        return NextResponse.json({ palette });
    } catch (error) {
        console.error('Error fetching palette:', error);
        return NextResponse.json({ error: 'Failed to fetch palette' }, { status: 500 });
    }
}