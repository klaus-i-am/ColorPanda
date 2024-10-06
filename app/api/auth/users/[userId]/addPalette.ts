import { NextApiRequest, NextApiResponse } from 'next';
import connectMongodb from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  await connectMongodb();

  if (req.method === 'POST') {
    try {
      const { paletteId } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.palettes.push(paletteId);
      await user.save();

      res.status(200).json({ message: 'Palette added to user' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}