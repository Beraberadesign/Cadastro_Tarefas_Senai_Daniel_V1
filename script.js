
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
