const campoTarefa = document.getElementById('campo-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');
const contadorTarefas = document.getElementById('contador-tarefas');
const botaoAlternarTema = document.getElementById('botao-alternar-tema');

let totalDeTarefas = 0;

// Carrega as tarefas salvas
let tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvarTarefas() {
    const tarefas = [];

    listaTarefas.querySelectorAll('.item-tarefa').forEach(item => {
        tarefas.push({
            texto: item.querySelector('span').textContent,
            concluido: item.classList.contains('concluido')
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarTarefa(textoTarefa, concluido = false) {
    const itemLista = document.createElement('li');
    itemLista.className = 'item-tarefa';

    if (concluido) {
        itemLista.classList.add('concluido');
    }

    const texto = document.createElement('span');
    texto.textContent = textoTarefa;

    const acoes = document.createElement('div');
    acoes.className = 'acoes-tarefa';

    // Botão de concluir
    const botaoConcluir = document.createElement('button');
    botaoConcluir.className = 'botao-acao concluir';
    botaoConcluir.innerHTML =
        '<i class="fa-regular fa-circle-check"></i>';
    botaoConcluir.title = 'Concluir tarefa';

    botaoConcluir.addEventListener('click', () => {
        itemLista.classList.toggle('concluido');
        salvarTarefas();
    });

    // Botão de editar (nova funcionalidade)
    const botaoEditar = document.createElement('button');
    botaoEditar.className = 'botao-acao editar';
    botaoEditar.innerHTML =
        '<i class="fa-solid fa-pen"></i>';
    botaoEditar.title = 'Editar tarefa';

    botaoEditar.addEventListener('click', () => {
        const novoTexto = prompt(
            'Digite o novo texto da tarefa:',
            texto.textContent
        );

        if (novoTexto !== null && novoTexto.trim() !== '') {
            texto.textContent = novoTexto.trim();
            salvarTarefas();
        } else if (novoTexto !== null) {
            alert('A tarefa não pode ficar vazia!');
        }
    });

    // Botão de excluir
    const botaoExcluir = document.createElement('button');
    botaoExcluir.className = 'botao-acao excluir';
    botaoExcluir.innerHTML =
        '<i class="fa-solid fa-trash"></i>';
    botaoExcluir.title = 'Excluir tarefa';

    botaoExcluir.addEventListener('click', () => {
        itemLista.remove();
        atualizarContador();
        salvarTarefas();
    });

    acoes.append(botaoConcluir, botaoEditar, botaoExcluir);
    itemLista.append(texto, acoes);
    listaTarefas.appendChild(itemLista);

    atualizarContador();
}

function adicionarTarefa() {
    const textoTarefa = campoTarefa.value.trim();

    if (textoTarefa === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    criarTarefa(textoTarefa);
    campoTarefa.value = '';
    salvarTarefas();
}

function atualizarContador() {
    totalDeTarefas =
        listaTarefas.querySelectorAll('.item-tarefa').length;

    contadorTarefas.textContent =
        `${totalDeTarefas} ${
            totalDeTarefas === 1 ? 'tarefa' : 'tarefas'
        } na lista`;
}

// Alternar tema
botaoAlternarTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');

    const iconeTema = botaoAlternarTema.querySelector('i');
    iconeTema.classList.toggle('fa-moon');
    iconeTema.classList.toggle('fa-sun');
});

// Adicionar tarefa
botaoAdicionar.addEventListener('click', adicionarTarefa);

// Adicionar tarefa ao pressionar Enter
campoTarefa.addEventListener('keypress', evento => {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});

// Recuperar tarefas salvas ao abrir a página
tarefasSalvas.forEach(tarefa => {
    criarTarefa(tarefa.texto, tarefa.concluido);
});

atualizarContador();