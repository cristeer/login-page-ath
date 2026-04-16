# ✅ CHECKLIST DE IMPLEMENTAÇÃO E TESTE

## 📋 Pré-Requisitos

- [ ] PostgreSQL instalado e rodando
- [ ] Node.js + npm instalados
- [ ] VS Code aberto no projeto
- [ ] Consegue rodar `npm run dev` em backend e frontend

---

## 🔧 Passo 1: Banco de Dados (5 min)

### 1.1 Executar SQL
- [ ] Abra DBeaver, pgAdmin ou psql
- [ ] Copie o SQL de `database/criar_materias.sql`
- [ ] Execute o script
- [ ] Verifique se a tabela foi criada

**Para verificar:**
```sql
\dt  -- Lista todas as tabelas
SELECT * FROM materias;  -- Verifica se está vazia (OK!)
```

---

## 🔙 Passo 2: Backend (5 min)

### 2.1 Verificar Arquivos Criados
- [ ] `backend/src/models/materiaModel.js` existe
- [ ] `backend/src/controllers/materiaController.js` existe
- [ ] `backend/src/routes/materiaRoutes.js` existe
- [ ] `backend/src/routes/indexRoutes.js` foi atualizado (import + register)

### 2.2 Iniciar Backend
```bash
cd backend
npm run dev
```

Deve aparecer no terminal:
```
✓ Server rodando em porta 3000
```

- [ ] Backend iniciou sem erros
- [ ] Está ouvindo na porta 3000

---

## 🎨 Passo 3: Frontend (5 min)

### 3.1 Verificar Arquivos Criados
- [ ] `frontend/src/services/materiaService.js` existe
- [ ] `frontend/src/components/Home.vue` foi atualizado

### 3.2 Iniciar Frontend
Em outro terminal:
```bash
cd frontend
npm run dev
```

Deve aparecer:
```
┌─────────────────────────────────────────────────────────┐
│  Local:        http://localhost:5173                   │
└─────────────────────────────────────────────────────────┘
```

- [ ] Frontend iniciou sem erros
- [ ] Pode acessar http://localhost:5173

---

## 🧪 Passo 4: Testes no Navegador (10 min)

### 4.1 Login
- [ ] Acesse http://localhost:5173
- [ ] Faça login com suas credenciais
- [ ] Redirecionou para /home? ✓

### 4.2 Página Inicial
Na página inicial você deveria ver:
- [ ] Header com navegação (Home, About, Contact)
- [ ] Botão "Sair" no canto direito
- [ ] Título "Minhas Matérias"
- [ ] Botão "+ Adicionar Matéria"

### 4.3 Adicionar Matéria
- [ ] Clique em "+ Adicionar Matéria"
- [ ] Formulário aparece com os campos:
  - [ ] Nome da Matéria
  - [ ] Tempo Estimado (horas)
  - [ ] Importância (1-5)
  - [ ] Descrição
  - [ ] Botão "Adicionar Matéria"

### 4.4 Preencher Formulário (Teste #1: Validação)
Deixe o campo "Nome" vazio e clique em "Adicionar":
- [ ] Aviso do navegador aparece ("Este campo é obrigatório")

Preencha apenas:
- [ ] Nome: "Cálculo I"
- [ ] Clique em "Adicionar"
- [ ] Erro aparece: "Nome, tempo estimado e importância são obrigatórios"

### 4.5 Preencher Completo
Agora preencha TUDO:
- [ ] Nome: "Cálculo I"
- [ ] Tempo: 40
- [ ] Importância: 5
- [ ] Descrição: "Estudo de limites e derivadas"
- [ ] Clique em "Adicionar Matéria"

Resultado esperado:
- [ ] Mensagem verde: "Matéria adicionada com sucesso!"
- [ ] Formulário limpa
- [ ] Um novo CARD aparece na listagem

### 4.6 Verificar Card
O card deve mostrar:
- [ ] Título: "Cálculo I"
- [ ] Badges: Importância (⭐ 5/5) e Status (Pendente)
- [ ] Descrição: "Estudo de limites..."
- [ ] Tempo: "⏱️ 40h"
- [ ] Data: Data de hoje
- [ ] 3 Botões: "Iniciar", "Editar", "Deletar"

### 4.7 Testar Botão "Iniciar"
- [ ] Clique no botão "Iniciar"
- [ ] Alerta aparece com:
  - [ ] Nome da matéria
  - [ ] Tempo estimado
  - [ ] Importância
- [ ] Clique OK
- [ ] Badge de status muda para "Em Progresso" (azul)

### 4.8 Testar Botão "Editar"
- [ ] Clique no botão "Editar"
- [ ] Modal aparece com os dados da matéria
- [ ] Campos podem ser editados
- [ ] Mude:
  - [ ] Tempo para 50
  - [ ] Status para "Concluída"
- [ ] Clique em "Salvar"
- [ ] Modal fecha
- [ ] Mensagem verde: "Matéria atualizada com sucesso!"
- [ ] Card atualiza:
  - [ ] Tempo agora é "⏱️ 50h"
  - [ ] Status é "Concluída" (verde)

### 4.9 Adicionar Mais Matérias
- [ ] Clique "+ Adicionar Matéria" novamente
- [ ] Adicione 2-3 matérias com importâncias diferentes
- [ ] Vérifique se aparecem em cards
- [ ] Verifique se estão ordenadas por importância (maior primeiro)

