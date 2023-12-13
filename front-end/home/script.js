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
            // Configuração dos campos que serão exibidos (adicione ou remova conforme necessário)
            const camposExibidos = ['id', 'nome', 'idade', 'profissao', 'email',];

            // Filtra os dados para incluir apenas os campos configurados
            const dadosFiltrados = data.map(pessoa => {
                const pessoaFiltrada = {};
                camposExibidos.forEach(campo => {
                    pessoaFiltrada[campo] = pessoa[campo];
                });
                return pessoaFiltrada;
            });

            // Construa o conteúdo JSON
            const jsonString = JSON.stringify(dadosFiltrados, null, 2);

            // Abre uma nova janela ou aba e insere o conteúdo JSON formatado na página
            const newWindow = window.open();
            newWindow.document.write(`<h1>Pessoas Cadastradas</h1>`);
            newWindow.document.write('<pre>' + jsonString + '</pre>');
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

    // Elemento para exibir a mensagem
    const mensagemElement = document.getElementById('mensagem');
    
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
            
            // Exibe a mensagem na página
            mensagemElement.innerText = 'Pessoa cadastrada com sucesso!';
            mensagemElement.style.color = 'green'; // Cor verde para indicar sucesso

            // Limpa o formulário após o cadastro
            document.getElementById('nome').value = '';
            document.getElementById('idade').value = '';
            document.getElementById('profissao').value = '';
            document.getElementById('email').value = '';
            document.getElementById('senha').value = '';

            // Atualiza a lista de pessoas
            

            // Esconde a mensagem após alguns segundos
            setTimeout(() => {
                mensagemElement.innerText = '';
            }, 5000);
        } else {
            console.error('Erro ao criar pessoa:', response.status);
            
            // Exibe a mensagem de erro na página
            mensagemElement.innerText = 'Erro ao criar pessoa. Por favor, tente novamente.';
            mensagemElement.style.color = 'red'; // Cor vermelha para indicar erro
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
