import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
        const client = await clientPromise;
        const db = client.db('viveros');
        const collection = db.collection('DatosHumedad');

        const { timestamp, humedad, temperatura, ubicacion } = req.body;

        await collection.insertOne({
            timestamp: new Date(timestamp),
            humedad,
            temperatura,
            ubicacion,
        });

        res.status(200).json({ message: 'Datos insertados correctamente' });
        } catch (error) {
        res.status(500).json({ error: 'Error al insertar datos' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
