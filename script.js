<<<<<<< HEAD
const campoTarefa = document.getElementById('campo-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');
const contadorTarefas = document.getElementById('contador-tarefas');
const botaoAlternarTema = document.getElementById('botao-alternar-tema');
const botoesFiltro = document.querySelectorAll('.filtro');

let tarefas = [];
let filtroAtual = 'todas';

function atualizarContador() {
    const pendentes = tarefas.filter(tarefa => !tarefa.concluida).length;
    const concluidas = tarefas.filter(tarefa => tarefa.concluida).length;

    contadorTarefas.textContent =
        `${tarefas.length} ${tarefas.length === 1 ? 'tarefa' : 'tarefas'} na lista • ${pendentes} ${pendentes === 1 ? 'pendente' : 'pendentes'} • ${concluidas} ${concluidas === 1 ? 'concluída' : 'concluídas'}`;
}

function tarefasFiltradas() {
    if (filtroAtual === 'pendentes') {
        return tarefas.filter(tarefa => !tarefa.concluida);
    }

    if (filtroAtual === 'concluidas') {
        return tarefas.filter(tarefa => tarefa.concluida);
    }

    return tarefas;
}

function renderizarTarefas() {
    listaTarefas.innerHTML = '';

    const visiveis = tarefasFiltradas();

    if (visiveis.length === 0) {
        const vazio = document.createElement('li');

        vazio.className = 'estado-vazio';

        vazio.textContent =
            filtroAtual === 'todas'
                ? 'Nenhuma tarefa adicionada ainda.'
                : 'Nenhuma tarefa neste filtro.';

        listaTarefas.appendChild(vazio);

        atualizarContador();

        return;
    }

    visiveis.forEach(tarefa => {

        const itemLista = document.createElement('li');

        itemLista.className =
            `item-tarefa${tarefa.concluida ? ' concluido' : ''}`;

        const texto = document.createElement('span');

        texto.textContent = tarefa.texto;

        const acoes = document.createElement('div');

        acoes.className = 'acoes-tarefa';

        const botaoEditar = document.createElement('button');

        botaoEditar.className = 'botao-acao editar';

        botaoEditar.title = 'Editar tarefa';

        botaoEditar.setAttribute(
            'aria-label',
            'Editar tarefa'
        );

        botaoEditar.innerHTML =
            '<i class="fa-solid fa-pen"></i>';

        botaoEditar.addEventListener('click', () => {

            const novoTexto = prompt(
                'Edite sua tarefa:',
                tarefa.texto
            );

            if (novoTexto === null) {
                return;
            }

            const textoLimpo = novoTexto.trim();

            if (!textoLimpo) {
                alert('A tarefa não pode ficar vazia.');
                return;
            }

            tarefa.texto = textoLimpo.slice(0, 40);

            renderizarTarefas();
        });

        const botaoConcluir = document.createElement('button');

        botaoConcluir.className = 'botao-acao concluir';

        botaoConcluir.title =
            tarefa.concluida
                ? 'Marcar como pendente'
                : 'Concluir tarefa';

        botaoConcluir.setAttribute(
            'aria-label',
            botaoConcluir.title
        );

        botaoConcluir.innerHTML =
            tarefa.concluida
                ? '<i class="fa-solid fa-circle-check"></i>'
                : '<i class="fa-regular fa-circle-check"></i>';

        botaoConcluir.addEventListener('click', () => {

            tarefa.concluida = !tarefa.concluida;

            renderizarTarefas();
        });

        const botaoExcluir = document.createElement('button');

        botaoExcluir.className = 'botao-acao excluir';

        botaoExcluir.title = 'Excluir tarefa';

        botaoExcluir.setAttribute(
            'aria-label',
            'Excluir tarefa'
        );

        botaoExcluir.innerHTML =
            '<i class="fa-solid fa-trash"></i>';

        botaoExcluir.addEventListener('click', () => {

            tarefas = tarefas.filter(
                item => item !== tarefa
            );

            renderizarTarefas();
        });

        acoes.append(
            botaoEditar,
            botaoConcluir,
            botaoExcluir
        );

        itemLista.append(
            texto,
            acoes
        );

        listaTarefas.appendChild(itemLista);
    });

    atualizarContador();
}

function adicionarTarefa() {

    const textoTarefa = campoTarefa.value.trim();

    if (!textoTarefa) {

        alert('Por favor, digite uma tarefa!');

        campoTarefa.focus();

        return;
    }

    tarefas.push({
        texto: textoTarefa.slice(0, 40),
        concluida: false
    });

    campoTarefa.value = '';

    filtroAtual = 'todas';

    botoesFiltro.forEach(botao => {

        botao.classList.toggle(
            'ativo',
            botao.dataset.filtro === filtroAtual
        );

    });

    renderizarTarefas();

    campoTarefa.focus();
}

botoesFiltro.forEach(botao => {

    botao.addEventListener('click', () => {

        filtroAtual = botao.dataset.filtro;

        botoesFiltro.forEach(item => {

            item.classList.toggle(
                'ativo',
                item === botao
            );

        });

        renderizarTarefas();
    });

});
botaoAdicionar.addEventListener(
    'click',
    adicionarTarefa
);
campoTarefa.addEventListener(
    'keypress',
    evento => {

        if (evento.key === 'Enter') {
            adicionarTarefa();
        }

    }
);
botaoAlternarTema.addEventListener(
    'click',
    () => {

        document.body.classList.toggle(
            'modo-escuro'
        );

        const iconeTema =
            botaoAlternarTema.querySelector('i');

        iconeTema.classList.toggle(
            'fa-moon'
        );

        iconeTema.classList.toggle(
            'fa-sun'
        );

    }
);
renderizarTarefas();
=======
const campoTarefa = document.getElementById('campo-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');
const contadorTarefas = document.getElementById('contador-tarefas');
const botaoAlternarTema = document.getElementById('botao-alternar-tema');

let totalDeTarefas = 0;
function adicionarTarefa() {
    const textoTarefa = campoTarefa.value.trim();

    if (textoTarefa === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }
    const itemLista = document.createElement('li');
    itemLista.className = 'item-tarefa';

    itemLista.innerHTML = `
        <span>${textoTarefa}</span>
        <div class="acoes-tarefa">
            <button class="botao-acao concluir"><i class="fa-regular fa-circle-check"></i></button>
            <button class="botao-acao excluir"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;
    itemLista.querySelector('.concluir').addEventListener('click', () => {
        itemLista.classList.toggle('concluido');
    });
    itemLista.querySelector('.excluir').addEventListener('click', () => {
        itemLista.remove();
        totalDeTarefas--;
        atualizarContador();
    });

    listaTarefas.appendChild(itemLista);
    campoTarefa.value = '';
    totalDeTarefas++;
    atualizarContador();
}
function atualizarContador() {
    contadorTarefas.textContent = `${totalDeTarefas} ${totalDeTarefas === 1 ? 'tarefa' : 'tarefas'} na lista`;
}
botaoAlternarTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');
    const iconeTema = botaoAlternarTema.querySelector('i');
    iconeTema.classList.toggle('fa-moon');
    iconeTema.classList.toggle('fa-sun');
});
botaoAdicionar.addEventListener('click', adicionarTarefa);

campoTarefa.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});
>>>>>>> cfa7db680d0a1865419632ea0dfc50ec62f42fe8
