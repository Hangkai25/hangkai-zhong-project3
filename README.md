# Sudoku Game (CS5610 Project)

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB Atlas
- ODM: Mongoose
- Security: Helmet, dotenv
- Deployment: Render

---

## Local Development

### 1. Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb+srv://HangkaiZhong:<YOUR_PASSWORD>@cluster0.y2axkec.mongodb.net/?appName=Cluster0
CLEAR_DB_ON_START=true
```

**Notes:**
- `MONGO_URI` is required to connect to MongoDB Atlas.
- `CLEAR_DB_ON_START=true` clears all existing games and highscores on server start (development/testing only).
- `.env` is ignored by git and must not be committed.

---

### 2. Start Backend

```bash
npm install
node server.js
```

Backend runs on:
```
http://localhost:3001
```

---

### 3. Start Frontend

```bash
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

Vite is configured to proxy `/api` requests to the backend.

---

## Notes
- The application uses an anonymous user model (no authentication).
- High scores are automatically created when a game is completed.
- MongoDB collections include at least `Game` and `Highscore`.
