import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db('tu_base_de_datos');
        const collection = db.collection('humidity_data');
        const data = await collection.find({}).sort({ timestamp: -1 }).toArray();
        
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error });
    }
}
