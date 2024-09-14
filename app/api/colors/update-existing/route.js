import connectMongoDB from '@/lib/mongodb';
import Color from '@/models/colors';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectMongoDB();
        const result = await Color.updateMany(
            { isSaved: { $exists: false } },
            { $set: { isSaved: true } }
        );
        console.log(`Updated ${result.modifiedCount} documents`);
        return NextResponse.json({ message: `Updated ${result.modifiedCount} documents` }, { status: 200 });
    } catch (error) {
        console.error('Error updating documents:', error);
        return NextResponse.json({ error: 'Failed to update documents' }, { status: 500 });
    }
}