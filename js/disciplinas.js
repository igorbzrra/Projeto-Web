let disciplinaEditando = null;

const formDisciplina = document.getElementById("form-disciplina");

const listaDisciplinas = document.getElementById("lista-disciplinas");

// Selects dos outros módulos

const selectTarefa = document.getElementById("disciplina-tarefa");

const selectProva = document.getElementById("disciplina-prova");

const selectAnotacao = document.getElementById("disciplina-anotacao");

// =========================================
// CARREGAR
// =========================================

function carregarDisciplinas() {

    renderizarDisciplinas();

    atualizarSelects();

}

// =========================================
// EVENTO DO FORMULÁRIO
// =========================================

formDisciplina.addEventListener("submit", salvarDisciplina);

// =========================================
// SALVAR
// =========================================

function salvarDisciplina(event) {

    event.preventDefault();

    const disciplina = {

        id: disciplinaEditando ?? gerarId(),

        nome:

            document
                .getElementById("nome-disciplina")
                .value
                .trim(),

        professor:

            document
                .getElementById("professor")
                .value
                .trim(),

        curso:

            document
                .getElementById("curso")
                .value
                .trim(),

        semestre:

            document
                .getElementById("semestre")
                .value
                .trim(),

        sala:

            document
                .getElementById("sala")
                .value
                .trim(),

        horario:

            document
                .getElementById("horario")
                .value
                .trim(),

        cor:

            document
                .getElementById("cor-disciplina")
                .value

    };

    if (!validarDisciplina(disciplina)) {

        return;

    }

    if (disciplinaEditando) {

        atualizarRegistro(

            "disciplinas",

            disciplina.id,

            disciplina

        );

    }

    else {

        adicionarRegistro(

            "disciplinas",

            disciplina

        );

    }

    disciplinaEditando = null;

    formDisciplina.reset();

    document
        .getElementById("cor-disciplina")
        .value = "#2563EB";

    renderizarDisciplinas();

    atualizarSelects();

    atualizarDashboard();

}

function validarDisciplina(disciplina) {

    if (disciplina.nome === "") {

        alert("Informe o nome da disciplina.");

        return false;

    }

    if (disciplina.professor === "") {

        alert("Informe o professor.");

        return false;

    }

    const disciplinas = obterColecao("disciplinas");

    const repetida = disciplinas.find(item => {

        return (

            item.nome.toLowerCase() === disciplina.nome.toLowerCase()

            &&

            item.id !== disciplina.id

        );

    });

    if (repetida) {

        alert("Já existe uma disciplina com esse nome.");

        return false;

    }

    return true;

}

function renderizarDisciplinas() {

    const disciplinas = obterColecao("disciplinas");

    listaDisciplinas.innerHTML = "";

    if (disciplinas.length === 0) {

        listaDisciplinas.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-book"></i>

            <h2>Nenhuma disciplina cadastrada</h2>

            <p>Cadastre sua primeira disciplina.</p>

        </div>

        `;

        return;

    }

    disciplinas.forEach(criarCardDisciplina);

}

// =========================================
// CRIAÇÃO DOS CARDS
// =========================================

function criarCardDisciplina(disciplina) {

    const card = document.createElement("div");

    card.className = "item-card";

    card.innerHTML = `

        <div
            class="disciplina-cor"
            style="background:${disciplina.cor}">
        </div>

        <h3>${disciplina.nome}</h3>

        <div class="info">
            <i class="fa-solid fa-user"></i>
            <span>${disciplina.professor}</span>
        </div>

        <div class="info">
            <i class="fa-solid fa-graduation-cap"></i>
            <span>${disciplina.curso || "-"}</span>
        </div>

        <div class="info">
            <i class="fa-solid fa-calendar"></i>
            <span>${disciplina.semestre || "-"}</span>
        </div>

        <div class="info">
            <i class="fa-solid fa-door-open"></i>
            <span>${disciplina.sala || "-"}</span>
        </div>

        <div class="info">
            <i class="fa-solid fa-clock"></i>
            <span>${disciplina.horario || "-"}</span>
        </div>

        <div class="card-actions">

            <button
                class="btn-edit"
                onclick="editarDisciplina(${disciplina.id})">

                <i class="fa-solid fa-pen"></i>

                Editar

            </button>

            <button
                class="btn-delete"
                onclick="excluirDisciplina(${disciplina.id})">

                <i class="fa-solid fa-trash"></i>

                Excluir

            </button>

        </div>

    `;

    listaDisciplinas.appendChild(card);

}

// =========================================
// EDITAR
// =========================================

function editarDisciplina(id) {

    const disciplina = buscarRegistro(

        "disciplinas",

        id

    );

    if (!disciplina) {

        return;

    }

    disciplinaEditando = id;

    document.getElementById("nome-disciplina").value =
        disciplina.nome;

    document.getElementById("professor").value =
        disciplina.professor;

    document.getElementById("curso").value =
        disciplina.curso;

    document.getElementById("semestre").value =
        disciplina.semestre;

    document.getElementById("sala").value =
        disciplina.sala;

    document.getElementById("horario").value =
        disciplina.horario;

    document.getElementById("cor-disciplina").value =
        disciplina.cor;

    formDisciplina.scrollIntoView({

        behavior: "smooth"

    });

}

// =========================================
// EXCLUIR
// =========================================

function excluirDisciplina(id) {

    const confirmar = confirm(

        "Deseja realmente excluir esta disciplina?"

    );

    if (!confirmar) {

        return;

    }

    removerRegistro(

        "disciplinas",

        id

    );

    renderizarDisciplinas();

    atualizarSelects();

    atualizarDashboard();

}

// =========================================
// SELECTS
// =========================================

function atualizarSelects() {

    const disciplinas = obterColecao(

        "disciplinas"

    );

    const selects = [

        selectTarefa,

        selectProva,

        selectAnotacao

    ];

    selects.forEach(select => {

        if (!select) {

            return;

        }

        select.innerHTML =

            `<option value="">

            Selecione uma disciplina

        </option>`;

        disciplinas.forEach(disciplina => {

            const option =

                document.createElement("option");

            option.value = disciplina.id;

            option.textContent = disciplina.nome;

            select.appendChild(option);

        });

    });

}

// =========================================
// PESQUISA
// =========================================

const pesquisaDisciplina =

    document.getElementById(

        "pesquisa-disciplina"

    );

pesquisaDisciplina.addEventListener(

    "input",

    pesquisarDisciplinas

);

function pesquisarDisciplinas() {

    const texto =

        pesquisaDisciplina.value.toLowerCase();

    const disciplinas =

        obterColecao("disciplinas");

    listaDisciplinas.innerHTML = "";

    disciplinas

        .filter(disciplina => {

            return (

                disciplina.nome

                    .toLowerCase()

                    .includes(texto)

                ||

                disciplina.professor

                    .toLowerCase()

                    .includes(texto)

            );

        })

        .forEach(criarCardDisciplina);

}