### 4.10 Testar Botão "Deletar"
- [ ] Clique "Deletar" em algumas matérias
- [ ] Confirmação aparece: "Tem certeza?"
- [ ] Clique OK
- [ ] Mensagem verde: "Matéria deletada com sucesso!"
- [ ] Card desaparece
- [ ] Número de matérias no título atualiza

### 4.11 Responsividade
- [ ] Abra DevTools (F12)
- [ ] Acione Responsive Design Mode (Ctrl+Shift+M)
- [ ] Teste em:
  - [ ] iPhone 12 (390px)
  - [ ] iPad (768px)
  - [ ] Tela normal (1920px)
- [ ] Layout se adapta bem em todas?

---

## 🔒 Passo 5: Testes de Segurança

### 5.1 Isolamento de Dados
- [ ] Faça login com usuário A
- [ ] Adicione matéria "Matéria do Usuário A"
- [ ] Faça logout (clique Sair)
- [ ] Faça login com usuário B (diferente)
- [ ] Vê a matéria do Usuário A? **NÃO** (✓ Correto!)
- [ ] Adicione matéria "Matéria do Usuário B"
- [ ] Vê apenas suas próprias matérias? **SIM** (✓ Correto!)

### 5.2 Autenticação
- [ ] Abra console (F12)
- [ ] Vá para Application/Storage → Local Storage
- [ ] Vê um `token`? **SIM** (✓ Token armazenado)
- [ ] Faça logout
- [ ] Vê token ainda lá? **NÃO** (✓ Token removido)

---

## 🎨 Passo 6: Verificar Design

### 6.1 Cores
- [ ] Fundo é gradiente roxo (#412B6B para #5C3E94)
- [ ] Botões são roxos (#5C3E94)
- [ ] Texto é branco
- [ ] Cards têm fundo semi-transparente com blur

### 6.2 Cards
- [ ] Cards têm badges com emojis
- [ ] Badges de importância têm cores diferentes (1-5)
- [ ] Cards têm hover effect (levanta um pouco)
- [ ] Transições são suaves

### 6.3 Formulário
- [ ] Inputs têm borda clara
- [ ] Labels estão acima dos inputs
- [ ] Foco na field muda cor/border
- [ ] Botão submit tem hover effect

---

## 📊 Passo 7: Output Esperado no Console (DevTools)

Abra o console (F12) e veja:
- [ ] Network tab mostra requisições HTTP:
  - [ ] `POST /materias` (201 Created)
  - [ ] `GET /materias` (200 OK)
  - [ ] `PUT /materias/:id` (200 OK)
  - [ ] `DELETE /materias/:id` (200 OK)
- [ ] Sem erros vermelhos no console
- [ ] Respostas JSON aparecem corretamente

---

## 🧪 Passo 8: Teste com Postman (Opcional)

Se quiser testar via Postman:

### 8.1 Obter Token
```
POST http://localhost:3000/login
Body (JSON):
{
  "email": "seu@email.com",
  "senha": "sua_senha"
}
```
Resultado: Recebe um `token`

### 8.2 Criar Matéria via API
```
POST http://localhost:3000/materias
Headers:
  Authorization: Bearer <seu_token_aqui>
Body (JSON):
{
  "nome": "Teste API",
  "tempo_estimado_horas": 30,
  "importancia": 4,
  "descricao": "Testando via Postman"
}
```
Resultado: 201 Created + dados da matéria

### 8.3 Listar Matérias
```
GET http://localhost:3000/materias
Headers:
  Authorization: Bearer <seu_token_aqui>
```
Resultado: 200 OK + array de matérias

---

## ✅ Checklist Final

Se TODOS os testes passaram, você está pronto!

- [ ] Banco de dados criado
- [ ] Backend rodando sem erros
- [ ] Frontend rodando sem erros
- [ ] Login funciona
- [ ] Pode adicionar matérias
- [ ] Matérias aparecem em cards
- [ ] Pode editar matérias
- [ ] Pode deletar matérias
- [ ] Pode iniciar estudos
- [ ] Design e cores corretos
- [ ] Responsivo em mobile
- [ ] Isolamento de dados funciona
- [ ] Token sendo removido ao logout
- [ ] HTTP requests corretas

---

## 🎉 SUCESSO!

Se chegou aqui, seu sistema está **100% funcional**!

### Próximos passos:
1. Comittar código no Git
2. Explorar novas funcionalidades
3. Estudar a arquitetura do código
4. Refatorar se necessário
5. Deploy em servidor

---

## 🆘 Se Algo Não Funcionar

### Erro "Cannot GET /materias"
- [ ] Verifique se SQL foi executado
- [ ] Verifique se indexRoutes.js foi atualizado
- [ ] Reinicie backend (Ctrl+C e npm run dev novamente)

### Erro 401 "Token não fornecido"
- [ ] Faça login primeiro
- [ ] Verifique se token está em localStorage (F12 → Application)

### Matéria não salva
- [ ] Abra console (F12) e veja o erro exato
- [ ] Copie o erro e procure na documentação

### CORS Error
- [ ] Backend e Frontend devem estar em portas diferentes
- [ ] 3000 (backend) vs 5173 (frontend)
- [ ] CORS já está configurado, verifique firewall

---

**Parabéns pelo bom trabalho! 🚀**

Qualquer dúvida, revise o arquivo `IMPLEMENTACAO_REALIZADA.md`.
