-- ============================================================================
-- 📌 SQL: Criação da Tabela de Matérias
-- DESCRIÇÃO: Script para criar a tabela 'materias' no PostgreSQL
-- ============================================================================

-- Criar tabela de matérias
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    nome VARCHAR(100) NOT NULL,
    tempo_estimado_horas INTEGER NOT NULL,
    importancia INTEGER CHECK (importancia >= 1 AND importancia <= 5),
    descricao TEXT,
    status VARCHAR(20) DEFAULT 'pendente', -- pendente, em_progresso, concluida
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Criar índices para melhorar performance nas buscas
CREATE INDEX idx_materias_user_id ON materias(user_id);
CREATE INDEX idx_materias_status ON materias(status);

-- ============================================================================
-- 📝 EXPLICAÇÃO DAS COLUNAS:
-- 
-- id: Identificador único da matéria (chave primária)
-- user_id: ID do usuário que criou (chave estrangeira para tabela usuarios)
-- nome: Nome da matéria (ex: "Cálculo I")
-- tempo_estimado_horas: Tempo estimado para conclusão em horas
-- importancia: Nível de importância de 1 a 5
-- descricao: Descrição adicional (opcional)
-- status: Estado atual da matéria (pendente/em_progresso/concluida)
-- data_criacao: Quando a matéria foi criada (automático)
-- data_atualizacao: Última atualização (automático)
--
-- ============================================================================
