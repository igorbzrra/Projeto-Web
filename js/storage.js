const STORAGE_KEY = "studyhub";

const bancoPadrao = {
    disciplinas: [],
    tarefas: [],
    provas: [],
    anotacoes: [],
    metas: [],
    horarios: []
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

function exportarDados() {

    const arquivo = {
        aplicativo: "StudyHub",
        versao: 1,
        exportadoEm: new Date().toISOString(),
        dados: obterBanco()
    };

    const blob = new Blob(
        [JSON.stringify(arquivo, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `studyhub-backup-${hoje()}.json`;
    link.click();
    URL.revokeObjectURL(url);

}

function importarDados(arquivo) {

    return arquivo.text().then(conteudo => {

        const backup = JSON.parse(conteudo);
        const dadosImportados = backup.dados || backup;

        if (!dadosImportados || typeof dadosImportados !== "object") {
            throw new Error("Formato de backup inválido.");
        }

        const bancoAtual = obterBanco();
        const bancoMesclado = structuredClone(bancoPadrao);

        Object.keys(bancoPadrao).forEach(nomeColecao => {

            const registrosAtuais = bancoAtual[nomeColecao] || [];
            const registrosImportados = Array.isArray(dadosImportados[nomeColecao])
                ? dadosImportados[nomeColecao]
                : [];
            const registrosPorId = new Map(
                registrosAtuais.map(registro => [String(registro.id), registro])
            );

            registrosImportados.forEach(registro => {
                if (registro && registro.id !== undefined) {
                    registrosPorId.set(String(registro.id), registro);
                }
            });

            bancoMesclado[nomeColecao] = [...registrosPorId.values()];

        });

        salvarBanco(bancoMesclado);
        return bancoMesclado;

    });

}