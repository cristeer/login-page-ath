import express from "express";
import cors from "cors";
import routes from "./routes/indexRoutes.js";

const app = express();

app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:5173/forget', // Apenas seu site acessa
//   methods: ['GET', 'POST'],          // Apenas esses métodos permitidos
// }));

routes(app);

export default app;