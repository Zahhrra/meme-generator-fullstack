import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import memeRoutes from "./routes/meme.routes.js";


config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const logger = pino({ level: 'info' });
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../../frontend')));
app.use("/images", express.static(path.join(__dirname, "../../frontend/images")));


// API Routes buraya əlavə edin
// Məsələn: app.use('/api', yourRoutes);
app.use("/api", memeRoutes);


// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
