import { pool } from '../../db';
import bcrypt from 'bcryptjs';
import { User } from '../../type/user';



export const createUser = async (user: User) => {
    const { email, password_hash } = user;
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if ((rows as any[]).length > 0) throw new Error('El usuario ya existe');
    const hashPass = await bcrypt.hash(password_hash, 10);
    const [result]: any = await pool.query(
        'INSERT INTO users(email, password_hash, first_name, last_name) VALUES (?, ?)',
        [email, hashPass]
    );
    return result?.insertId;
}

export const getUserByEmail = async (email: string) => {
    const [rows]: [any[], any] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}