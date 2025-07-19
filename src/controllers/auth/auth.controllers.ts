import { createUser, getUserByEmail } from "../../models/auth/auth.model";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const createUserController = async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password_hash, first_name, last_name } = req.body;
        const userId = await createUser({ email, password_hash, first_name, last_name });
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId });
    } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error && typeof (error as any).message === "string") {
            if ((error as any).message === 'El usuario ya existe') {
                return res.status(409).json({ error: (error as any).message });
            }
        }
        res.status(500).json({ error: "Error interno del servidor" });
    }
}



export const loginController = async (req: any, res: any) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({ error: 'JWT_SECRET no está definido en las variables de entorno' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
}