import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import clientPromise from '../../lib/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const client = await clientPromise;
            const db = client.db('viveros');
            const collection = db.collection('usuarios');

            const { email, password } = req.body;

            // Buscar el usuario por email
            const user = await collection.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Usuario no encontrado' });
            }

            // Verificar la contraseña
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Contraseña incorrecta' });
            }

            res.status(200).json({ message: 'Login exitoso' });
        } catch (error) {
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
