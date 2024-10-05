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

            // Verificar si el usuario ya existe
            const userExists = await collection.findOne({ email });
            if (userExists) {
                return res.status(400).json({ error: 'El usuario ya existe' });
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar el nuevo usuario
            await collection.insertOne({
                email,
                password: hashedPassword,
            });

            res.status(201).json({ message: 'Usuario registrado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
    }
