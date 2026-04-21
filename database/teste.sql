CREATE TABLE materias(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES usuarios(id),
    nome VARCHAR(60) NOT NULL,
    prioridade INTEGER NOT NULL,
    tempo_estudo INTEGER NOT NULL,
    descricao TEXT,
    materiaCreated DEFAULT CURRENT_TIMESTAMP
);