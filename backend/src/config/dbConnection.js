import {Pool} from 'pg';

// Importa variáveis de ambiente do arquivo .env
import 'dotenv/config';

// Pool gerencia automaticamente múltiplas conexões para melhor performance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;