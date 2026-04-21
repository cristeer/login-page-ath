import axios from "axios";

const PortaAPI = 'http://localhost:3000';

export const criarMateria = async(materiaData) => {
    const token = localStorage.getItem('token');

    try{
        const resposta = await axios.post('http://localhost:3000/home', {
                materia: materia.value
            });

            alert(`Materia ${materia.value} logado com sucesso!`);
            localStorage.setItem('token', resposta.data.token);
            localStorage.setItem('materia', JSON.stringify(resposta.data.materia));
    }catch(error){
        alert('Erro ao criar matéria');
    }
    return await resposta.json();
}
