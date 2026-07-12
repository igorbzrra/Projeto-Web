const STORAGE_KEY = "studyhub";

const bancoPadrao = {
    disciplinas: [],
    tarefas: [],
    provas: [],
    anotacoes: [],
    metas: []
};

function carregarBanco() {

    const dados = localStorage.getItem(STORAGE_KEY);

    if (!dados) {

        salvarBanco(bancoPadrao);

        return structuredClone(bancoPadrao);

    }

    try {

        const banco = JSON.parse(dados);

        return {
            ...structuredClone(bancoPadrao),
            ...banco
        };

    } catch (erro) {

        console.error("Erro ao carregar o banco:", erro);

        salvarBanco(bancoPadrao);

        return structuredClone(bancoPadrao);

    }

}

function salvarBanco(banco) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(banco)

    );

}

function obterColecao(nomeColecao) {

    const banco = carregarBanco();

    return banco[nomeColecao];

}

function atualizarColecao(nomeColecao, dados) {

    const banco = carregarBanco();

    banco[nomeColecao] = dados;

    salvarBanco(banco);

}

function adicionarRegistro(nomeColecao, registro) {

    const banco = carregarBanco();

    banco[nomeColecao].push(registro);

    salvarBanco(banco);

}

function removerRegistro(nomeColecao, id) {

    const banco = carregarBanco();

    banco[nomeColecao] = banco[nomeColecao].filter(

        registro => registro.id !== id

    );

    salvarBanco(banco);

}

function atualizarRegistro(nomeColecao, id, novosDados) {

    const banco = carregarBanco();

    banco[nomeColecao] = banco[nomeColecao].map(registro => {

        if (registro.id === id) {

            return {

                ...registro,

                ...novosDados

            };

        }

        return registro;

    });

    salvarBanco(banco);

}

function buscarRegistro(nomeColecao, id) {

    const banco = carregarBanco();

    return banco[nomeColecao].find(

        registro => registro.id === id

    );

}

function gerarId() {

    return Date.now() + Math.floor(Math.random() * 1000);

}

function limparBanco() {

    localStorage.removeItem(STORAGE_KEY);

}

function obterBanco() {

    return carregarBanco();

}