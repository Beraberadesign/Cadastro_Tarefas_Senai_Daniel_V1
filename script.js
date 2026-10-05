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
=======
class Produto {
    #preco;
    #quantidade;

    constructor(nome, preco, quantidade) {
        if (!nome || nome.trim() === '') {
            throw new Error('O nome do produto não pode estar em branco.');
        }
        if (typeof preco !== 'number' || isNaN(preco) || preco <= 0) {
            throw new Error('O preço deve ser um número maior que zero.');
        }
        if (typeof quantidade !== 'number' || isNaN(quantidade) || quantidade <= 0) {
            throw new Error('A quantidade deve ser um número maior que zero.');
        }

        this.nome = nome.trim();
        this.#preco = preco;
        this.#quantidade = quantidade;
    }

    get preco() {
        return this.#preco;
    }

    get quantidade() {
        return this.#quantidade;
    }

    get subtotal() {
        return this.#preco * this.#quantidade;
    }
}

let produtos = [];

const form = document.getElementById('produto-form');
const nomeInput = document.getElementById('nome');
const precoInput = document.getElementById('preco');
const quantidadeInput = document.getElementById('quantidade');
const tabelaBody = document.querySelector('#tabela-produtos tbody');
const totalEstoqueEl = document.getElementById('total-estoque');
const limparBtn = document.getElementById('limpar-tabela');

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarTotalEstoque() {
    const total = produtos.reduce((soma, produto) => soma + produto.subtotal, 0);
    totalEstoqueEl.textContent = `Total em Estoque: ${formatarMoeda(total)}`;
}

function renderizarTabela() {
    tabelaBody.innerHTML = '';

    produtos.forEach((produto, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${formatarMoeda(produto.preco)}</td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.subtotal)}</td>
            <td><button class="btn-remover" data-index="${index}">Remover</button></td>
        `;
        tabelaBody.appendChild(linha);
    });

    atualizarTotalEstoque();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    try {
        const nome = nomeInput.value;
        const preco = parseFloat(precoInput.value);
        const quantidade = parseInt(quantidadeInput.value, 10);

        const novoProduto = new Produto(nome, preco, quantidade);

        produtos.push(novoProduto);
        renderizarTabela();
        form.reset();
        nomeInput.focus();
    } catch (erro) {
        alert(`Não foi possível cadastrar o produto: ${erro.message}`);
    }
});

tabelaBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-remover')) {
        const index = Number(event.target.dataset.index);
        produtos.splice(index, 1);
        renderizarTabela();
    }
});

limparBtn.addEventListener('click', () => {
    if (produtos.length === 0) return;

    const confirmar = confirm('Tem certeza que deseja limpar todo o estoque?');
    if (confirmar) {
        produtos = [];
        renderizarTabela();
    }
});

class Produto {
    #preco;
    #quantidade;

    constructor(nome, preco, quantidade) {
        if (!nome || nome.trim() === '') {
            throw new Error('O nome do produto não pode estar em branco.');
        }
        if (typeof preco !== 'number' || isNaN(preco) || preco <= 0) {
            throw new Error('O preço deve ser um número maior que zero.');
        }
        if (typeof quantidade !== 'number' || isNaN(quantidade) || quantidade <= 0) {
            throw new Error('A quantidade deve ser um número maior que zero.');
        }

        this.nome = nome.trim();
        this.#preco = preco;
        this.#quantidade = quantidade;
    }
    get preco() {
        return this.#preco;
    }

    get quantidade() {
        return this.#quantidade;
    }

    get subtotal() {
        return this.#preco * this.#quantidade;
    }
}
let listaDeProdutos = [];

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarTotalEstoque() {
    const total = listaDeProdutos.reduce((soma, produto) => soma + produto.subtotal, 0);
    totalEstoqueEl.textContent = `Total em Estoque: ${formatarMoeda(total)}`;
}

function renderizarTabela() {
    tabelaBody.innerHTML = '';

    listaDeProdutos.forEach((produto, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${formatarMoeda(produto.preco)}</td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.subtotal)}</td>
            <td><button class="btn-remover" data-index="${index}">Remover</button></td>
        `;
        tabelaBody.appendChild(linha);
    });

    atualizarTotalEstoque();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    try {
        const nome = nomeInput.value;
        const preco = parseFloat(precoInput.value);
        const quantidade = parseInt(quantidadeInput.value, 10);
        const novoProduto = new Produto(nome, preco, quantidade);

        listaDeProdutos.push(novoProduto);
        renderizarTabela();
        form.reset();
        nomeInput.focus();
    } catch (erro) {
        alert(`Não foi possível cadastrar o produto: ${erro.message}`);
    }
});

tabelaBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-remover')) {
        const index = Number(event.target.dataset.index);
        listaDeProdutos.splice(index, 1);
        renderizarTabela();
    }
});

limparBtn.addEventListener('click', () => {
    if (listaDeProdutos.length === 0) return;

    const confirmar = confirm('Tem certeza que deseja limpar todo o estoque?');
    if (confirmar) {
        listaDeProdutos = [];
        renderizarTabela();
    }
});

// ===== Classe Produto =====
// Encapsula preço e quantidade com campos privados (#) e valida os dados
// já no construtor, impedindo a criação de objetos inválidos.
class Produto {
    #preco;
    #quantidade;

    constructor(nome, preco, quantidade) {
        if (!nome || nome.trim() === '') {
            throw new Error('O nome do produto não pode estar em branco.');
        }
        if (typeof preco !== 'number' || isNaN(preco) || preco <= 0) {
            throw new Error('O preço deve ser um número maior que zero.');
        }
        if (typeof quantidade !== 'number' || isNaN(quantidade) || quantidade <= 0) {
            throw new Error('A quantidade deve ser um número maior que zero.');
        }

        this.nome = nome.trim();
        this.#preco = preco;
        this.#quantidade = quantidade;
    }

    // Getters: permitem leitura dos valores privados sem expor os campos
    get preco() {
        return this.#preco;
    }

    get quantidade() {
        return this.#quantidade;
    }

    get subtotal() {
        return this.#preco * this.#quantidade;
    }
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarTotalEstoque() {
    const total = listaDeProdutos.reduce((soma, produto) => soma + produto.subtotal, 0);
    totalEstoqueEl.textContent = `Total em Estoque: ${formatarMoeda(total)}`;
}

function renderizarTabela() {
    tabelaBody.innerHTML = '';

    listaDeProdutos.forEach((produto, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${formatarMoeda(produto.preco)}</td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.subtotal)}</td>
            <td><button class="btn-remover" onclick="removerProduto(${index})">Remover</button></td>
        `;
        tabelaBody.appendChild(linha);
    });

    atualizarTotalEstoque();
}

function removerProduto(index) {
    listaDeProdutos.splice(index, 1);
    renderizarTabela();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    try {
        const nome = nomeInput.value;
        const preco = parseFloat(precoInput.value);
        const quantidade = parseInt(quantidadeInput.value, 10);
        const novoProduto = new Produto(nome, preco, quantidade);

        listaDeProdutos.push(novoProduto);
        renderizarTabela();
        form.reset();
        nomeInput.focus();
    } catch (erro) {
        alert(`Não foi possível cadastrar o produto: ${erro.message}`);
    }
});

limparBtn.addEventListener('click', () => {
    if (listaDeProdutos.length === 0) return;

    const confirmar = confirm('Tem certeza que deseja limpar todo o estoque?');
    if (confirmar) {
        listaDeProdutos.length = 0;
        renderizarTabela();
>>>>>>> f257acaa3eed512b8de5af66edde7c685f59eda3
    }
});