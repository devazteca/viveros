import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { humidity, timestamp } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('tu_base_de_datos');
      const collection = db.collection('humidity_data');

      await collection.insertOne({ humidity, timestamp });

      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to save data', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
