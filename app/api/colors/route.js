import connectMongoDB from '@/lib/mongodb';
import Color from '@/models/colors';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { colorName, hexValue, rgbValue } = await request.json();
    await connectMongoDB();

    await Color.create({
        colorName,
        hexValue,
        rgbValue
    });

    return NextResponse.json({ message: 'Color added successfully' }, { status: 201 });
}  

// If unable to connect to the server use "Personal hotspot" on your phone and connect to it.