// ======================================================
// STUDYHUB 2.0
// storage.js
// Responsável pelo gerenciamento do LocalStorage
// ======================================================

const STORAGE_KEY = "studyhub";

/**
 * Estrutura padrão do banco de dados.
 */
const bancoPadrao = {
    disciplinas: [],
    tarefas: [],
    provas: [],
    anotacoes: [],
    metas: []
};

/**
 * Carrega o banco do LocalStorage.
 * Caso não exista, cria um banco vazio.
 */
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

/**
 * Salva o banco completo.
 */
function salvarBanco(banco) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(banco)

    );

}

/**
 * Retorna uma coleção específica.
 *
 * Exemplo:
 * obterColecao("disciplinas")
 */
function obterColecao(nomeColecao) {

    const banco = carregarBanco();

    return banco[nomeColecao];

}

/**
 * Atualiza uma coleção inteira.
 *
 * Exemplo:
 * atualizarColecao("disciplinas", lista);
 */
function atualizarColecao(nomeColecao, dados) {

    const banco = carregarBanco();

    banco[nomeColecao] = dados;

    salvarBanco(banco);

}

/**
 * Adiciona um registro.
 */
function adicionarRegistro(nomeColecao, registro) {

    const banco = carregarBanco();

    banco[nomeColecao].push(registro);

    salvarBanco(banco);

}

/**
 * Remove um registro pelo ID.
 */
function removerRegistro(nomeColecao, id) {

    const banco = carregarBanco();

    banco[nomeColecao] = banco[nomeColecao].filter(

        registro => registro.id !== id

    );

    salvarBanco(banco);

}

/**
 * Atualiza um registro existente.
 */
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

/**
 * Procura um registro pelo ID.
 */
function buscarRegistro(nomeColecao, id) {

    const banco = carregarBanco();

    return banco[nomeColecao].find(

        registro => registro.id === id

    );

}

/**
 * Retorna um ID único.
 */
function gerarId() {

    return Date.now() + Math.floor(Math.random() * 1000);

}

/**
 * Limpa todos os dados do StudyHub.
 */
function limparBanco() {

    localStorage.removeItem(STORAGE_KEY);

}

/**
 * Retorna o banco inteiro.
 */
function obterBanco() {

    return carregarBanco();

}