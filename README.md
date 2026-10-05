# Bloom Floral Studio

A one-page floral studio site with seasonal collections and MongoDB-backed workshop bookings.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to a reachable MongoDB connection string.
3. Start the app with `npm run dev` and open `http://localhost:5173`.

Bookings are validated by the Express API and inserted into the `workshopBookings` collection in the `bloom_studio` database by default. Set `MONGODB_DB` to choose another database. The booking form returns a service error if MongoDB is unavailable; it does not report an unsaved booking as confirmed.

For production, run `npm run build`, then start the server with `NODE_ENV=production` and `npm start`.
