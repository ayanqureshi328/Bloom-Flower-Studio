import 'dotenv/config';
import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT) || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let mongoClient;
let mongoDatabase;

app.use(express.json({ limit: '10kb' }));

async function getBookingsCollection() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MongoDB is not configured. Set MONGODB_URI in your environment.');
  }

  if (!mongoDatabase) {
    mongoClient = new MongoClient(process.env.MONGODB_URI);
    await mongoClient.connect();
    mongoDatabase = mongoClient.db(process.env.MONGODB_DB || 'bloom_studio');
  }

  return mongoDatabase.collection('workshopBookings');
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/api/bookings', async (request, response) => {
  const { name, email, date, guests, workshop } = request.body ?? {};
  const guestCount = Number(guests);
  const parsedDate = typeof date === 'string' ? new Date(`${date}T12:00:00`) : null;

  if (
    typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100 ||
    typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !parsedDate || Number.isNaN(parsedDate.getTime()) || parsedDate < new Date(new Date().toDateString()) ||
    !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 8 ||
    typeof workshop !== 'string' || !['The Art of Arranging', 'A Seasonal Table'].includes(workshop)
  ) {
    return response.status(400).json({ error: 'Please check your details and choose a valid workshop date.' });
  }

  try {
    const collection = await getBookingsCollection();
    const booking = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      date: parsedDate,
      guests: guestCount,
      workshop,
      createdAt: new Date(),
    };
    const result = await collection.insertOne(booking);
    return response.status(201).json({ bookingId: result.insertedId.toString() });
  } catch (error) {
    console.error('Booking could not be saved:', error.message);
    return response.status(503).json({ error: 'We could not save your booking right now. Please try again shortly.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*path', (_request, response) => response.sendFile(path.join(distPath, 'index.html')));
}

const server = app.listen(port, () => {
  console.log(`Bloom Floral Studio server listening on http://localhost:${port}`);
});

async function shutdown() {
  server.close();
  await mongoClient?.close();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
