import axios from 'axios';

// Configurar URL base da API
const API_URL = 'http://localhost:3000';

// Criar instância do axios
const api = axios.create({
    baseURL: API_URL,
});

// Interceptor para adicionar token em toda requisição
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const materiaService = {
    // Criar nova matéria
    criar: async (dados) => {
        try {
            const response = await api.post('/materia', dados);
            return response.data;
        } catch (erro) {
            throw erro.response?.data || erro;
        }
    },

    // Listar todas as matérias do usuário
    listar: async () => {
        try {
            const response = await api.get('/materia');
            return response.data;
        } catch (erro) {
            throw erro.response?.data || erro;
        }
    },

    // Buscar uma matéria específica
    buscar: async (id) => {
        try {
            const response = await api.get(`/materia/${id}`);
            return response.data;
        } catch (erro) {
            throw erro.response?.data || erro;
        }
    },

    // Atualizar matéria
    atualizar: async (id, dados) => {
        try {
            const response = await api.put(`/materia/${id}`, dados);
            return response.data;
        } catch (erro) {
            throw erro.response?.data || erro;
        }
    },

    // Deletar matéria
    deletar: async (id) => {
        try {
            const response = await api.delete(`/materia/${id}`);
            return response.data;
        } catch (erro) {
            throw erro.response?.data || erro;
        }
    }
};

export default materiaService;
