import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log('Already connected to MongoDB');
            return;
        }

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}

export default connectMongoDB;