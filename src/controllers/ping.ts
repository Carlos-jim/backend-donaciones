import { pool } from '../db.js'


export const ping = async( res: any) => {
    const result = await pool.query('SELECT "pong" AS result')
    res.json(result[0])
}