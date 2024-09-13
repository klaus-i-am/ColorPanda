import connectMongoDB from '@/lib/mongodb';
import Color from '@/models/colors';
import {NextResponse} from 'next/server';

// PUT
export async function PUT(request, {params}) {
    const {id} = params;
    const {newColorName: colorName, newHexValue: hexValue, newRgbValue: rgbValue} = await request.json();
    await connectMongoDB();
    await Color.findByIdAndUpdate(id, {
        colorName,
        hexValue,
        rgbValue,
    });
    return NextResponse.json({ 
        message: 'Color updated successfully!',
    },
    {
        status: 200,
    });
}

// GET by ID
export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const color = await Color.findOne({ _id: id });

    return NextResponse.json({ color }, { status: 200 })
}