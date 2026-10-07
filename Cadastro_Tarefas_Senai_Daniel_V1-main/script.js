let tarefas = [];

const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const campoBusca = document.getElementById("campo-busca");
const botaoLimparConcluidas = document.getElementById("botao-limpar-concluidas");
const botaoAlternarTema = document.getElementById("botao-alternar-tema");

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const dados = localStorage.getItem("tarefas");

    if (dados) {
        tarefas = JSON.parse(dados);
    }

    atualizarLista();
}

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

    if (texto === "") {
        return;
    }

    tarefas.push({
        id: Date.now(),
        texto: texto,
        concluida: false
    });

    salvarTarefas();
    atualizarLista();

    campoTarefa.value = "";
    campoTarefa.focus();
}

function alternarTarefa(id) {
    tarefas.forEach(function(tarefa) {
        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
        }
    });

    salvarTarefas();
    atualizarLista();
}

function removerTarefa(id) {
    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.id !== id;
    });

    salvarTarefas();
    atualizarLista();
}

function limparConcluidas() {
    tarefas = tarefas.filter(function(tarefa) {
        return !tarefa.concluida;
    });

    salvarTarefas();
    atualizarLista();
}

function atualizarLista() {
    listaTarefas.innerHTML = "";

    const busca = campoBusca.value.toLowerCase();

    const tarefasFiltradas = tarefas.filter(function(tarefa) {
        return tarefa.texto.toLowerCase().includes(busca);
    });

    tarefasFiltradas.forEach(function(tarefa) {
        const item = document.createElement("li");

        item.classList.add("item-tarefa");

        if (tarefa.concluida) {
            item.classList.add("concluido");
        }

        item.innerHTML = `
            <span>${tarefa.texto}</span>

            <div class="acoes-tarefa">
                <button class="botao-acao" onclick="alternarTarefa(${tarefa.id})">
                    ${tarefa.concluida ? "↩️" : "✅"}
                </button>

                <button class="botao-acao excluir" onclick="removerTarefa(${tarefa.id})">
                    🗑️
                </button>
            </div>
        `;

        listaTarefas.appendChild(item);
    });

    if (tarefas.length === 0) {
        contadorTarefas.textContent = "0 tarefas na lista";
    } else if (tarefas.length === 1) {
        contadorTarefas.textContent = "1 tarefa na lista";
    } else {
        contadorTarefas.textContent = tarefas.length + " tarefas na lista";
    }
}

function alternarTema() {
    document.body.classList.toggle("modo-escuro");

    const modoEscuro = document.body.classList.contains("modo-escuro");

    localStorage.setItem("modoEscuro", modoEscuro);

    if (modoEscuro) {
        botaoAlternarTema.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        botaoAlternarTema.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function carregarTema() {
    const modoEscuro = localStorage.getItem("modoEscuro");

    if (modoEscuro === "true") {
        document.body.classList.add("modo-escuro");
        botaoAlternarTema.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        botaoAlternarTema.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

campoBusca.addEventListener("input", atualizarLista);

botaoLimparConcluidas.addEventListener("click", limparConcluidas);

botaoAlternarTema.addEventListener("click", alternarTema);

carregarTarefas();
carregarTema();