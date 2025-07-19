import express from 'express';
import cors from 'cors';
import { PORT_FRONTEND } from './config';
import register from './router/auth/auth.router';



const app = express();
app.use(cors({
  origin: `http://localhost:${PORT_FRONTEND}`,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api',register)
app.get('/ping', (_req, res) => {
  res.json({ message: 'pong' });
});

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

export default app;