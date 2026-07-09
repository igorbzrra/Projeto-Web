let tarefaEditando = null;

const formTarefa = document.getElementById("form-tarefa");

const listaTarefas = document.getElementById("lista-tarefas");

function carregarTarefas(){

    renderizarTarefas();

}

formTarefa.addEventListener(

    "submit",

    salvarTarefa

);

function salvarTarefa(event){

    event.preventDefault();

    const tarefa = {

    id: tarefaEditando ?? gerarId(),

    titulo: limparTexto(
        document.getElementById("titulo-tarefa").value
    ),

    disciplina:
        document.getElementById("disciplina-tarefa").value,

    descricao:
        limparTexto(
            document.getElementById("descricao-tarefa").value
        ),

    prioridade:
        document.getElementById("prioridade").value,

    dataEntrega:
        document.getElementById("data-entrega").value,

    concluida: false

};

    if(!validarTarefa(tarefa)){

        return;

    }

    if(tarefaEditando){

        atualizarRegistro(

            "tarefas",

            tarefa.id,

            tarefa

        );

    }

    else{

        adicionarRegistro(

            "tarefas",

            tarefa

        );

    }

    tarefaEditando = null;

    formTarefa.reset();

    renderizarTarefas();

    atualizarDashboard();

}

function validarTarefa(tarefa){

    if(tarefa.titulo===""){

        alert("Informe o título.");

        return false;

    }

    if(tarefa.disciplina===""){

        alert("Selecione uma disciplina.");

        return false;

    }

    if(tarefa.dataEntrega===""){

        alert("Informe a data.");

        return false;

    }

    return true;

}

function renderizarTarefas(){

    const tarefas = obterColecao(

        "tarefas"

    );

    listaTarefas.innerHTML="";

    if(tarefas.length===0){

        listaTarefas.innerHTML=`

        <div class="empty-state">

            <i class="fa-solid fa-list-check"></i>

            <h2>Nenhuma tarefa cadastrada</h2>

            <p>Cadastre sua primeira tarefa.</p>

        </div>

        `;

        return;

    }

    ordenar(

        tarefas,

        "dataEntrega"

    ).forEach(

        criarCardTarefa

    );

}

function criarCardTarefa(tarefa){

    const status =

        obterStatus(

            tarefa.dataEntrega

        );

    const dias =

        diasRestantes(

            tarefa.dataEntrega

        );

    const card =

        document.createElement("div");

    card.className="item-card";

    card.innerHTML=`

        <span

            class="badge ${tarefa.prioridade.toLowerCase()}">

            ${tarefa.prioridade}

        </span>

        <h3>

            ${tarefa.titulo}

        </h3>

        <div class="info">

            <i class="fa-solid fa-book"></i>

            ${nomeDisciplina(tarefa.disciplina)}

        </div>

        <div class="info">

            <i class="fa-solid fa-calendar"></i>

            ${formatarData(tarefa.dataEntrega)}

        </div>

        <div class="info">

            <i class="fa-solid fa-hourglass-half"></i>

            ${textoDias(dias)}

        </div>

        <div class="info">

            <span

            class="status ${classeStatus(status)}">

                ${status}

            </span>

        </div>

        <div class="card-actions">

            <button

                class="btn-edit"

                onclick="editarTarefa(${tarefa.id})">

                Editar

            </button>

            <button

                class="btn-delete"

                onclick="excluirTarefa(${tarefa.id})">

                Excluir

            </button>

        </div>

    `;

    listaTarefas.appendChild(card);

}

// =========================================
// EDITAR
// =========================================

function editarTarefa(id){

    const tarefa = buscarRegistro(

        "tarefas",

        id

    );

    if(!tarefa){

        return;

    }

    tarefaEditando = id;

    document.getElementById("titulo-tarefa").value =
        tarefa.titulo;

    document.getElementById("disciplina-tarefa").value =
        tarefa.disciplina;

    document.getElementById("descricao-tarefa").value =
        tarefa.descricao;

    document.getElementById("prioridade").value =
        tarefa.prioridade;

    document.getElementById("data-entrega").value =
        tarefa.dataEntrega;

    formTarefa.scrollIntoView({

        behavior:"smooth"

    });

}

// =========================================
// EXCLUIR
// =========================================

function excluirTarefa(id){

    const confirmar = confirm(

        "Deseja excluir esta tarefa?"

    );

    if(!confirmar){

        return;

    }

    removerRegistro(

        "tarefas",

        id

    );

    renderizarTarefas();

    atualizarDashboard();

}

// =========================================
// CONCLUIR
// =========================================

function concluirTarefa(id){

    const tarefa = buscarRegistro(

        "tarefas",

        id

    );

    atualizarRegistro(

        "tarefas",

        id,

        {

            concluida:

                !tarefa.concluida

        }

    );

    renderizarTarefas();

    atualizarDashboard();

}

// =========================================
// PESQUISA
// =========================================

const pesquisaTarefa =

document.getElementById(

    "pesquisa-tarefa"

);

pesquisaTarefa.addEventListener(

    "input",

    pesquisarTarefas

);

function pesquisarTarefas(){

    const texto =

        pesquisaTarefa.value.toLowerCase();

    listaTarefas.innerHTML="";

    obterColecao("tarefas")

    .filter(tarefa=>{

        return(

            tarefa.titulo

            .toLowerCase()

            .includes(texto)

            ||

            nomeDisciplina(

                tarefa.disciplina

            )

            .toLowerCase()

            .includes(texto)

        );

    })

    .forEach(criarCardTarefa);

}

// =========================================
// AVISOS
// =========================================

function obterAvisosTarefas(){

    const avisos = [];

    obterColecao("tarefas")

    .forEach(tarefa=>{

        if(tarefa.concluida){

            return;

        }

        const dias =

            diasRestantes(

                tarefa.dataEntrega

            );

        if(dias===0){

            avisos.push(

                `📌 Hoje é o prazo da tarefa "${tarefa.titulo}".`

            );

        }

        else if(dias===1){

            avisos.push(

                `⏳ Amanhã vence "${tarefa.titulo}".`

            );

        }

        else if(dias<=3 && dias>1){

            avisos.push(

                `⚠ "${tarefa.titulo}" vence em ${dias} dias.`

            );

        }

        else if(dias<0){

            avisos.push(

                `🚨 "${tarefa.titulo}" está atrasada.`

            );

        }

    });

    return avisos;

}