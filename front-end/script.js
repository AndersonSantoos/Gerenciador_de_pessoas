const baseURL = 'http://localhost:3000/pessoas';

document.addEventListener('DOMContentLoaded', () => {
    const listarButton = document.getElementById('listarButton');
    listarButton.addEventListener('click', togglePessoasList);

    getAllPessoas(); 
});

function getAllPessoas() {
    fetch(baseURL)
        .then(response => response.json())
        .then(data => {
            const pessoasList = document.getElementById('pessoasList');
            pessoasList.innerHTML = '<h3>Pessoas:</h3>';

            data.forEach(pessoa => {
                pessoasList.innerHTML += `<p>ID: ${pessoa.id}, Nome: ${pessoa.nome}, Idade: ${pessoa.idade}, Profissão: ${pessoa.profissao}</p>`;
            });
        })
        .catch(error => console.error('Erro ao obter pessoas:', error));
}

function createPessoa(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const profissao = document.getElementById('profissao').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, idade, profissao, email, senha }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Pessoa criada com sucesso!');
            getAllPessoas(); 
            togglePessoasList(); 
        } else {
            console.error('Erro ao criar pessoa:', response.status);
        }
    })
    .catch(error => console.error('Erro ao criar pessoa:', error));
}

function togglePessoasList() {
    const pessoasList = document.getElementById('pessoasList');
    const isHidden = pessoasList.classList.contains('hidden');

    if (isHidden) {
        pessoasList.classList.remove('hidden');
    } else {
        pessoasList.classList.add('hidden');
    }
}
