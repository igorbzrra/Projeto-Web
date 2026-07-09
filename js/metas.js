// ======================================================
// STUDYHUB 2.0
// metas.js
// ======================================================

let metaEditando = null;

const formMeta =
document.getElementById("form-meta");

const listaMetas =
document.getElementById("lista-metas");

function carregarMetas(){

    renderizarMetas();

}

formMeta.addEventListener(

    "submit",

    salvarMeta

);

function salvarMeta(event){

    event.preventDefault();

    const meta={

        id:

            metaEditando ?? gerarId(),

        titulo:

            limparTexto(

                document
                .getElementById("titulo-meta")
                .value

            ),

        descricao:

            limparTexto(

                document
                .getElementById("descricao-meta")
                .value

            ),

        prazo:

            document
            .getElementById("prazo-meta")
            .value,

        concluida:false

    };

    if(!validarMeta(meta)){

        return;

    }

    if(metaEditando){

        const antiga = buscarRegistro("metas", metaEditando);

        meta.concluida = antiga.concluida;

        atualizarRegistro(

            "metas",

            meta.id,

            meta

        );

    }

    else{

        adicionarRegistro(

            "metas",

            meta

        );

    }

    metaEditando=null;

    formMeta.reset();

    renderizarMetas();

    atualizarDashboard();

}

function validarMeta(meta){

    if(meta.titulo===""){

        alert("Informe o título da meta.");

        return false;

    }

    if(meta.prazo===""){

        alert("Informe o prazo.");

        return false;

    }

    return true;

}

function renderizarMetas(){

    const metas = ordenar(

        obterColecao("metas"),

        "prazo"

    );

    listaMetas.innerHTML="";

    if(metas.length===0){

        listaMetas.innerHTML=`

        <div class="empty-state">

            <i class="fa-solid fa-bullseye"></i>

            <h2>Nenhuma meta cadastrada</h2>

            <p>Cadastre sua primeira meta.</p>

        </div>

        `;

        return;

    }

    metas.forEach(

        criarCardMeta

    );

}

function criarCardMeta(meta){

    const dias =

        diasRestantes(

            meta.prazo

        );

    const status =

        obterStatus(

            meta.prazo

        );

    const card =

        document.createElement("div");

    card.className="item-card";

    card.innerHTML=`

        <h3>

            ${meta.titulo}

        </h3>

        <p>

            ${meta.descricao || "-"}

        </p>

        <div class="info">

            <i class="fa-solid fa-calendar"></i>

            ${formatarData(meta.prazo)}

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

        <div class="info">

            <input

                type="checkbox"

                ${meta.concluida?"checked":""}

                onchange="concluirMeta(${meta.id})">

            <strong>

                ${meta.concluida

                    ?"Concluída"

                    :"Pendente"}

            </strong>

        </div>

        <div class="card-actions">

            <button

                class="btn-edit"

                onclick="editarMeta(${meta.id})">

                <i class="fa-solid fa-pen"></i>

                Editar

            </button>

            <button

                class="btn-delete"

                onclick="excluirMeta(${meta.id})">

                <i class="fa-solid fa-trash"></i>

                Excluir

            </button>

        </div>

    `;

    listaMetas.appendChild(card);

}

// ==========================================
// EDITAR
// ==========================================

function editarMeta(id){

    const meta = buscarRegistro(

        "metas",

        id

    );

    if(!meta){

        return;

    }

    metaEditando=id;

    document.getElementById("titulo-meta").value=

        meta.titulo;

    document.getElementById("descricao-meta").value=

        meta.descricao;

    document.getElementById("prazo-meta").value=

        meta.prazo;

    formMeta.scrollIntoView({

        behavior:"smooth"

    });

}

// ==========================================
// EXCLUIR
// ==========================================

function excluirMeta(id){

    if(!confirm(

        "Deseja excluir esta meta?"

    )){

        return;

    }

    removerRegistro(

        "metas",

        id

    );

    renderizarMetas();

    atualizarDashboard();

}

// ==========================================
// CONCLUIR
// ==========================================

function concluirMeta(id){

    const meta = buscarRegistro(

        "metas",

        id

    );

    atualizarRegistro(

        "metas",

        id,

        {

            concluida:

                !meta.concluida

        }

    );

    renderizarMetas();

    atualizarDashboard();

}

// ==========================================
// PESQUISA
// ==========================================

const pesquisaMeta =

document.getElementById(

    "pesquisa-meta"

);

pesquisaMeta.addEventListener(

    "input",

    pesquisarMetas

);

function pesquisarMetas(){

    const texto=

        pesquisaMeta.value.toLowerCase();

    listaMetas.innerHTML="";

    obterColecao("metas")

    .filter(meta=>{

        return(

            meta.titulo

            .toLowerCase()

            .includes(texto)

            ||

            meta.descricao

            .toLowerCase()

            .includes(texto)

        );

    })

    .forEach(

        criarCardMeta

    );

}