// ======================================================
// STUDYHUB 2.0
// provas.js
// ======================================================

let provaEditando = null;

const formProva =
document.getElementById("form-prova");

const listaProvas =
document.getElementById("lista-provas");

// ==========================================

function carregarProvas(){

    renderizarProvas();

}

// ==========================================

formProva.addEventListener(

    "submit",

    salvarProva

);

// ==========================================

function salvarProva(event){

    event.preventDefault();

    const prova = {

        id:

            provaEditando ?? gerarId(),

        titulo:

            limparTexto(

                document
                .getElementById("titulo-prova")
                .value

            ),

        disciplina:

            document
            .getElementById("disciplina-prova")
            .value,

        tipo:

            document
            .getElementById("tipo-prova")
            .value,

        data:

            document
            .getElementById("data-prova")
            .value,

        hora:

            document
            .getElementById("hora-prova")
            .value,

        local:

            limparTexto(

                document
                .getElementById("local-prova")
                .value

            ),

        observacao:

            limparTexto(

                document
                .getElementById("observacao-prova")
                .value

            )

    };

    if(!validarProva(prova)){

        return;

    }

    if(provaEditando){

        atualizarRegistro(

            "provas",

            prova.id,

            prova

        );

    }

    else{

        adicionarRegistro(

            "provas",

            prova

        );

    }

    provaEditando = null;

    formProva.reset();

    renderizarProvas();

    atualizarDashboard();

}

function validarProva(prova){

    if(prova.titulo===""){

        alert("Informe o título.");

        return false;

    }

    if(prova.disciplina===""){

        alert("Selecione uma disciplina.");

        return false;

    }

    if(prova.data===""){

        alert("Informe a data.");

        return false;

    }

    return true;

}

function renderizarProvas(){

    const provas =

        obterColecao("provas");

    listaProvas.innerHTML="";

    if(provas.length===0){

        listaProvas.innerHTML=`

        <div class="empty-state">

            <i class="fa-solid fa-calendar-days"></i>

            <h2>

                Nenhuma prova cadastrada

            </h2>

            <p>

                Cadastre sua primeira prova.

            </p>

        </div>

        `;

        return;

    }

    ordenar(

        provas,

        "data"

    ).forEach(

        criarCardProva

    );

}

function criarCardProva(prova){

    const status =

        obterStatus(

            prova.data

        );

    const dias =

        diasRestantes(

            prova.data

        );

    const card =

        document.createElement("div");

    card.className="item-card";

    card.innerHTML=`

        <span class="badge media">

            ${prova.tipo}

        </span>

        <h3>

            ${prova.titulo}

        </h3>

        <div class="info">

            <i class="fa-solid fa-book"></i>

            ${nomeDisciplina(

                prova.disciplina

            )}

        </div>

        <div class="info">

            <i class="fa-solid fa-calendar"></i>

            ${formatarData(

                prova.data

            )}

        </div>

        <div class="info">

            <i class="fa-solid fa-clock"></i>

            ${prova.hora || "-"}

        </div>

        <div class="info">

            <i class="fa-solid fa-location-dot"></i>

            ${prova.local || "-"}

        </div>

        <div class="info">

            <i class="fa-solid fa-hourglass-half"></i>

            ${textoDias(dias)}

        </div>

        <div class="info">

            <span class="status ${classeStatus(status)}">

                ${status}

            </span>

        </div>

        <div class="card-actions">

            <button

                class="btn-edit"

                onclick="editarProva(${prova.id})">

                Editar

            </button>

            <button

                class="btn-delete"

                onclick="excluirProva(${prova.id})">

                Excluir

            </button>

        </div>

    `;

    listaProvas.appendChild(card);

}

// ==========================================
// EDITAR
// ==========================================

function editarProva(id){

    const prova = buscarRegistro(

        "provas",

        id

    );

    if(!prova){

        return;

    }

    provaEditando = id;

    document.getElementById("titulo-prova").value =
        prova.titulo;

    document.getElementById("disciplina-prova").value =
        prova.disciplina;

    document.getElementById("tipo-prova").value =
        prova.tipo;

    document.getElementById("data-prova").value =
        prova.data;

    document.getElementById("hora-prova").value =
        prova.hora;

    document.getElementById("local-prova").value =
        prova.local;

    document.getElementById("observacao-prova").value =
        prova.observacao;

    formProva.scrollIntoView({

        behavior:"smooth"

    });

}

// ==========================================
// EXCLUIR
// ==========================================

function excluirProva(id){

    const confirmar = confirm(

        "Deseja excluir esta prova?"

    );

    if(!confirmar){

        return;

    }

    removerRegistro(

        "provas",

        id

    );

    renderizarProvas();

    atualizarDashboard();

}

// ==========================================
// PESQUISA
// ==========================================

const pesquisaProva =

document.getElementById(

    "pesquisa-prova"

);

pesquisaProva.addEventListener(

    "input",

    pesquisarProvas

);

function pesquisarProvas(){

    const texto =

        pesquisaProva.value.toLowerCase();

    listaProvas.innerHTML = "";

    obterColecao("provas")

    .filter(prova=>{

        return(

            prova.titulo

            .toLowerCase()

            .includes(texto)

            ||

            nomeDisciplina(

                prova.disciplina

            )

            .toLowerCase()

            .includes(texto)

            ||

            prova.tipo

            .toLowerCase()

            .includes(texto)

        );

    })

    .forEach(

        criarCardProva

    );

}

// ==========================================
// AVISOS
// ==========================================

function obterAvisosProvas(){

    const avisos = [];

    obterColecao("provas")

    .forEach(prova=>{

        const dias =

            diasRestantes(

                prova.data

            );

        if(dias===0){

            avisos.push(

                `📅 Hoje acontece "${prova.titulo}".`

            );

        }

        else if(dias===1){

            avisos.push(

                `📅 Amanhã será "${prova.titulo}".`

            );

        }

        else if(dias<=3 && dias>1){

            avisos.push(

                `⚠ "${prova.titulo}" será em ${dias} dias.`

            );

        }

        else if(dias<0){

            avisos.push(

                `🚨 "${prova.titulo}" já aconteceu.`

            );

        }

    });

    return avisos;

}

// ==========================================
// ORDENAÇÃO
// ==========================================

function ordenarProvas(){

    const provas = ordenar(

        obterColecao("provas"),

        "data"

    );

    listaProvas.innerHTML = "";

    provas.forEach(

        criarCardProva

    );

}