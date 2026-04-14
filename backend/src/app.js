import express from "express";
import cors from "cors";
import routes from "./routes/indexRoutes.js";

const app = express();

app.use(cors());

// ALTERNATIVA: limitar CORS a uma origem específica (mais seguro)
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST'],
// }));

routes(app);

export default app;