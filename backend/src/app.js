// ============================================================================
// 📌 ARQUIVO: app.js
// DESCRIÇÃO: Configuração principal da aplicação Express
// FUNÇÃO: Configurar middlewares globais e registrar todas as rotas
// ============================================================================

import express from "express";

// Importa CORS - middleware que permite requisições de diferentes origens
import cors from "cors";

// Importa todas as rotas da aplicação
import routes from "./routes/indexRoutes.js";

// Cria a aplicação Express
const app = express();

// Ativa CORS em toda a aplicação (permite requisições do frontend)
app.use(cors());

// ALTERNATIVA: limitar CORS a uma origem específica (mais seguro)
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST'],
// }));

// Registrar todas as rotas da aplicação
routes(app);

// Exporta a aplicação para ser usada no server.js
export default app;