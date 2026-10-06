<<<<<<< HEAD
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
=======

const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const campoBusca = document.getElementById("campo-busca");
const botaoLimpar = document.getElementById("botao-limpar-concluidas");
const botaoTema = document.getElementById("botao-alternar-tema");

let tarefas = [];

function adicionar() {
    const texto = campoTarefa.value.trim();

    if (texto === "") return;

    tarefas.push({
        texto: texto,
        concluida: false
    });

    campoTarefa.value = "";
    mostrar();
}

function mostrar() {
    listaTarefas.innerHTML = "";

    const busca = campoBusca.value.toLowerCase();

    tarefas
        .filter(tarefa => tarefa.texto.toLowerCase().includes(busca))
        .forEach((tarefa, indice) => {

            const item = document.createElement("li");
            item.className = "tarefa";

            if (tarefa.concluida) {
                item.classList.add("concluida");
            }

            const texto = document.createElement("span");
            texto.className = "texto-tarefa";
            texto.textContent = tarefa.texto;

            const botoes = document.createElement("div");
            botoes.className = "botoes-tarefa";

            const concluir = document.createElement("button");
            concluir.className = "botao-tarefa botao-concluir";
            concluir.textContent = "✓";

            concluir.onclick = () => {
                tarefa.concluida = !tarefa.concluida;
                mostrar();
            };

            const excluir = document.createElement("button");
            excluir.className = "botao-tarefa botao-excluir";
            excluir.textContent = "🗑";

            excluir.onclick = () => {
                tarefas.splice(indice, 1);
                mostrar();
            };

            botoes.appendChild(concluir);
            botoes.appendChild(excluir);

            item.appendChild(texto);
            item.appendChild(botoes);

            listaTarefas.appendChild(item);
        });

    atualizarContador();
}

function atualizarContador() {
    const pendentes = tarefas.filter(tarefa => !tarefa.concluida).length;

    contadorTarefas.textContent =
        `${pendentes} tarefa${pendentes !== 1 ? "s" : ""} pendente${pendentes !== 1 ? "s" : ""}`;
}

botaoAdicionar.addEventListener("click", adicionar);

campoTarefa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionar();
    }
});

campoBusca.addEventListener("input", mostrar);

botaoLimpar.addEventListener("click", function() {
    tarefas = tarefas.filter(tarefa => !tarefa.concluida);
    mostrar();
});

botaoTema.addEventListener("click", function() {
    document.body.classList.toggle("modo-escuro");

    const icone = botaoTema.querySelector("i");

    if (document.body.classList.contains("modo-escuro")) {
        icone.className = "fas fa-sun";
    } else {
        icone.className = "fas fa-moon";
    }
});

mostrar();
>>>>>>> f82adf93a4ccee3e5e23be902f130044b00ea7e0
